package com.estimation.car.repository.spec.option.constraints;

import com.estimation.car.entity.Action;
import com.estimation.car.entity.QSpecOption;
import com.estimation.car.entity.SpecOptionConstraint;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.estimation.car.entity.QOption.option;
import static com.estimation.car.entity.QSpecOptionConstraint.specOptionConstraint;
import static com.querydsl.jpa.JPAExpressions.select;

@RequiredArgsConstructor
@Repository
public class CustomSpecOptionConstraintRepositoryImpl implements CustomSpecOptionConstraintRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SpecOptionConstraint> findConstraintsBy(final int modelId, final List<Integer> selectedOptions) {
        QSpecOption s = new QSpecOption("S");
        QSpecOption t = new QSpecOption("T");

        return jpaQueryFactory.selectFrom(specOptionConstraint)
                       .join(specOptionConstraint.source, s).fetchJoin()
                       .join(specOptionConstraint.target, t).fetchJoin()
                       .join(s.spec).fetchJoin()
                       .join(t.option).fetchJoin()
                       .join(t.option.optionCategory).fetchJoin()
                       .where(s.spec.model.id.eq(modelId),
                               s.option.id.in(selectedOptions))
                       .fetch();
    }

    @Override
    public List<SpecOptionConstraint> findConstraintsBy(int modelId, int optionId) {
        QSpecOption s = new QSpecOption("S");
        QSpecOption t = new QSpecOption("T");

        return jpaQueryFactory
                       .selectFrom(specOptionConstraint)
                       .join(specOptionConstraint.source, s).fetchJoin()
                       .join(s.option, option).fetchJoin()
                       .where(specOptionConstraint.source.id.in(
                                       select(specOptionConstraint.source.id)
                                               .from(specOptionConstraint)
                                               .join(specOptionConstraint.target, t)
                                               .join(t.spec)
                                               .join(t.spec.model)
                                               .where(t.option.id.eq(optionId),
                                                       t.spec.model.id.eq(modelId))
                               ),
                               specOptionConstraint.action.eq(Action.ENABLE)
                                       .or(specOptionConstraint.action.eq(Action.DISABLE))
                       ).fetch();
    }
}
