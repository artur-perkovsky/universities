package com.university.task.university.service;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.UniversityEntity;

import java.util.List;

public interface UniversityService extends BaseCrudService<UniversityEntity, Long> {

    List<UniversityEntity> allByCity(CityEntity city);
}
