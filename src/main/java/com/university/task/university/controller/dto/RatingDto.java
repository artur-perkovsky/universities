package com.university.task.university.controller.dto;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.utils.EntityFinder;

public class RatingDto extends BaseEntityDto {

    private Long position;
    private BaseEntityDto country;
    private BaseEntityDto university;

    public RatingDto() {
        super();
    }


    public RatingDto(RatingEntity ratingEntity) {
        super(ratingEntity);
        this.position = ratingEntity.getPosition();
        this.country = BaseEntityDto.from(ratingEntity.getCountry());
        this.university = BaseEntityDto.from(ratingEntity.getUniversity());
    }

    public static RatingDto from(RatingEntity ratingEntity) {
        return ratingEntity == null ? null : new RatingDto(ratingEntity);
    }

    public RatingEntity convert(EntityFinder finder) {
        RatingEntity ratingEntity = finder.find(RatingEntity.class, getId());
        ratingEntity = ratingEntity != null ? ratingEntity : new RatingEntity();
        ratingEntity.setPosition(this.getPosition());

        final BaseEntityDto country = this.getCountry();

        if (country != null) {
            ratingEntity.setCountry(finder.find(CountryEntity.class, this.getCountry().getId()));
        }

        final BaseEntityDto university = this.getUniversity();
        if (university != null) {
            ratingEntity.setUniversity(finder.find(UniversityEntity.class, this.getUniversity().getId()));
        }

        return ratingEntity;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public BaseEntityDto getCountry() {
        return country;
    }

    public void setCountry(BaseEntityDto country) {
        this.country = country;
    }

    public BaseEntityDto getUniversity() {
        return university;
    }

    public void setUniversity(BaseEntityDto university) {
        this.university = university;
    }
}
