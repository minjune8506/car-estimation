package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class EngineFilterResponseDto {
    private final int id;
    private final String name;

    public static EngineFilterResponseDto toDto(Engine engine) {
        return EngineFilterResponseDto.builder()
                                      .id(engine.getId())
                                      .name(engine.getName())
                                      .build();
    }
}

