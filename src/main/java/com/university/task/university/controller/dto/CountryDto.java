package com.university.task.university.controller.dto;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.utils.EntityFinder;

public class CountryDto extends BaseEntityDto {

    public CountryDto() {
        super();
    }

    public CountryDto(CountryEntity countryEntity) {
        super(countryEntity);
    }


    public static CountryDto from(CountryEntity countryEntity) {
        return countryEntity == null ? null : new CountryDto(countryEntity);
    }

    public CountryEntity convert(EntityFinder finder) {
        CountryEntity countryEntity = finder.find(CountryEntity.class, this.getId());
        countryEntity = countryEntity != null ? countryEntity : new CountryEntity();
        countryEntity.setName(this.getName());

        return countryEntity;
    }
}
