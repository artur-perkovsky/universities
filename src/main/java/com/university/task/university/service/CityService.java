package com.university.task.university.service;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.CountryEntity;

import java.util.List;

public interface CityService extends BaseCrudService<CityEntity, Long> {

    List<CityEntity> allByCountry(CountryEntity country);
}
