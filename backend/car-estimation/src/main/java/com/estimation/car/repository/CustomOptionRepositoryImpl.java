package com.estimation.car.repository;

import com.estimation.car.entity.Option;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.estimation.car.entity.QOption.option;


@RequiredArgsConstructor
@Repository
public class CustomOptionRepositoryImpl implements CustomOptionRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Option> findAllByIds(List<Integer> ids) {
        return jpaQueryFactory.selectFrom(option)
                       .join(option.optionCategory)
                       .where(option.id.in(ids))
                       .fetch();
    }

}
