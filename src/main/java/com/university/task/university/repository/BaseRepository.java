package com.university.task.university.repository;

import com.university.task.university.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, S> extends JpaRepository<T, S> {

    Optional<T> findById(S s);
}
