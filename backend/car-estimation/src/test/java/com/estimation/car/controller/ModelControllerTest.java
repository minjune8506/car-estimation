package com.estimation.car.controller;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.drivingtype.DrivingTypeFilterResponse;
import com.estimation.car.dto.response.engine.EngineFilterResponse;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.dto.response.mission.MissionFilterResponse;
import com.estimation.car.dto.response.model.ModelFilterResponse;
import com.estimation.car.dto.response.model.ModelOptionResponse;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.entity.DrivingType;
import com.estimation.car.entity.Engine;
import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;
import com.estimation.car.entity.Mission;
import com.estimation.car.entity.Model;
import com.estimation.car.entity.Option;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecOption;
import com.estimation.car.service.ModelService;
import com.estimation.car.support.DrivingTypeFixture;
import com.estimation.car.support.EngineFixture;
import com.estimation.car.support.ExteriorColorFixture;
import com.estimation.car.support.InteriorColorFixture;
import com.estimation.car.support.MissionFixture;
import com.estimation.car.support.OptionFixture;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.estimation.car.util.ApiDocumentUtils.commonResponseBody;
import static com.estimation.car.util.ApiDocumentUtils.commonResponseErrorBody;
import static com.estimation.car.util.ApiDocumentUtils.getDocumentRequest;
import static com.estimation.car.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@AutoConfigureMockMvc
@WebMvcTest(ModelController.class)
class ModelControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ModelService modelService;

    @Test
    void 모델에_선택가능한_엔진_미션_구동방식을_반환한다() throws Exception {

        Engine diesel = EngineFixture.DIESEL;
        Mission auto = MissionFixture.AUTO;
        DrivingType _2wd = DrivingTypeFixture._2WD;

        EngineFilterResponse engines = EngineFilterResponse.from(diesel);
        MissionFilterResponse missions = MissionFilterResponse.from(auto);
        DrivingTypeFilterResponse drivingTypes = DrivingTypeFilterResponse.from(_2wd);

        ModelFilterResponse result = ModelFilterResponse.builder()
                                             .engines(List.of(engines))
                                             .missions(List.of(missions))
                                             .drivingTypes(List.of(drivingTypes))
                                             .build();


        given(modelService.filterModel(anyInt(), any(), any())).willReturn(result);

        mockMvc.perform(get("/api/v1/models/filter?carId=1&engineId=2&missionId=1")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(
                        document("model-filter",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(
                                        parameterWithName("carId").description("차량 아이디"),
                                        parameterWithName("engineId").description("엔진 아이디").optional(),
                                        parameterWithName("missionId").description("변속기 아이디").optional()),
                                commonResponseBody().and(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.engines").type(JsonFieldType.ARRAY).description("엔진"),
                                        fieldWithPath("data.engines[].id").type(JsonFieldType.NUMBER)
                                                .description("엔진 ID"),
                                        fieldWithPath("data.engines[].name").type(JsonFieldType.STRING)
                                                .description("엔진 이름"),
                                        fieldWithPath("data.missions").type(JsonFieldType.ARRAY).description("변속기"),
                                        fieldWithPath("data.missions[].id").type(JsonFieldType.NUMBER)
                                                .description("변속기 ID"),
                                        fieldWithPath("data.missions[].name").type(JsonFieldType.STRING)
                                                .description("변속기 이름"),
                                        fieldWithPath("data.drivingTypes").type(JsonFieldType.ARRAY)
                                                .description("구동 방식"),
                                        fieldWithPath("data.drivingTypes[].id").type(JsonFieldType.NUMBER)
                                                .description("구동 방식 ID"),
                                        fieldWithPath("data.drivingTypes[].name").type(JsonFieldType.STRING)
                                                .description("구동 방식 이름"))
                        ));
    }

    @Test
    void 해당하는_필터링된_모델이_없는_경우_예외를_발생시킨다() throws Exception {
        given(modelService.filterModel(anyInt(), any(), any())).willThrow(new ModelNotFoundException());

        mockMvc.perform(get("/api/v1/models/filter?carId=42")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.MODEL_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.MODEL_NOT_FOUND.getMessage()))
                .andDo(document("model-filter-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        commonResponseErrorBody()));
    }

    @Test
    void 선택가능한_트림들을_반환한다() throws Exception {
        ModelResponse trimResponseDto = ModelResponse.builder()
                                                .id(1)
                                                .name("더 뉴 아반떼 자가용 가솔린 1.6 Modern A/T")
                                                .trimName("Modern")
                                                .price(24000000)
                                                .basicInfo("자가용 가솔린 1.6 A/T")
                                                .imgPath("avante.png")
                                                .detailImgs(List.of("detail-1.png"))
                                                .build();
        given(modelService.findTrims(anyInt(), anyInt(), anyInt(), anyInt())).willReturn(List.of(trimResponseDto));

        mockMvc.perform(get("/api/v1/models/trims?carId=1&engineId=1&missionId=1&drivingTypeId=1").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("model-trims",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("carId").description("차량 아이디"),
                                parameterWithName("engineId").description("엔진 아이디"),
                                parameterWithName("missionId").description("변속기 아이디"),
                                parameterWithName("drivingTypeId").description("구동 방식 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data[]").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("모델 아이디"),
                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("모델 이름"),
                                fieldWithPath("data[].trimName").type(JsonFieldType.STRING).description("트림명"),
                                fieldWithPath("data[].price").type(JsonFieldType.NUMBER).description("모델 가격"),
                                fieldWithPath("data[].basicInfo").type(JsonFieldType.STRING).description("모델 기본 정보"),
                                fieldWithPath("data[].imgPath").type(JsonFieldType.STRING).description("모델 이미지 경로"),
                                fieldWithPath("data[].detailImgs").type(JsonFieldType.ARRAY)
                                        .description("모델 세부 정보 이미지 경로")
                        )
                ));
    }

    @Test
    void 트림을_찾지_못한_경우_예외를_발생시킨다() throws Exception {
        given(modelService.findTrims(anyInt(), anyInt(), anyInt(), anyInt())).willThrow(new ModelNotFoundException());

        mockMvc.perform(get("/api/v1/models/trims?carId=42&engineId=1&missionId=1&drivingTypeId=1")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.MODEL_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.MODEL_NOT_FOUND.getMessage()))
                .andDo(document("model-trims-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        commonResponseErrorBody()));
    }

    @Test
    void 모델_정보를_반환한다() throws Exception {
        Model model = Model.builder()
                              .name("더 뉴 아반떼 자가용 가솔린 1.6 Smart A/T")
                              .price(12340000)
                              .trimName("Smart")
                              .basicInfo("자가용 가솔린 1.6 A/T")
                              .imgPath("car/image.jpg")
                              .detailImgPath1("car/detail/image1.png")
                              .detailImgPath2("car/detail/image2.png")
                              .detailImgPath3("car/detail/image3.png")
                              .build();

        ModelResponse modelResponse = ModelResponse.from(model);

        given(modelService.findModel(anyInt())).willReturn(modelResponse);

        mockMvc.perform(get("/api/v1/models/42").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andExpect(jsonPath("$.data.name").value("더 뉴 아반떼 자가용 가솔린 1.6 Smart A/T"))
                .andDo(document("model-info", getDocumentRequest(), getDocumentResponse(), commonResponseBody().and(
                        fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("모델 아이디"),
                        fieldWithPath("data.trimName").type(JsonFieldType.STRING).description("트림명"),
                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("모델명"),
                        fieldWithPath("data.basicInfo").type(JsonFieldType.STRING).description("모델 기본 정보"),
                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("모델 가격"),
                        fieldWithPath("data.imgPath").type(JsonFieldType.STRING).description("모델 이미지 경로"),
                        fieldWithPath("data.detailImgs[]").type(JsonFieldType.ARRAY).description("모델 세부 정보 이미지 경로")
                )));
    }

    @Test
    void 모델_정보를_찾지_못하면_예외를_발생시킨다() throws Exception {
        given(modelService.findModel(anyInt())).willThrow(new ModelNotFoundException());

        mockMvc.perform(get("/api/v1/models/42").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.MODEL_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.MODEL_NOT_FOUND.getMessage()))
                .andDo(document("model-info-error", getDocumentRequest(), getDocumentResponse(), commonResponseErrorBody()));
    }

    @Test
    void 모델의_옵션을_반환한다() throws Exception {

        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        Option option = OptionFixture.SMART_SENSE;

        SpecOption specOption = SpecOption.builder()
                                        .option(option)
                                        .spec(spec)
                                        .defaultYn('N')
                                        .showYn('Y')
                                        .unityChoiceYn('Y')
                                        .price(1240000)
                                        .build();

        ModelOptionResponse response = ModelOptionResponse.from(spec, List.of(specOption));

        given(modelService.findOptions(anyInt())).willReturn(List.of(response));

        mockMvc.perform(get("/api/v1/models/1/options").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("model-options", getDocumentRequest(), getDocumentResponse(), commonResponseBody().and(
                        fieldWithPath("data[].specCode").type(JsonFieldType.STRING).description("스펙 코드"),
                        fieldWithPath("data[].options[].optionCategoryId").type(JsonFieldType.NUMBER).description("옵션 카테고리 아이디"),
                        fieldWithPath("data[].options[].optionCategoryName").type(JsonFieldType.STRING).description("옵션 카테고리 이름"),
                        fieldWithPath("data[].options[].optionId").type(JsonFieldType.NUMBER).description("옵션 아이디"),
                        fieldWithPath("data[].options[].optionName").type(JsonFieldType.STRING).description("옵션 이름"),
                        fieldWithPath("data[].options[].price").type(JsonFieldType.NUMBER).description("옵션 가격"),
                        fieldWithPath("data[].options[].unityChoiceYn").type(JsonFieldType.STRING).description("단일 선택 가능 여부"),
                        fieldWithPath("data[].options[].defaultYn").type(JsonFieldType.STRING).description("디폴트 선택 여부"),
                        fieldWithPath("data[].options[].img").type(JsonFieldType.STRING).description("옵션 이미지 경로")
                )));
    }

    @Test
    void 모델의_선택가능한_외장색상을_반환한다() throws Exception {
        ExteriorColor exteriorColor1 = ExteriorColorFixture.A5G;
        ExteriorColor exteriorColor2 = ExteriorColorFixture.PE2;

        ExteriorColorResponse exteriorColorResponse1 = ExteriorColorResponse.from(exteriorColor1, true);
        ExteriorColorResponse exteriorColorResponse2 = ExteriorColorResponse.from(exteriorColor2, false);

        given(modelService.findExteriorColors(anyInt(), anyInt())).willReturn(List.of(exteriorColorResponse1, exteriorColorResponse2));

        mockMvc.perform(get("/api/v1/models/1/colors/exteriors?interiorColorId=2").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("model-colors-exteriors",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("interiorColorId").description("선택한 내장 색상 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("외장 색상 아이디"),
                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("외장 색상 이름"),
                                fieldWithPath("data[].code").type(JsonFieldType.STRING).description("외장 색상 코드"),
                                fieldWithPath("data[].choiceYn").type(JsonFieldType.BOOLEAN).description("선택 가능 여부")
                        )));
    }

    @Test
    void 모델의_선택가능한_외장색상이_없는_경우_예외를_발생시킨다() throws Exception {
        given(modelService.findExteriorColors(anyInt(), anyInt())).willThrow(new ModelNotFoundException());

        mockMvc.perform(get("/api/v1/models/1/colors/exteriors?interiorColorId=2").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.MODEL_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.MODEL_NOT_FOUND.getMessage()))
                .andDo(document("model-colors-exteriors-error", getDocumentRequest(), getDocumentResponse(), commonResponseErrorBody()));
    }

    @Test
    void 모델의_선택가능한_내장색상을_반환한다() throws Exception {
        InteriorColor interiorColor1 = InteriorColorFixture.NNB;
        InteriorColor interiorColor2 = InteriorColorFixture.SSS;

        InteriorColorResponse response1 = InteriorColorResponse.from(interiorColor1, true);
        InteriorColorResponse response2 = InteriorColorResponse.from(interiorColor2, false);

        given(modelService.findInteriorColors(anyInt(), anyInt())).willReturn(List.of(response1, response2));

        mockMvc.perform(get("/api/v1/models/1/colors/interiors?exteriorColorId=2").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("model-colors-interiors",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("exteriorColorId").description("선택한 외장 색상 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("내장 색상 아이디"),
                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("내장 색상 이름"),
                                fieldWithPath("data[].code").type(JsonFieldType.STRING).description("내장 색상 코드"),
                                fieldWithPath("data[].choiceYn").type(JsonFieldType.BOOLEAN).description("선택 가능 여부")
                        )));
    }

    @Test
    void 모델의_선택가능한_내장색상이_없는_경우_예외를_발생시킨다() throws Exception {
        given(modelService.findInteriorColors(anyInt(), anyInt())).willThrow(new ModelNotFoundException());

        mockMvc.perform(get("/api/v1/models/1/colors/interiors?exteriorColorId=2").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.MODEL_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.MODEL_NOT_FOUND.getMessage()))
                .andDo(document("model-colors-interiors-error", getDocumentRequest(), getDocumentResponse(), commonResponseErrorBody()));
    }
}
