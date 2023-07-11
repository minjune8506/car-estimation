package com.estimation.car.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class ModelDetail {

    @Column(length = 100)
    private String detailImgPath1;

    @Column(length = 100)
    private String detailImgPath2;

    @Column(length = 100)
    private String detailImgPath3;

    @Builder
    public ModelDetail(String detailImgPath1, String detailImgPath2, String detailImgPath3) {
        this.detailImgPath1 = detailImgPath1;
        this.detailImgPath2 = detailImgPath2;
        this.detailImgPath3 = detailImgPath3;
    }
}
