package com.estimation.car.controller;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.drivingtype.DrivingTypeFilterResponse;
import com.estimation.car.dto.response.engine.EngineFilterResponse;
import com.estimation.car.dto.response.mission.MissionFilterResponse;
import com.estimation.car.dto.response.model.ModelFilterResponse;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.service.ModelService;
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

        EngineFilterResponse engines = EngineFilterResponse.builder()
                                               .id(1)
                                               .name("가솔린")
                                               .build();
        MissionFilterResponse missions = MissionFilterResponse.builder()
                                                 .id(1)
                                                 .name("A/T")
                                                 .build();
        DrivingTypeFilterResponse drivingTypes = DrivingTypeFilterResponse.builder()
                                                         .id(1)
                                                         .name("2WD")
                                                         .build();

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
        given(modelService.filterModel(anyInt(), any(), any())).willThrow(new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND));

        mockMvc.perform(get("/api/v1/models/filter?carId=42")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(4001))
                .andExpect(jsonPath("$.message").value("해당하는 모델을 찾을 수 없습니다."))
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
        given(modelService.findTrims(anyInt(), anyInt(), anyInt(), anyInt())).willThrow(new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND));

        mockMvc.perform(get("/api/v1/models/trims?carId=42&engineId=1&missionId=1&drivingTypeId=1")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(4001))
                .andExpect(jsonPath("$.message").value("해당하는 모델을 찾을 수 없습니다."))
                .andDo(document("model-trims-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        commonResponseErrorBody()));
    }
}
