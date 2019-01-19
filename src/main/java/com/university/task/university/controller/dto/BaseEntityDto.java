package com.university.task.university.controller.dto;

import com.university.task.university.model.BaseEntity;

public class BaseEntityDto {

    private Long id;
    private String name;

    public BaseEntityDto() {
    }

    public BaseEntityDto(BaseEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }

    public static BaseEntityDto from(BaseEntity entity) {
        return entity == null ? null : new BaseEntityDto(entity);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
