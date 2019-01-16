package com.university.task.university.model;

import javax.persistence.*;

@Entity
@Table(name = "city")
public class CityEntity extends BaseEntity {

    @ManyToOne()
    @JoinColumn(name = "country")
    private CountryEntity country;

    public CountryEntity getCountry() {
        return country;
    }

    public void setCountry(CountryEntity country) {
        this.country = country;
    }
}
