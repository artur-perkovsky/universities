package com.university.task.university.service;

import com.university.task.university.model.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BaseCrudService<T extends BaseEntity, S> {

    T save(T entity);

    void delete(T entity);

    Optional<T> byId(S id);

    Page<T> list(Pageable page);

    List<T> all();

}
