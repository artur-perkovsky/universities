package com.university.task.university.service.impl;

import com.university.task.university.model.CountryEntity;
import com.university.task.university.repository.CountryRepository;
import com.university.task.university.service.CountryService;
import org.springframework.stereotype.Service;

@Service
public class CountryServiceImpl extends AbstractBaseCrudServiceImpl<CountryEntity, Long> implements CountryService {

    private CountryRepository repository;

    public CountryServiceImpl(CountryRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
