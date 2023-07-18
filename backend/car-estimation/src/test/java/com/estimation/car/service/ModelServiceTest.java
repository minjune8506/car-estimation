package com.estimation.car.service;

import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.model.ModelFilterResponseDto;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.entity.Model;
import com.estimation.car.repository.model.ModelRepository;
import com.estimation.car.support.DrivingTypeFixture;
import com.estimation.car.support.EngineFixture;
import com.estimation.car.support.MissionFixture;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class ModelServiceTest {

    @Mock
    ModelRepository repository;

    @InjectMocks
    ModelService modelService;

    @Test
    void 필터링된_결과를_DTO로_반환한다() {
        // given
        Model model = Model.builder()
                           .engine(EngineFixture.DIESEL)
                           .mission(MissionFixture.AUTO)
                           .drivingType(DrivingTypeFixture._2WD)
                           .build();

        given(repository.filterModels(anyInt(), Optional.ofNullable(any()), Optional.ofNullable(any()))).willReturn(List.of(model));

        // when
        ModelFilterResponseDto result = modelService.filterModel(1, null, null);

        // then
        assertAll(
                () -> assertThat(result.getEngines()).hasSize(1),
                () -> assertThat(result.getEngines().get(0).getName()).isEqualTo(EngineFixture.DIESEL.getName()),
                () -> assertThat(result.getMissions()).hasSize(1),
                () -> assertThat(result.getMissions().get(0).getName()).isEqualTo(MissionFixture.AUTO.getName()),
                () -> assertThat(result.getDrivingTypes()).hasSize(1),
                () -> assertThat(result.getDrivingTypes().get(0).getName()).isEqualTo(DrivingTypeFixture._2WD.getName())
        );
    }

    @Test
    void 해당하는_모델이_없는_경우_ModelNotFoundExcpetion을_발생시킨다() {
        // given
        given(repository.filterModels(anyInt(), Optional.ofNullable(any()), Optional.ofNullable(any()))).willReturn(List.of());

        // when
        Throwable thrown = catchThrowable(() -> {
            ModelFilterResponseDto result = modelService.filterModel(1, null, null);
        });

        // then
        assertThat(thrown).isInstanceOf(ModelNotFoundException.class);
    }

    @Test
    void 해당하는_트림들을_찾는다() {
        // given
        Model model = Model.builder()
                           .engine(EngineFixture.DIESEL)
                           .mission(MissionFixture.AUTO)
                           .drivingType(DrivingTypeFixture._2WD)
                           .trimName("Modern")
                           .detailImgPath1("1")
                           .detailImgPath2("2")
                           .detailImgPath3("3")
                           .price(12340000)
                           .build();

        given(repository.findTrims(anyInt(), anyInt(), anyInt(), anyInt())).willReturn(List.of(model));

        // when
        List<ModelResponse> result = modelService.findTrims(1, 1, 1, 1);

        // then
        assertAll(
                () -> assertThat(result).hasSize(1),
                () -> assertThat(result.get(0).getTrimName()).isEqualTo("Modern"));


    }

    @Test
    void 해당하는_트림을_찾지_못한_경우_ModelNotFoundException을_발생시킨다() {
        // given
        given(repository.findTrims(anyInt(), anyInt(), anyInt(), anyInt())).willReturn(List.of());

        // when
        Throwable thrown = catchThrowable(() -> {
            List<ModelResponse> result = modelService.findTrims(1, 1, 1, 1);
        });

        // then
        assertThat(thrown).isInstanceOf(ModelNotFoundException.class);
    }
}
