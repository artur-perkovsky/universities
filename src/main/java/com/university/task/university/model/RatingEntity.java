package com.university.task.university.model;

import javax.persistence.*;

@Entity
@Table(name = "rating")
public class RatingEntity extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "university")
    private UniversityEntity university;

    @OneToOne
    @JoinColumn(name = "country")
    private CountryEntity country;

    @Column(name = "position")
    private Long position;

    public UniversityEntity getUniversity() {
        return university;
    }

    public void setUniversity(UniversityEntity university) {
        this.university = university;
    }

    public CountryEntity getCountry() {
        return country;
    }

    public void setCountry(CountryEntity country) {
        this.country = country;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }
}



