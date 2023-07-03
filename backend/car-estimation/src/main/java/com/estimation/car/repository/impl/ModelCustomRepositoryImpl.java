package com.estimation.car.repository.impl;

import com.estimation.car.entity.Model;
import com.estimation.car.repository.ModelCustomRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.estimation.car.entity.QModel.model;


@Repository
@RequiredArgsConstructor
public class ModelCustomRepositoryImpl implements ModelCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Model> filterModels(final int carId, final Integer engineId, final Integer missionId) {
        return jpaQueryFactory.selectFrom(model)
                              .innerJoin(model.engine)
                              .fetchJoin()
                              .innerJoin(model.mission)
                              .fetchJoin()
                              .innerJoin(model.drivingType)
                              .fetchJoin()
                              .where(
                                      model.car.id.eq(carId),
                                      eqEngineId(engineId),
                                      eqMissionId(missionId)
                              )
                              .orderBy(model.car.id.asc(), model.engine.id.asc(), model.mission.id.asc(), model.drivingType.id.asc())
                              .fetch();
    }

    @Override
    public List<Model> findTrims(final int carId, final int engineId, final int missionId, final int drivingTypeId) {
        return jpaQueryFactory.selectFrom(model)
                              .where(model.car.id.eq(carId),
                                      model.engine.id.eq(engineId),
                                      model.mission.id.eq(missionId),
                                      model.drivingType.id.eq(drivingTypeId))
                              .orderBy(model.id.asc())
                              .fetch();
    }

    private BooleanExpression eqEngineId(final Integer engineId) {
        return engineId == null ? null : model.engine.id.eq(engineId);
    }

    private BooleanExpression eqMissionId(final Integer missionId) {
        return missionId == null ? null : model.mission.id.eq(missionId);
    }

}
