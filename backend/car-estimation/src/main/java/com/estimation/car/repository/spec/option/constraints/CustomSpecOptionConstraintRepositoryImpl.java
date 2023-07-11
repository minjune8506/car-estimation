package com.estimation.car.repository.spec.option.constraints;

import com.estimation.car.entity.QSpecOption;
import com.estimation.car.entity.SpecOptionConstraint;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.estimation.car.entity.QSpecOptionConstraint.specOptionConstraint;

@RequiredArgsConstructor
@Repository
public class CustomSpecOptionConstraintRepositoryImpl implements CustomSpecOptionConstraintRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SpecOptionConstraint> findConstraints(final int modelId, final char specCode, final int optionId) {
        QSpecOption s = new QSpecOption("S");
        QSpecOption t = new QSpecOption("T");

        return jpaQueryFactory.selectFrom(specOptionConstraint)
                              .join(specOptionConstraint.source, s).fetchJoin()
                              .join(specOptionConstraint.target, t).fetchJoin()
                              .join(s.spec).fetchJoin()
                              .join(t.option).fetchJoin()
                              .join(t.option.optionCategory).fetchJoin()
                              .where(s.spec.model.id.eq(modelId),
                                      s.spec.specCode.eq(specCode),
                                      s.option.id.eq(optionId))
                              .fetch();
    }
}
