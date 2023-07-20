package com.estimation.car.controller;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.CarNotFoundException;
import com.estimation.car.dto.response.car.CarColorsResponse;
import com.estimation.car.dto.response.car.CarResponse;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;
import com.estimation.car.service.CarService;
import com.estimation.car.support.ExteriorColorFixture;
import com.estimation.car.support.InteriorColorFixture;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.estimation.car.util.ApiDocumentUtils.commonResponseBody;
import static com.estimation.car.util.ApiDocumentUtils.commonResponseErrorBody;
import static com.estimation.car.util.ApiDocumentUtils.getDocumentRequest;
import static com.estimation.car.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@AutoConfigureMockMvc
@WebMvcTest(CarController.class)
class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarService carService;

    @Test
    void 차량아이디로_차량을_찾는다() throws Exception {
        Car car = Car.builder()
                          .name("아반떼")
                          .nameEn("avante")
                          .lowPrice(12000000)
                          .imgPath("imgae/avante")
                          .build();
        ReflectionTestUtils.setField(car, "id", 1);
        CarResponse carResponse = CarResponse.from(car);

        given(carService.findCar(1)).willReturn(carResponse);

        mockMvc.perform(get("/api/v1/cars/{carId}", 1)
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andExpect(jsonPath("$.data.carId").value(1))
                .andExpect(jsonPath("$.data.carName").value("아반떼"))
                .andDo(document("find-car",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("carId").description("차량 아이디")
                        ),
                        commonResponseBody().and(
                                fieldWithPath("data.carId").type(JsonFieldType.NUMBER).description("차량 아이디"),
                                fieldWithPath("data.carName").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("data.carNameEn").type(JsonFieldType.STRING).description("차량 영어 이름"),
                                fieldWithPath("data.lowPrice").type(JsonFieldType.NUMBER).description("차량 최저 가격"),
                                fieldWithPath("data.carImg").type(JsonFieldType.STRING).description("차량 이미지 경로"))));
    }

    @Test
    void 잘못된_차량_아이디가_들어온_경우_예외_발생() throws Exception {

        given(carService.findCar(42)).willThrow(new CarNotFoundException());

        mockMvc.perform(get("/api/v1/cars/42")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(ErrorCode.CAR_NOT_FOUND.getValue()))
                .andExpect(jsonPath("$.message").value(ErrorCode.CAR_NOT_FOUND.getMessage()))
                .andDo(document("find-car-error",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        commonResponseErrorBody()));
    }

    @Test
    void 차량_색상_중에서_모델에_적용_가능한_색상들을_반환한다() throws Exception {
        ExteriorColor exteriorColor1 = ExteriorColorFixture.A5G;
        ExteriorColor exteriorColor2 = ExteriorColorFixture.PE2;

        InteriorColor interiorColor1 = InteriorColorFixture.NNB;
        InteriorColor interiorColor2 = InteriorColorFixture.SSS;

        ExteriorColorResponse exteriorColorResponse1 = ExteriorColorResponse.from(exteriorColor1, true);
        ExteriorColorResponse exteriorColorResponse2 = ExteriorColorResponse.from(exteriorColor2, false);

        InteriorColorResponse interiorColorResponse1 = InteriorColorResponse.from(interiorColor1, true);
        InteriorColorResponse interiorColorResponse2 = InteriorColorResponse.from(interiorColor2, false);

        CarColorsResponse response = CarColorsResponse.from(List.of(exteriorColorResponse1, exteriorColorResponse2), List.of(interiorColorResponse1, interiorColorResponse2));

        given(carService.filterColor(anyInt(), anyInt())).willReturn(response);

        mockMvc.perform(get("/api/v1/cars/{carId}/colors?modelId=2", 1).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("성공"))
                .andDo(document("find-car-colors",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("carId").description("차량 아이디")
                        ),
                        queryParameters(
                                parameterWithName("modelId").description("모델 아이디")),
                        commonResponseBody().and(
                                fieldWithPath("data.exteriorColors").type(JsonFieldType.ARRAY).description("외장 색상 정보"),
                                fieldWithPath("data.interiorColors").type(JsonFieldType.ARRAY).description("내장 색상 정보"),
                                fieldWithPath("data.*[].id").type(JsonFieldType.NUMBER).description("색상 아이디"),
                                fieldWithPath("data.*[].name").type(JsonFieldType.STRING).description("색상 이름"),
                                fieldWithPath("data.*[].code").type(JsonFieldType.STRING).description("색상 코드"),
                                fieldWithPath("data.*[].choiceYn").type(JsonFieldType.BOOLEAN).description("색상 선택 가능 여부")
                        )
                ));
    }
}
