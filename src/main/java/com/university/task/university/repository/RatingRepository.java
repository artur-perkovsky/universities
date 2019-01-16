package com.university.task.university.repository;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.model.UniversityEntity;

import java.util.List;

public interface RatingRepository extends BaseRepository<RatingEntity, Long> {

    List<RatingEntity> getAllByCountry(CountryEntity country);

    List<RatingEntity> getAllByUniversity(UniversityEntity university);

}
