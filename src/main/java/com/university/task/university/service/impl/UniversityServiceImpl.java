package com.university.task.university.service.impl;

import com.university.task.university.model.UniversityEntity;
import com.university.task.university.repository.UniversityRepositore;
import com.university.task.university.service.UniversityService;
import org.springframework.stereotype.Service;

@Service
public class UniversityServiceImpl extends AbstractBaseCrudServiceImpl<UniversityEntity, Long> implements UniversityService {

    private UniversityRepositore repositore;

    public UniversityServiceImpl(UniversityRepositore repository) {
        super(repository);
        this.repositore = repository;
    }
}
