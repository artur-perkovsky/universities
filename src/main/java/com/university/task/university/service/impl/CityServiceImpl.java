package com.university.task.university.service.impl;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.CountryEntity;
import com.university.task.university.repository.CityRepository;
import com.university.task.university.service.CityService;
import com.university.task.university.service.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl extends AbstractBaseCrudServiceImpl<CityEntity, Long> implements CityService {

    private CityRepository repository;
    private UniversityService universityService;

    public CityServiceImpl(CityRepository repository, UniversityService universityService) {
        super(repository);
        this.repository = repository;
        this.universityService = universityService;
    }

    @Override
    public List<CityEntity> allByCountry(final CountryEntity country) {
        return repository.getAllByCountry(country);
    }

    @Override
    public void delete(final CityEntity city) {

        universityService.allByCity(city)
                .forEach(universityService::delete);

        super.delete(city);
    }
}
