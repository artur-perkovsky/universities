package com.university.task.university.service.impl;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.repository.UniversityRepository;
import com.university.task.university.service.RatingService;
import com.university.task.university.service.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityServiceImpl extends AbstractBaseCrudServiceImpl<UniversityEntity, Long> implements UniversityService {

    private UniversityRepository repository;
    private RatingService ratingService;

    public UniversityServiceImpl(UniversityRepository repository, RatingService ratingService) {
        super(repository);
        this.repository = repository;
        this.ratingService = ratingService;
    }

    @Override
    public List<UniversityEntity> allByCity(final CityEntity city) {
        return repository.getAllByCity(city);
    }

    @Override
    public void delete(final UniversityEntity university) {

        ratingService.allByUniversity(university)
                .forEach(ratingService::delete);

        super.delete(university);
    }
}
