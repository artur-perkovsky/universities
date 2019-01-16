package com.university.task.university.service;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.model.UniversityEntity;

import java.util.List;

public interface RatingService extends BaseCrudService<RatingEntity, Long> {

    List<RatingEntity> allByCountry(CountryEntity country);

    List<RatingEntity> allByUniversity(UniversityEntity university);
}
