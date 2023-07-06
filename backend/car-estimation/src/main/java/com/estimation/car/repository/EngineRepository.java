package com.estimation.car.repository;

import com.estimation.car.entity.Engine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EngineRepository extends JpaRepository<Engine, Integer> {
}
