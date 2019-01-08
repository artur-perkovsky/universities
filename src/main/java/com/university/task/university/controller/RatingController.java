package com.university.task.university.controller;

import com.university.task.university.controller.dto.RatingDto;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/rating")
public class RatingController {

    @Autowired
    private RatingService service;

    @Autowired
    private ConversionService conversionService;

    @GetMapping("/all")
    public ResponseEntity<List<RatingDto>> all(){
        return ok(service.all().stream().map(RatingDto::from).collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RatingDto> index(@PathVariable Long id) {
        return service.byId(id).map(ratingEntity -> ok(RatingDto.from(ratingEntity)))
                .orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RatingDto> save(@RequestBody RatingDto dto){
        final RatingEntity rating = conversionService.convert(dto, RatingEntity.class);
        return ok(RatingDto.from(service.save(rating)));

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        final RatingEntity rating = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        return ok().build();
    }
}
