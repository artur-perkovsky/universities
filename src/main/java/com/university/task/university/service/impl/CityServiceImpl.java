package com.university.task.university.service.impl;

import com.university.task.university.model.CityEntity;
import com.university.task.university.repository.CityRepository;
import com.university.task.university.service.CityService;
import org.springframework.stereotype.Service;

@Service
public class CityServiceImpl extends AbstractBaseCrudServiceImpl<CityEntity, Long> implements CityService {

    private CityRepository repository;

    public CityServiceImpl(CityRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
