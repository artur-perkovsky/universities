package com.university.task.university.model;

import javax.persistence.*;

@Entity
@Table(name = "city")
public class CityEntity extends BaseEntity {

    @ManyToOne
    private CountryEntity countryEntity;

    public CountryEntity getCountryEntity() {
        return countryEntity;
    }

    public void setCountryEntity(CountryEntity countryEntity) {
        this.countryEntity = countryEntity;
    }
}
