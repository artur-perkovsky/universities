package com.university.task.university.service.impl;

import com.university.task.university.model.RatingEntity;
import com.university.task.university.repository.RatingRepository;
import com.university.task.university.service.RatingService;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl extends AbstractBaseCrudServiceImpl<RatingEntity, Long> implements RatingService {

    private RatingRepository repository;

    public RatingServiceImpl(RatingRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
