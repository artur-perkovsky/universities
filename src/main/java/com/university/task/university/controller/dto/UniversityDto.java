package com.university.task.university.controller.dto;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.SpecialtyEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.utils.EntityFinder;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UniversityDto extends BaseEntityDto {

    private Long age;
    private BaseEntityDto city;
    private BaseEntityDto country;
    private List<BaseEntityDto> specialities;
    private Long rating;

    public UniversityDto() {
        super();
    }

    public UniversityDto(UniversityEntity university) {
        super(university);
        this.age = university.getAge();

        final CityEntity city = university.getCity();
        if (city != null) {
            this.city = CityDto.from(city);
            this.country = CountryDto.from(city.getCountry());
        }

        final List<SpecialtyEntity> specialties = university.getSpecialties();
        if (specialties != null) {
            this.specialities = specialties.stream().map(SpecialtyDto::from).collect(Collectors.toList());
        }

        this.rating = university.getRating();
    }

    public static UniversityDto from(UniversityEntity universityEntity) {
        return universityEntity == null ? null : new UniversityDto(universityEntity);
    }

    public UniversityEntity convert(EntityFinder finder) {
        UniversityEntity university = finder.find(UniversityEntity.class, this.getId());
        university = university != null ? university : new UniversityEntity();
        university.setAge(this.getAge());
        university.setName(this.getName());
        university.setRating(this.getRating());

        BaseEntityDto city = this.getCity();

        if (city != null) {
            university.setCity(finder.find(CityEntity.class, city.getId()));
        }

        final List<BaseEntityDto> specialities = this.getSpecialities();

        if (specialities != null) {
            university.setSpecialties(specialities.stream().map(speciality -> finder.find(SpecialtyEntity.class, speciality.getId())).filter(Objects::nonNull).collect(Collectors.toList()));
        }

        return university;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public BaseEntityDto getCity() {
        return city;
    }

    public void setCity(BaseEntityDto city) {
        this.city = city;
    }

    public List<BaseEntityDto> getSpecialities() {
        return specialities;
    }

    public void setSpecialities(List<BaseEntityDto> specialities) {
        this.specialities = specialities;
    }

    public BaseEntityDto getCountry() {
        return country;
    }

    public void setCountry(BaseEntityDto country) {
        this.country = country;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }
}
