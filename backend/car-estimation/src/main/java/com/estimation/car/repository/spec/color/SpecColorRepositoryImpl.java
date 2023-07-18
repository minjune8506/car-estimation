package com.estimation.car.repository.spec.color;

import com.estimation.car.entity.SpecColor;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.estimation.car.entity.QExteriorColor.exteriorColor;
import static com.estimation.car.entity.QInteriorColor.interiorColor;
import static com.estimation.car.entity.QModel.model;
import static com.estimation.car.entity.QSpec.spec;
import static com.estimation.car.entity.QSpecColor.specColor;

@RequiredArgsConstructor
@Repository
public class SpecColorRepositoryImpl implements SpecColorCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SpecColor> findCarSpecColorsBy(final int carId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(spec.model, model).fetchJoin()
                       .join(specColor.exteriorColor, exteriorColor).fetchJoin()
                       .join(specColor.interiorColor, interiorColor).fetchJoin()
                       .where(model.car.id.eq(carId))
                       .orderBy(specColor.exteriorColor.id.asc(), specColor.interiorColor.id.asc())
                       .fetch();
    }

    @Override
    public List<SpecColor> findModelSpecColorsBy(final int modelId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(specColor.exteriorColor, exteriorColor).fetchJoin()
                       .join(specColor.interiorColor, interiorColor).fetchJoin()
                       .where(spec.model.id.eq(modelId))
                       .orderBy(spec.specCode.asc())
                       .fetch();
    }

    @Override
    public List<SpecColor> findExteriorColorsBy(final int carId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(specColor.exteriorColor).fetchJoin()
                       .where(spec.model.car.id.eq(carId))
                       .orderBy(specColor.exteriorColor.id.asc())
                       .fetch();
    }

    @Override
    public List<SpecColor> findInteriorColorsBy(final int carId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(specColor.interiorColor).fetchJoin()
                       .where(spec.model.car.id.eq(carId))
                       .orderBy(specColor.interiorColor.id.asc())
                       .fetch();
    }

    @Override
    public List<SpecColor> findSpecColorsBy(final int modelId, final int exteriorColorId, final int interiorColorId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec).fetchJoin()
                       .where(specColor.spec.model.id.eq(modelId),
                               specColor.exteriorColor.id.eq(exteriorColorId),
                               specColor.interiorColor.id.eq(interiorColorId))
                       .fetch();
    }

    @Override
    public List<SpecColor> findSpecColorsBy(final int modelId, final char specCode) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(specColor.exteriorColor, exteriorColor).fetchJoin()
                       .join(specColor.interiorColor, interiorColor).fetchJoin()
                       .where(spec.model.id.eq(modelId),
                               spec.specCode.eq(specCode))
                       .fetch();
    }

    @Override
    public List<SpecColor> findSpecColorsToChangeBy(int modelId) {
        return jpaQueryFactory.selectFrom(specColor)
                       .join(specColor.spec, spec).fetchJoin()
                       .join(spec.model, model).fetchJoin()
                       .join(specColor.interiorColor, interiorColor).fetchJoin()
                       .join(specColor.exteriorColor, exteriorColor).fetchJoin()
                       .where(Expressions.list(model.engine.id, model.mission.id, model.drivingType.id).in(
                               JPAExpressions.select(model.engine.id, model.mission.id, model.drivingType.id)
                                       .from(model)
                                       .where(model.id.eq(modelId))))
                       .fetch();
    }
}
