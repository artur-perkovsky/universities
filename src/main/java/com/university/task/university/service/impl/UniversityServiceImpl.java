package com.university.task.university.service.impl;

import com.university.task.university.model.CityEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.repository.UniversityRepository;
import com.university.task.university.service.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityServiceImpl extends AbstractBaseCrudServiceImpl<UniversityEntity, Long> implements UniversityService {

    private UniversityRepository repository;

    public UniversityServiceImpl(UniversityRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public List<UniversityEntity> allByCity(final CityEntity city) {
        return repository.getAllByCity(city);
    }

    @Override
    public void delete(final UniversityEntity university) {


        super.delete(university);
    }
}
