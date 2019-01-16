package com.university.task.university.repository;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.CountryEntity;

import java.util.List;

public interface CityRepository extends BaseRepository<CityEntity, Long> {

    List<CityEntity> getAllByCountry(CountryEntity country);
}
