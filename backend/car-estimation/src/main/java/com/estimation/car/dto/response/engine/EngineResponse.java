package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EngineResponse {
    private final int id;
    private final String name;
    private final String description;

    public static EngineResponse from(final Engine engine) {
        return EngineResponse.builder()
                                .id(engine.getId())
                                .name(engine.getName())
                                .description(engine.getDescription())
                                .build();
    }
}
