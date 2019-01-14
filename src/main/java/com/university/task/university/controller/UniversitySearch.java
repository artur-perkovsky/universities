package com.university.task.university.controller;

import java.util.List;

public class UniversitySearch {

    private Long city;
    private Long age;
    private List<Long> specialties;
    private Long country;

    public Long getCity() {
        return city;
    }

    public void setCity(Long city) {
        this.city = city;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }


    public List<Long> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<Long> specialties) {
        this.specialties = specialties;
    }

    public Long getCountry() {
        return country;
    }

    public void setCountry(Long country) {
        this.country = country;
    }
}
