package com.university.task.university.service.impl;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.repository.RatingRepository;
import com.university.task.university.service.RatingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl extends AbstractBaseCrudServiceImpl<RatingEntity, Long> implements RatingService {

    private RatingRepository repository;

    public RatingServiceImpl(RatingRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public List<RatingEntity> allByCountry(final CountryEntity country) {
        return repository.getAllByCountry(country);
    }

    @Override
    public List<RatingEntity> allByUniversity(final UniversityEntity university) {
        return repository.getAllByUniversity(university);
    }
}
