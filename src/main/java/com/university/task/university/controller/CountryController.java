package com.university.task.university.controller;

import com.university.task.university.controller.dto.CountryDto;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.CountryEntity;
import com.university.task.university.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/country")
public class CountryController {

    @Autowired
    private CountryService service;

    @Autowired
    private ConversionService conversionService;

    @GetMapping("/all")
    public ResponseEntity<List<CountryDto>> all() {
        return ok(service.all().stream().map(CountryDto::from).collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CountryDto> index(@PathVariable Long id) {
        return service.byId(id).map(countryEntity -> ok(CountryDto.from(countryEntity))).orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<CountryDto> save(@RequestBody CountryDto dto) {
        final CountryEntity country = conversionService.convert(dto, CountryEntity.class);
        return ok(CountryDto.from(service.save(country)));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final CountryEntity country = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(country);
        return ok().build();
    }

}
