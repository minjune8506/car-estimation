package com.estimation.car.common.code;

import com.estimation.car.util.ErrorCodeSnippet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@AutoConfigureMockMvc
@WebMvcTest(ErrorCodeController.class)
class ErrorCodeControllerTest {


    @Autowired
    private MockMvc mockMvc;

    public static ErrorCodeSnippet errorCodeSnippet(List<FieldDescriptor> fieldDescriptors) {
        return new ErrorCodeSnippet(fieldDescriptors, true);
    }

    @Test
    void ErrorCode_출력() throws Exception {
        this.mockMvc.perform(get("/codes/error"))
                    .andExpect(status().isOk())
                    .andDo(print());
    }

    private List<FieldDescriptor> fieldDescriptor() {
        List<FieldDescriptor> fieldDescriptors = new ArrayList<>();

        for (ErrorCode errorCode : ErrorCode.values()) {
            FieldDescriptor attributes =
                    fieldWithPath(errorCode.getStatus().getReasonPhrase()).type(JsonFieldType.OBJECT)
                                                                          .attributes(
                                                                                  key("status").value(errorCode.getStatus()
                                                                                                               .value()),
                                                                                  key("reasonPhrase").value(errorCode.getStatus()
                                                                                                                     .getReasonPhrase()),
                                                                                  key("code").value(errorCode.getValue()),
                                                                                  key("message").value(errorCode.getMessage()));
            fieldDescriptors.add(attributes);
        }

        return fieldDescriptors;
    }

    @Test
    public void ErrorCode_문서화() throws Exception {

        this.mockMvc.perform(get("/codes/error"))
                    .andExpect(status().isOk())
                    .andDo(document("error-code", errorCodeSnippet(fieldDescriptor())));
    }
}
