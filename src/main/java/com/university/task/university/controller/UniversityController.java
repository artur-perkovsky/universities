package com.university.task.university.controller;

import com.university.task.university.controller.dto.CityDto;
import com.university.task.university.controller.dto.UniversityDto;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/university")
public class UniversityController {

    @Autowired
    public UniversityService service;

    @Autowired
    public ConversionService conversionService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<UniversityDto> index(@PathVariable Long id){
        return service.byId(id).map(universityEntity -> ok(UniversityDto.from(universityEntity)))
                .orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<UniversityDto> save(@RequestBody UniversityDto dto){
        final UniversityEntity university = conversionService.convert(dto, UniversityEntity.class);
        return ok(UniversityDto.from(service.save(university)));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete (@PathVariable Long id){
        final UniversityEntity university = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(university);
        return ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<UniversityDto>> all() {
        return ok(service.all().stream().map(UniversityDto::from).collect(Collectors.toList()));
    }
}
