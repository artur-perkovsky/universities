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

    public UniversityDto() {
        super();
    }

    public UniversityDto(UniversityEntity universityEntity) {
        super(universityEntity);
        this.age = universityEntity.getAge();

        final CityEntity city = universityEntity.getCity();
        if (city != null) {
            this.city = CityDto.from(city);
            this.country = CountryDto.from(city.getCountryEntity());
        }

        final List<SpecialtyEntity> specialties = universityEntity.getSpecialty();
        if (specialties != null) {
            this.specialities = specialties.stream().map(SpecialtyDto::from).collect(Collectors.toList());
        }
    }

    public static UniversityDto from(UniversityEntity universityEntity) {
        return universityEntity == null ? null : new UniversityDto(universityEntity);
    }

    public UniversityEntity convert(EntityFinder finder) {
        UniversityEntity universityEntity = finder.find(UniversityEntity.class, this.getId());
        universityEntity = universityEntity != null ? universityEntity : new UniversityEntity();
        universityEntity.setAge(this.getAge());
        universityEntity.setName(this.getName());

        BaseEntityDto city = this.getCity();

        if (city != null) {
            universityEntity.setCity(finder.find(CityEntity.class, city.getId()));
        }

        final List<BaseEntityDto> specialities = this.getSpecialities();

        if (specialities != null) {
            universityEntity.setSpecialty(specialities.stream().map(speciality -> finder.find(SpecialtyEntity.class, speciality.getId())).filter(Objects::nonNull).collect(Collectors.toList()));
        }

        return universityEntity;
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
}
