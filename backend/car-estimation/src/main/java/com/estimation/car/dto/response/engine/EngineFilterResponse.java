package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EngineFilterResponse {
    private final int id;
    private final String name;

    public static EngineFilterResponse from(final Engine engine) {
        return EngineFilterResponse.builder()
                                      .id(engine.getId())
                                      .name(engine.getName())
                                      .build();
    }
}

