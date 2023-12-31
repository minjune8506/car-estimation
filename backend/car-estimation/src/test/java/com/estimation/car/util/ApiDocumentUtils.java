package com.estimation.car.util;

import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.modifyHeaders;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;

public class ApiDocumentUtils {
    public static OperationRequestPreprocessor getDocumentRequest() {
        return preprocessRequest(prettyPrint(), modifyHeaders().remove("Host"));
    }

    public static OperationResponsePreprocessor getDocumentResponse() {
        return preprocessResponse(prettyPrint(), modifyHeaders().remove("Vary")); // (3)
    }

    public static ResponseFieldsSnippet commonResponseBody() {
        return responseFields(
                fieldWithPath("code").description("결과 코드"),
                fieldWithPath("message").description("결과 메시지")
        );
    }

    public static ResponseFieldsSnippet commonResponseErrorBody() {
        return responseFields(
                fieldWithPath("code").description("에러 코드"),
                fieldWithPath("message").description("에러 메시지")
        );
    }
}
