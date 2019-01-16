package com.university.task.university.controller.dto;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.CountryEntity;
import com.university.task.university.utils.EntityFinder;

public class CityDto extends BaseEntityDto {

    private BaseEntityDto country;

    public CityDto() {
        super();
    }

    public CityDto(CityEntity cityEntity) {
        super(cityEntity);
        this.country = BaseEntityDto.from(cityEntity.getCountry());
    }

    public static CityDto from(CityEntity cityEntity) {
        return cityEntity == null ? null : new CityDto(cityEntity);
    }

    public CityEntity convert(EntityFinder finder) {
        CityEntity cityEntity = finder.find(CityEntity.class, this.getId());
        cityEntity = cityEntity != null ? cityEntity : new CityEntity();
        cityEntity.setName(getName());

        final BaseEntityDto country = this.getCountry();

        if (country != null) {
            cityEntity.setCountry(finder.find(CountryEntity.class, this.getCountry().getId()));
        }

        return cityEntity;
    }

    public BaseEntityDto getCountry() {
        return country;
    }

    public void setCountry(BaseEntityDto country) {
        this.country = country;
    }
}
