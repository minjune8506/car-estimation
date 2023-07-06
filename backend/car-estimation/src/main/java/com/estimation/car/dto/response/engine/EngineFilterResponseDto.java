package com.estimation.car.dto.response.engine;

import com.estimation.car.entity.Engine;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EngineFilterResponseDto {
    private final int id;
    private final String name;

    @Builder
    public EngineFilterResponseDto(final int id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static EngineFilterResponseDto toDto(final Engine engine) {
        return EngineFilterResponseDto.builder()
                                      .id(engine.getId())
                                      .name(engine.getName())
                                      .build();
    }
}

