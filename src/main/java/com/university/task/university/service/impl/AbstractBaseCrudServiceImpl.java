package com.university.task.university.service.impl;

import com.university.task.university.model.BaseEntity;
import com.university.task.university.repository.BaseRepository;
import com.university.task.university.service.BaseCrudService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public class AbstractBaseCrudServiceImpl<T extends BaseEntity, S> implements BaseCrudService<T, S> {

    private BaseRepository<T, S> repository;

    public AbstractBaseCrudServiceImpl(BaseRepository<T, S> repository) {
        this.repository = repository;
    }

    @Override
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public void delete(T entity) {
        repository.delete(entity);
    }

    @Override
    public Optional<T> byId(S id) {
        return repository.findById(id);
    }

    @Override
    public Page<T> list(Specification<T> specification, Pageable page) {
        return repository.findAll(specification, page);
    }

    @Override
    public List<T> all() {
        return repository.findAll();
    }
}
