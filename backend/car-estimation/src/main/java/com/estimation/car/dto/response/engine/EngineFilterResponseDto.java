package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EngineFilterResponseDto {
    private final int id;
    private final String name;

    public static EngineFilterResponseDto from(final Engine engine) {
        return EngineFilterResponseDto.builder()
                                      .id(engine.getId())
                                      .name(engine.getName())
                                      .build();
    }
}

