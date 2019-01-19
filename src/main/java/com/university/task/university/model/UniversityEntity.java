package com.university.task.university.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "university")
public class UniversityEntity extends BaseEntity {

    @Column(name = "age")
    private Long age;

    @ManyToMany
    @Column(name = "specialty")
    private List<SpecialtyEntity> specialties;

    @ManyToOne
    @JoinColumn(name = "city")
    private CityEntity city;

    @Column(name = "rating")
    private Long rating;

    public List<SpecialtyEntity> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<SpecialtyEntity> specialties) {
        this.specialties = specialties;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public CityEntity getCity() {
        return city;
    }

    public void setCity(CityEntity city) {
        this.city = city;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }
}
