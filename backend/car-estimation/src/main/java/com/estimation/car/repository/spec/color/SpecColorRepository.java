package com.estimation.car.repository.spec.color;

import com.estimation.car.entity.SpecColor;
import com.estimation.car.entity.id.SpecColorId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecColorRepository extends JpaRepository<SpecColor, SpecColorId>, SpecColorCustomRepository {
}
