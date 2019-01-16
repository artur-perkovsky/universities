package com.university.task.university.repository;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.UniversityEntity;

import java.util.List;

public interface UniversityRepository extends BaseRepository<UniversityEntity, Long> {

    List<UniversityEntity> getAllByCity(CityEntity city);
}
