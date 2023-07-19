package com.estimation.car.repository;

import com.estimation.car.common.config.QuerydslConfig;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;
import com.estimation.car.entity.DrivingType;
import com.estimation.car.entity.Engine;
import com.estimation.car.entity.Mission;
import com.estimation.car.entity.Model;
import com.estimation.car.repository.car.CarRepository;
import com.estimation.car.repository.car.category.CarCategoryRepository;
import com.estimation.car.repository.model.ModelRepository;
import com.estimation.car.support.CarCategoryFixture;
import com.estimation.car.support.CarFixture;
import com.estimation.car.support.DrivingTypeFixture;
import com.estimation.car.support.EngineFixture;
import com.estimation.car.support.MissionFixture;
import com.estimation.car.support.ModelFixture;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(QuerydslConfig.class)
class ModelCustomRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarCategoryRepository carCategoryRepository;

    @Autowired
    private EngineRepository engineRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private DrivingTypeRepository drivingTypeRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    void 차량_아이디로_모델_필터링() {
        // given
        CarCategory suv = carCategoryRepository.save(CarCategoryFixture.SUV);
        Car tucson = carRepository.save(CarFixture.createCar("tucson", suv));
        Engine diesel = engineRepository.save(EngineFixture.DIESEL);
        Engine gasolineTurbo = engineRepository.save(EngineFixture.GASOLINE_TURBO);
        Mission auto = missionRepository.save(MissionFixture.AUTO);
        Mission dct = missionRepository.save(MissionFixture.DCT);
        DrivingType _2wd = drivingTypeRepository.save(DrivingTypeFixture._2WD);
        DrivingType _4wd = drivingTypeRepository.save(DrivingTypeFixture._4WD);

        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, diesel, _4wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, gasolineTurbo, _4wd, dct, "Modern"));

        int carId = tucson.getId();

        // when
        List<Model> models = modelRepository.filterModels(carId, null, null);

        // then
        assertThat(models).hasSize(3);
        models.forEach(model -> assertThat(model.getCar().getId()).isEqualTo(carId));
    }

    @Test
    void 차량_아이디와_엔진_아이디로_모델_필터링() {
        // given
        CarCategory suv = carCategoryRepository.save(CarCategoryFixture.SUV);
        Car tucson = carRepository.save(CarFixture.createCar("tucson", suv));
        Engine diesel = engineRepository.save(EngineFixture.DIESEL);
        Engine gasolineTurbo = engineRepository.save(EngineFixture.GASOLINE_TURBO);
        Mission auto = missionRepository.save(MissionFixture.AUTO);
        Mission dct = missionRepository.save(MissionFixture.DCT);
        DrivingType _2wd = drivingTypeRepository.save(DrivingTypeFixture._2WD);
        DrivingType _4wd = drivingTypeRepository.save(DrivingTypeFixture._4WD);

        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, diesel, _4wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, gasolineTurbo, _2wd, dct, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, gasolineTurbo, _4wd, dct, "Modern"));

        int carId = tucson.getId();
        int engineId = diesel.getId();

        // when
        List<Model> models = modelRepository.filterModels(carId, engineId, null);

        // then
        assertThat(models).hasSize(2);
        models.forEach(model -> {
                    assertThat(model.getCar().getId()).isEqualTo(carId);
                    assertThat(model.getEngine().getId()).isEqualTo(engineId);
                }
        );
    }

    @Test
    void 차량_아이디와_엔진_아이디_변속기_아이디로_모델_필터링() {
        // given
        CarCategory suv = carCategoryRepository.save(CarCategoryFixture.SUV);
        Car tucson = carRepository.save(CarFixture.createCar("tucson", suv));
        Engine diesel = engineRepository.save(EngineFixture.DIESEL);
        Engine gasolineTurbo = engineRepository.save(EngineFixture.GASOLINE_TURBO);
        Mission auto = missionRepository.save(MissionFixture.AUTO);
        Mission dct = missionRepository.save(MissionFixture.DCT);
        DrivingType _2wd = drivingTypeRepository.save(DrivingTypeFixture._2WD);
        DrivingType _4wd = drivingTypeRepository.save(DrivingTypeFixture._4WD);

        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, diesel, _4wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, gasolineTurbo, _2wd, dct, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, gasolineTurbo, _4wd, dct, "Modern"));

        int carId = tucson.getId();
        int engineId = diesel.getId();
        int missionId = auto.getId();

        // when
        List<Model> models = modelRepository.filterModels(carId, engineId, missionId);

        // then
        assertThat(models).hasSize(2);
        models.forEach(model -> {
                    assertThat(model.getCar().getId()).isEqualTo(carId);
                    assertThat(model.getEngine().getId()).isEqualTo(engineId);
                    assertThat(model.getMission().getId()).isEqualTo(missionId);
                }
        );
    }

    @Test
    void 모델_정보를_이용하여_해당하는_트림들을_찾는다() {
        // given
        CarCategory suv = carCategoryRepository.save(CarCategoryFixture.SUV);
        Car tucson = carRepository.save(CarFixture.createCar("tucson", suv));
        Engine diesel = engineRepository.save(EngineFixture.DIESEL);
        Mission auto = missionRepository.save(MissionFixture.AUTO);
        DrivingType _2wd = drivingTypeRepository.save(DrivingTypeFixture._2WD);
        DrivingType _4wd = drivingTypeRepository.save(DrivingTypeFixture._4WD);

        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Modern"));
        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Premium"));
        modelRepository.save(ModelFixture.createModel(tucson, diesel, _2wd, auto, "Inspiration"));

        int carId = tucson.getId();
        int engineId = diesel.getId();
        int missionId = auto.getId();
        int drivingTypeId = _2wd.getId();

        // when
        List<Model> models = modelRepository.findTrims(carId, engineId, missionId, drivingTypeId);

        // then
        assertThat(models).hasSize(3);
        assertThat(models.toString()).contains("Modern", "Premium", "Inspiration");
        models.forEach(model -> {
                    assertThat(model.getCar().getId()).isEqualTo(carId);
                    assertThat(model.getEngine().getId()).isEqualTo(engineId);
                    assertThat(model.getMission().getId()).isEqualTo(missionId);
                    assertThat(model.getDrivingType().getId()).isEqualTo(drivingTypeId);
                }
        );
    }
}
