package com.university.task.university.service.impl;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.repository.CountryRepository;
import com.university.task.university.service.CityService;
import com.university.task.university.service.CountryService;
import org.springframework.stereotype.Service;

@Service
public class CountryServiceImpl extends AbstractBaseCrudServiceImpl<CountryEntity, Long> implements CountryService {

    private CountryRepository repository;
    private CityService cityService;

    public CountryServiceImpl(CountryRepository repository, CityService cityService) {
        super(repository);
        this.repository = repository;
        this.cityService = cityService;
    }

    @Override
    public void delete(final CountryEntity country) {

        cityService.allByCountry(country)
                .forEach(cityService::delete);

        super.delete(country);
    }
}
