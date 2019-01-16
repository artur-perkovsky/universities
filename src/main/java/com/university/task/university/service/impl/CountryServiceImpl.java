package com.university.task.university.service.impl;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.repository.CountryRepository;
import com.university.task.university.service.CityService;
import com.university.task.university.service.CountryService;
import com.university.task.university.service.RatingService;
import com.university.task.university.service.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl extends AbstractBaseCrudServiceImpl<CountryEntity, Long> implements CountryService {

    private CountryRepository repository;
    private CityService cityService;
    private RatingService ratingService;

    public CountryServiceImpl(CountryRepository repository, CityService cityService, RatingService ratingService) {
        super(repository);
        this.repository = repository;
        this.cityService = cityService;
        this.ratingService = ratingService;
    }

    @Override
    public void delete(final CountryEntity country) {

        ratingService.allByCountry(country)
                .forEach(ratingService::delete);

        cityService.allByCountry(country)
                .forEach(cityService::delete);

        super.delete(country);
    }
}
