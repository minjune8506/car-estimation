package com.estimation.car.support;

import com.estimation.car.entity.Car;
import com.estimation.car.entity.DrivingType;
import com.estimation.car.entity.Engine;
import com.estimation.car.entity.Mission;
import com.estimation.car.entity.Model;

public class ModelFixture {

    public static Model TUCSON_MODEL = createModel(CarFixture.TUCSON, EngineFixture.DIESEL, DrivingTypeFixture._2WD, MissionFixture.AUTO, "Smart");
    public static Model AVANTE_MODEL = createModel(CarFixture.AVANTE, EngineFixture.LPG, DrivingTypeFixture._2WD, MissionFixture.AUTO, "Smart");

    public static Model createModel(Car car, Engine engine, DrivingType drivingType, Mission mission, String trimName) {
        return Model.builder()
                       .car(car)
                       .engine(engine)
                       .drivingType(drivingType)
                       .mission(mission)
                       .trimName(trimName)
                       .price(12_340_000)
                       .name("default name")
                       .basicInfo("default basic info")
                       .imgPath("default img.png")
                       .detailImgPath1("detail/image1.png")
                       .detailImgPath2("detail/image2.png")
                       .detailImgPath3("detail/image3.png")
                       .build();
    }
}
