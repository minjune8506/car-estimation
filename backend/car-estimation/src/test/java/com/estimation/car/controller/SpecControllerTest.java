package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.OptionNotFoundException;
import com.estimation.car.common.exception.SpecNotFoundException;
import com.estimation.car.dto.response.spec.ChangeModelResponse;
import com.estimation.car.dto.response.spec.CheckSpecFailResponse;
import com.estimation.car.dto.response.spec.CheckSpecResponse;
import com.estimation.car.dto.response.spec.SpecInfoResponse;
import com.estimation.car.dto.response.spec.color.ChangeColorResponse;
import com.estimation.car.dto.response.spec.color.ChangeExteriorResponse;
import com.estimation.car.dto.response.spec.color.ChangeInteriorResponse;
import com.estimation.car.dto.response.spec.option.constraints.ConstraintCheckResponse;
import com.estimation.car.dto.response.spec.option.constraints.SpecOptionConstraintResponse;
import com.estimation.car.entity.Action;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecColor;
import com.estimation.car.entity.SpecOption;
import com.estimation.car.entity.SpecOptionConstraint;
import com.estimation.car.service.SpecService;
import com.estimation.car.support.ExteriorColorFixture;
import com.estimation.car.support.InteriorColorFixture;
import com.estimation.car.support.ModelFixture;
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
import static org.mockito.ArgumentMatchers.anyChar;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@AutoConfigureRestDocs
@WebMvcTest(SpecController.class)
class SpecControllerTest {

