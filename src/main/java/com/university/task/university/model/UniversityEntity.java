package com.university.task.university.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "university")
public class UniversityEntity extends BaseEntity {

    @Column(name = "age")
    private Long age;

    @Column(name = "specialty")
    @ManyToMany
    private List<SpecialtyEntity> specialty;

    @ManyToOne
    @JoinColumn(name = "city")
    private CityEntity city;

    public List<SpecialtyEntity> getSpecialty() {
        return specialty;
    }

    public void setSpecialty(List<SpecialtyEntity> specialty) {
        this.specialty = specialty;
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
}
