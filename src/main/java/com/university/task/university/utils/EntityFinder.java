package com.university.task.university.utils;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Component
public class EntityFinder {

    @PersistenceContext
    private EntityManager entityManager;

    public <U> U find(Class<U> classType, Object id) {
        return id != null ? entityManager.find(classType, id) : null;
    }
}
