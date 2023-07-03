package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EngineResponseDto {
    private final int id;
    private final String name;
    private final String description;

    public static EngineResponseDto toDto(Engine engine) {
        return EngineResponseDto.builder()
                                .id(engine.getId())
                                .name(engine.getName())
                                .description(engine.getDescription())
                                .build();
    }
}
