package com.university.task.university.service.impl;

import com.university.task.university.model.SpecialtyEntity;
import com.university.task.university.repository.SpecialtyRepository;
import com.university.task.university.service.SpecialtyService;
import org.springframework.stereotype.Service;

@Service
public class SpecaltyServiceImpl extends AbstractBaseCrudServiceImpl<SpecialtyEntity, Long> implements SpecialtyService {

    private SpecialtyRepository repository;

    public SpecaltyServiceImpl(SpecialtyRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
