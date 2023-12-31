package com.estimation.car.entity;

import com.estimation.car.entity.id.SpecColorId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@IdClass(SpecColorId.class)
public class SpecColor {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SPEC_ID")
    private Spec spec;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXTERIOR_COLOR_ID")
    private ExteriorColor exteriorColor;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INTERIOR_COLOR_ID")
    private InteriorColor interiorColor;

    @Builder
    public SpecColor(Spec spec, ExteriorColor exteriorColor, InteriorColor interiorColor) {
        this.spec = spec;
        this.exteriorColor = exteriorColor;
        this.interiorColor = interiorColor;
    }

    public int getModelId() {
        return spec.getModel().getId();
    }

    public int getInteriorColorId() {
        return interiorColor.getId();
    }

    public int getExteriorColorId() {
        return exteriorColor.getId();
    }

    public char getSpecCode() {
        return spec.getSpecCode();
    }

    public Model getModel() {
        return spec.getModel();
    }

    public boolean isSameInteriorColor(final int interiorColorId) {
        return this.getInteriorColorId() == interiorColorId;
    }

    public boolean isSameExteriorColor(final int exteriorColorId) {
        return this.getExteriorColorId() == exteriorColorId;
    }

    public boolean isSameColor(final int exteriorColorId, final int interiorColorId) {
        return this.getExteriorColorId() == exteriorColorId && this.getInteriorColorId() == interiorColorId;
    }
}
