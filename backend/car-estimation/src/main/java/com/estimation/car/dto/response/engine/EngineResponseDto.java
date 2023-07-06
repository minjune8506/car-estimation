package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;

@Getter
public class EngineResponseDto {
    private final int id;
    private final String name;
    private final String description;

    @Builder
    public EngineResponseDto(final int id, final String name, final String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static EngineResponseDto toDto(final Engine engine) {
        return EngineResponseDto.builder()
                                .id(engine.getId())
                                .name(engine.getName())
                                .description(engine.getDescription())
                                .build();
    }
}
