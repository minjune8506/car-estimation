package com.estimation.car.util;

import org.springframework.http.MediaType;
import org.springframework.restdocs.operation.Operation;
import org.springframework.restdocs.payload.AbstractFieldsSnippet;
import org.springframework.restdocs.payload.FieldDescriptor;

import java.io.IOException;
import java.util.List;

public class ErrorCodeSnippet extends AbstractFieldsSnippet {

    public ErrorCodeSnippet(List<FieldDescriptor> descriptors,
                            boolean ignoreUndocumentedFields) {
        super("error-code", descriptors, null, ignoreUndocumentedFields);
        System.out.println(descriptors.size());
    }

    @Override
    protected MediaType getContentType(Operation operation) {
        return operation.getResponse().getHeaders().getContentType();
    }

    @Override
    protected byte[] getContent(Operation operation) throws IOException {
        return operation.getResponse().getContent();
    }
}