    @MockBean
    private SpecService specService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 모델에_속해있는_모든_스펙_정보를_반환한다() throws Exception {
        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        SpecColor specColor = SpecColor.builder()
                                      .exteriorColor(ExteriorColorFixture.PE2)
                                      .interiorColor(InteriorColorFixture.NNB)
                                      .spec(spec)
                                      .build();
        SpecOption specOption = SpecOption.builder()
                                        .option(OptionFixture.SMART_SENSE)
                                        .price(12340000)
                                        .defaultYn('N')
                                        .unityChoiceYn('Y')
                                        .build();
        SpecInfoResponse response = SpecInfoResponse.from(spec, List.of(specColor), List.of(specOption));

        given(specService.findModelSpecs(anyInt())).willReturn(List.of(response));

        mockMvc.perform(get("/api/v1/specs?modelId=1").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("specs-info", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                parameterWithName("modelId").description("모델 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data[].specId").type(JsonFieldType.NUMBER).description("스펙 아이디"),
                                fieldWithPath("data[].specCode").type(JsonFieldType.STRING).description("스펙 코드"),
                                subsectionWithPath("data[].colors[].interior").type(JsonFieldType.OBJECT).description("내장 색상 정보"),
                                subsectionWithPath("data[].colors[].exterior").type(JsonFieldType.OBJECT).description("외장 색상 정보"),
                                subsectionWithPath("data[].options[]").type(JsonFieldType.ARRAY).description("옵션 정보")
                        )
                ));
    }

    @Test
    void 스펙_정보_조회시_모델에_해당하는_스펙이_없는_경우_예외발생() throws Exception {
        given(specService.findModelSpecs(anyInt())).willThrow(new SpecNotFoundException());

        mockMvc.perform(get("/api/v1/specs?modelId=42").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.SPEC_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.SPEC_NOT_FOUND.getMessage()))
                .andDo(document("specs-info-error", getDocumentRequest(), getDocumentResponse(), commonResponseErrorBody()));
    }

    @Test
    void 스펙_정보_하나_조회() throws Exception {
        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        SpecColor specColor = SpecColor.builder()
                                      .exteriorColor(ExteriorColorFixture.PE2)
                                      .interiorColor(InteriorColorFixture.NNB)
                                      .spec(spec)
                                      .build();
        SpecOption specOption = SpecOption.builder()
                                        .option(OptionFixture.SMART_SENSE)
                                        .price(12340000)
                                        .defaultYn('N')
                                        .unityChoiceYn('Y')
                                        .build();
        SpecInfoResponse response = SpecInfoResponse.from(spec, List.of(specColor), List.of(specOption));

        given(specService.findSpec(anyInt(), anyChar())).willReturn(response);

        mockMvc.perform(get("/api/v1/specs/{specCode}?modelId=1", 'A').accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("spec-info",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("specCode").description("스펙 코드")
                        ),
                        queryParameters(
                                parameterWithName("modelId").description("모델 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data.specId").type(JsonFieldType.NUMBER).description("스펙 아이디"),
                                fieldWithPath("data.specCode").type(JsonFieldType.STRING).description("스펙 코드"),
                                subsectionWithPath("data.colors[].interior").type(JsonFieldType.OBJECT).description("내장 색상 정보"),
                                subsectionWithPath("data.colors[].exterior").type(JsonFieldType.OBJECT).description("외장 색상 정보"),
                                subsectionWithPath("data.options[]").type(JsonFieldType.ARRAY).description("옵션 정보")
                        )
                ));
    }

    @Test
    void 스펙_정보_하나_조회시_해당하는_스펙이_없는_경우_예외발생() throws Exception {
        given(specService.findSpec(anyInt(), anyChar())).willThrow(new SpecNotFoundException());

        mockMvc.perform(get("/api/v1/specs/A?modelId=42").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.SPEC_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.SPEC_NOT_FOUND.getMessage()))
                .andDo(document("spec-info-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        commonResponseErrorBody()));
    }


    @Test
    void 옵션_제약조건_조회() throws Exception {
        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        SpecOption specOption1 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.SMART_SENSE)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(12340000)
                                         .build();
        SpecOption specOption2 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.HIPASS)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(120000)
                                         .build();

        SpecOptionConstraint constraint = SpecOptionConstraint.builder()
                                                  .source(specOption1)
                                                  .target(specOption2)
                                                  .action(Action.ENABLE)
                                                  .build();

        SpecOptionConstraintResponse response = SpecOptionConstraintResponse.from(constraint);

        given(specService.findOptionConstraints(anyInt(), anyList())).willReturn(List.of(response));

        mockMvc.perform(get("/api/v1/specs/options/constraints?modelId=1&selectedOptions=1,2,3").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("options-constraints",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("modelId").description("모델 아이디"),
                                parameterWithName("selectedOptions").description("선택한 옵션 아이디 리스트")
                        ),
                        commonResponseBody().and(
                                fieldWithPath("data[].specCode").type(JsonFieldType.STRING).description("스펙 코드"),
                                fieldWithPath("data[].action").type(JsonFieldType.STRING).description("제약조건"),
                                subsectionWithPath("data[].option").type(JsonFieldType.OBJECT).description("옵션 정보")
                        )));
    }


    @Test
    void 옵션_제약조건_검사시_삭제할_옵션과_추가할_옵션을_반환한다() throws Exception {
        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        SpecOption specOption1 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.SMART_SENSE)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(12340000)
                                         .build();
        SpecOption specOption2 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.HIPASS)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(120000)
                                         .build();
        ConstraintCheckResponse response = ConstraintCheckResponse.from(List.of(specOption1), List.of(specOption2));

        given(specService.checkOptionConstraints(anyInt(), anyList(), anyInt())).willReturn(response);

        mockMvc.perform(get("/api/v1/specs/options/constraints/check?modelId=1&selectedOptions=1,2,3&targetOptionId=99").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("options-constraints-check", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                parameterWithName("modelId").description("모델 아이디"),
                                parameterWithName("selectedOptions").description("선택한 옵션 아이디 리스트"),
                                parameterWithName("targetOptionId").description("제약조건 검사할 옵션 아이디")),
                        commonResponseBody().and(
                                subsectionWithPath("data.delOptions[]").type(JsonFieldType.ARRAY).description("삭제할 옵션 리스트"),
                                subsectionWithPath("data.addOptions[]").type(JsonFieldType.ARRAY).description("추가할 옵션 리스트")
                        )));
    }

    @Test
    void 옵션_제약조건_검사시_해당하는_옵션을_찾을수_없는_경우_예외를_발생한다() throws Exception {
        given(specService.checkOptionConstraints(anyInt(), anyList(), anyInt())).willThrow(new OptionNotFoundException());

        mockMvc.perform(get("/api/v1/specs/options/constraints/check?modelId=1&selectedOptions=1,2,3&targetOptionId=99").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.OPTION_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.OPTION_NOT_FOUND.getMessage()))
                .andDo(document("options-constraints-check-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("modelId").description("모델 아이디"),
                                parameterWithName("selectedOptions").description("선택한 옵션 아이디 리스트"),
                                parameterWithName("targetOptionId").description("제약조건 검사할 옵션 아이디")),
                        commonResponseErrorBody()
                ));
    }


    @Test
    void 색상_스펙_검사_성공() throws Exception {
        CheckSpecResponse checkSpecResponse = new CheckSpecResponse('Y');

        given(specService.checkColor(anyInt(), anyChar(), anyInt(), anyInt())).willReturn(checkSpecResponse);

        mockMvc.perform(get("/api/v1/specs/colors/check?modelId=1&specCode=A&interiorColorId=1&exteriorColorId=1").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("colors-check-success", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                parameterWithName("modelId").description("모델 아이디"),
                                parameterWithName("specCode").description("스펙 코드"),
                                parameterWithName("interiorColorId").description("내장 색상 아이디"),
                                parameterWithName("exteriorColorId").description("외장 색상 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data.available").type(JsonFieldType.STRING).description("색상 선택 가능 여부(Y)"))));
    }

    @Test
    void 색상_스펙_검사_실패시_다른_스펙_반환() throws Exception {

        CheckSpecResponse checkSpecResponse = new CheckSpecFailResponse('N', 'B', 1, 2);

        given(specService.checkColor(anyInt(), anyChar(), anyInt(), anyInt())).willReturn(checkSpecResponse);

        mockMvc.perform(get("/api/v1/specs/colors/check?modelId=1&specCode=A&interiorColorId=2&exteriorColorId=1").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("colors-check-fail", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                parameterWithName("modelId").description("모델 아이디"),
                                parameterWithName("specCode").description("스펙 코드"),
                                parameterWithName("interiorColorId").description("내장 색상 아이디"),
                                parameterWithName("exteriorColorId").description("외장 색상 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data.available").type(JsonFieldType.STRING).description("색상 선택 가능 여부(N)"),
                                fieldWithPath("data.specCode").type(JsonFieldType.STRING).description("스펙 코드"),
                                fieldWithPath("data.exteriorColorId").type(JsonFieldType.NUMBER).description("변경된 외장 색상 아이디"),
                                fieldWithPath("data.interiorColorId").type(JsonFieldType.NUMBER).description("변경된 내장 색상 아이디")
                        )
                ));
    }

    @Test
    void 색상_변경_요청시_외장_색상을_변경하면_선택할_수_있는_경우() throws Exception {
        ChangeColorResponse response = new ChangeExteriorResponse();

        given(specService.changeColor(anyInt(), anyInt(), anyInt(), anyInt(), anyInt(), anyList())).willReturn(response);

        mockMvc.perform(get("/api/v1/specs/colors/change?modelId=1&beforeExteriorColorId=1&beforeInteriorColorId=1&afterExteriorColorId=1&afterInteriorColorId=2&options=99,100,101").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("colors-change-exterior", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                        parameterWithName("modelId").description("모델 아이디"),
                                        parameterWithName("beforeExteriorColorId").description("변경전 외장 색상 아이디"),
                                        parameterWithName("beforeInteriorColorId").description("변겅전 내장 색상 아이디"),
                                        parameterWithName("afterExteriorColorId").description("변경후 외장 색상 아이디"),
                                        parameterWithName("afterInteriorColorId").description("변경후 내장 색상 아이디"),
                                        parameterWithName("options").description("현재 선택한 옵션 아이디 리스트")),
                                commonResponseBody().and(
                                        fieldWithPath("data.changeExteriorYn").type(JsonFieldType.STRING).description("외장 색상 변경 여부 (Y)"))
                        )
                );
    }

    @Test
    void 색상_변경_요청시_내장_색상을_변경하면_선택할_수_있는_경우() throws Exception {
        ChangeColorResponse response = new ChangeInteriorResponse();

        given(specService.changeColor(anyInt(), anyInt(), anyInt(), anyInt(), anyInt(), anyList())).willReturn(response);

        mockMvc.perform(get("/api/v1/specs/colors/change?modelId=1&beforeExteriorColorId=1&beforeInteriorColorId=1&afterExteriorColorId=1&afterInteriorColorId=2&options=99,100,101").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("colors-change-interior", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                        parameterWithName("modelId").description("모델 아이디"),
                                        parameterWithName("beforeExteriorColorId").description("변경전 외장 색상 아이디"),
                                        parameterWithName("beforeInteriorColorId").description("변겅전 내장 색상 아이디"),
                                        parameterWithName("afterExteriorColorId").description("변경후 외장 색상 아이디"),
                                        parameterWithName("afterInteriorColorId").description("변경후 내장 색상 아이디"),
                                        parameterWithName("options").description("현재 선택한 옵션 아이디 리스트")),
                                commonResponseBody().and(
                                        fieldWithPath("data.changeInteriorYn").type(JsonFieldType.STRING).description("내장 색상 변경 여부 (Y)"))
                        )
                );
    }

    @Test
    void 색상_변경_요청시_모델을_변경해야_색상을_선택할_수_있는_경우() throws Exception {
        Spec spec = Spec.builder()
                            .specCode('A')
                            .build();
        SpecOption specOption1 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.SMART_SENSE)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(12340000)
                                         .build();
        SpecOption specOption2 = SpecOption.builder()
                                         .spec(spec)
                                         .option(OptionFixture.HIPASS)
                                         .unityChoiceYn('Y')
                                         .defaultYn('N')
                                         .price(120000)
                                         .build();
        ChangeColorResponse response = ChangeModelResponse.from(ModelFixture.AVANTE_MODEL, ExteriorColorFixture.PE2, InteriorColorFixture.SSS, List.of(specOption1), List.of(specOption2));

        given(specService.changeColor(anyInt(), anyInt(), anyInt(), anyInt(), anyInt(), anyList())).willReturn(response);

        mockMvc.perform(get("/api/v1/specs/colors/change?modelId=1&beforeExteriorColorId=1&beforeInteriorColorId=1&afterExteriorColorId=1&afterInteriorColorId=2&options=99,100,101").accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(Code.SUCCESS.getValue()))
                .andExpect(jsonPath("$.message").value(Code.SUCCESS.getMessage()))
                .andDo(document("colors-change-model", getDocumentRequest(), getDocumentResponse(), queryParameters(
                                        parameterWithName("modelId").description("모델 아이디"),
                                        parameterWithName("beforeExteriorColorId").description("변경전 외장 색상 아이디"),
                                        parameterWithName("beforeInteriorColorId").description("변겅전 내장 색상 아이디"),
                                        parameterWithName("afterExteriorColorId").description("변경후 외장 색상 아이디"),
                                        parameterWithName("afterInteriorColorId").description("변경후 내장 색상 아이디"),
                                        parameterWithName("options").description("현재 선택한 옵션 아이디 리스트")),
                                commonResponseBody().and(
                                        subsectionWithPath("data.modelInfo").type(JsonFieldType.OBJECT).description("변경할 모델 정보"),
                                        subsectionWithPath("data.exteriorColor").type(JsonFieldType.OBJECT).description("변경할 외장 색상"),
                                        subsectionWithPath("data.interiorColor").type(JsonFieldType.OBJECT).description("변경할 내장 색상"),
                                        subsectionWithPath("data.delOptions[]").type(JsonFieldType.ARRAY).description("삭제할 옵션 리스트"),
                                        subsectionWithPath("data.addOptions[]").type(JsonFieldType.ARRAY).description("추가할 옵션 리스트")
//
                                ))
                );
    }
}
