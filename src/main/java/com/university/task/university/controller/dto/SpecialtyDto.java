package com.university.task.university.controller.dto;

import com.university.task.university.model.SpecialtyEntity;
import com.university.task.university.utils.EntityFinder;

public class SpecialtyDto extends BaseEntityDto {

    public SpecialtyDto() {
        super();
    }

    public SpecialtyDto(SpecialtyEntity specialtyEntity) {
        super(specialtyEntity);
    }

    public static SpecialtyDto from(SpecialtyEntity specialtyEntity) {
        return specialtyEntity == null ? null : new SpecialtyDto(specialtyEntity);
    }

    public SpecialtyEntity convert(EntityFinder finder) {
        SpecialtyEntity specialtyEntity = finder.find(SpecialtyEntity.class, this.getId());
        specialtyEntity = specialtyEntity != null ? specialtyEntity : new SpecialtyEntity();
        specialtyEntity.setName(this.getName());

        return specialtyEntity;
    }
}
