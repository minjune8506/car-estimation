package com.estimation.car.repository.model;

import com.estimation.car.entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelRepository extends JpaRepository<Model, Integer>, ModelCustomRepository {

}
