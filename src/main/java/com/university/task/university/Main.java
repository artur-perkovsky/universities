package com.university.task.university;

import com.university.task.university.controller.dto.CityDto;
import com.university.task.university.controller.dto.CountryDto;
import com.university.task.university.controller.dto.SpecialtyDto;
import com.university.task.university.controller.dto.UniversityDto;
import com.university.task.university.model.CityEntity;
import com.university.task.university.model.CountryEntity;
import com.university.task.university.model.SpecialtyEntity;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.utils.EntityFinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Main implements WebMvcConfigurer {

    @Autowired
    private EntityFinder entityFinder;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(CityDto.class, CityEntity.class, source -> source.convert(entityFinder));
        registry.addConverter(CountryDto.class, CountryEntity.class, source -> source.convert(entityFinder));
        registry.addConverter(SpecialtyDto.class, SpecialtyEntity.class, source -> source.convert(entityFinder));
        registry.addConverter(UniversityDto.class, UniversityEntity.class, source -> source.convert(entityFinder));
    }
}
