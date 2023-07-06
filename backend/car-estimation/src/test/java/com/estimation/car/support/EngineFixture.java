package com.estimation.car.support;

import com.estimation.car.entity.Engine;

public class EngineFixture {
    public static Engine DIESEL = createEngine("디젤");
    public static Engine GASOLINE = createEngine("가솔린");
    public static Engine GASOLINE_TURBO = createEngine("가솔린 터보");
    public static Engine LPG = createEngine("LPG");

    public static Engine createEngine(String name) {
        return Engine.builder()
                     .name(name)
                     .build();
    }
}
