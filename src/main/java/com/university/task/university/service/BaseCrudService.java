package com.university.task.university.service;

import com.university.task.university.model.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface BaseCrudService<T extends BaseEntity, S> {

    T save(T entity);

    void delete(T entity);

    Optional<T> byId(S id);

    Page<T> list(Specification <T> specification, Pageable page);

    List<T> all();

    List<T> search(Specification <T> specification);
}
