package com.estimation.car.controller;

import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.dto.response.car.category.CategoryCarsResponseDto;
import com.estimation.car.service.CarCategoryService;
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
import static com.estimation.car.util.ApiDocumentUtils.getDocumentRequest;
import static com.estimation.car.util.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@AutoConfigureMockMvc
@WebMvcTest(CarCategoryController.class)
class CarCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarCategoryService carCategoryService;

    @Test
    void 자동차_카테고리별_자동차_리스트를_반환해야한다() throws Exception {
        // given
        given(carCategoryService.findAllCategoryWithCars())
                .willReturn(List.of(CategoryCarsResponseDto.builder()
                                                           .categoryId(1)
                                                           .categoryName("SUV")
                                                           .cars(List.of(CarResponseDto.builder()
                                                                                       .carId(1)
                                                                                       .carName("투싼")
                                                                                       .lowPrice(12_000_000)
                                                                                       .carImg("tucson.png")
                                                                                       .build()))
                                                           .build()));
        // when & then
        mockMvc.perform(
                       get("/api/v1/car/categories/cars")
                               .accept(MediaType.APPLICATION_JSON))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.code").value(0))
               .andExpect(jsonPath("$.message").value("성공"))
               .andExpect(jsonPath("$.data[0].categoryName").value("SUV"))
               .andExpect(jsonPath("$.data[0].cars[0].carName").value("투싼"))
               .andDo(document("categoryCars",
                       getDocumentRequest(),
                       getDocumentResponse(),
                       commonResponseBody().and(
                               fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                               fieldWithPath("data[].categoryId").type(JsonFieldType.NUMBER).description("카테고리 아이디"),
                               fieldWithPath("data[].categoryName").type(JsonFieldType.STRING).description("카테고리 이름"),
                               fieldWithPath("data[].cars[].carId").type(JsonFieldType.NUMBER).description("차량 아이디"),
                               fieldWithPath("data[].cars[].carName").type(JsonFieldType.STRING).description("차량 이름"),
                               fieldWithPath("data[].cars[].lowPrice").type(JsonFieldType.NUMBER).description("최저 가격"),
                               fieldWithPath("data[].cars[].carImg").type(JsonFieldType.STRING)
                                                                    .description("차량 이미지")
                                                                    .attributes(key("Nullable").value("true")))
               ));
    }
}
