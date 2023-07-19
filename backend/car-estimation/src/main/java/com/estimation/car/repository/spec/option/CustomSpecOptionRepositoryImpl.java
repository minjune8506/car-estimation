package com.estimation.car.repository.spec.option;

import com.estimation.car.entity.SpecOption;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.estimation.car.entity.QOption.option;
import static com.estimation.car.entity.QOptionCategory.optionCategory;
import static com.estimation.car.entity.QSpec.spec;
import static com.estimation.car.entity.QSpecOption.specOption;

@RequiredArgsConstructor
@Repository
public class CustomSpecOptionRepositoryImpl implements CustomSpecOptionRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SpecOption> findSpecOptionsBy(final int modelId, final Optional<Character> specCode) {
        return jpaQueryFactory.selectFrom(specOption)
                       .join(specOption.spec, spec).fetchJoin()
                       .join(specOption.option, option).fetchJoin()
                       .join(option.optionCategory, optionCategory).fetchJoin()
                       .where(spec.model.id.eq(modelId),
                               specOption.showYn.eq('Y'),
                               eqSpecCode(specCode))
                       .orderBy(specOption.spec.specCode.asc())
                       .fetch();
    }

    @Override
    public List<SpecOption> findSpecOptionsBy(int modelId, List<Integer> optionIds) {
        return jpaQueryFactory.selectFrom(specOption)
                       .join(specOption.option, option).fetchJoin()
                       .join(option.optionCategory, optionCategory).fetchJoin()
                       .where(option.id.in(optionIds),
                               specOption.spec.model.id.eq(modelId))
                       .fetch();
    }

    private BooleanExpression eqSpecCode(Optional<Character> specCode) {
        return specCode.map(spec.specCode::eq).orElse(null);
    }
}
