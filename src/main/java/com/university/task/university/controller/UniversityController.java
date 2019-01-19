package com.university.task.university.controller;

import com.university.task.university.controller.dto.UniversityDto;
import com.university.task.university.controller.search.UniversitySearch;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.UniversityEntity;
import com.university.task.university.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.JoinType;
import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;
import static org.springframework.data.jpa.domain.Specification.where;
import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/university")
public class UniversityController {

    @Autowired
    public UniversityService service;

    @Autowired
    public ConversionService conversionService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<UniversityDto> index(@PathVariable Long id) {
        return service.byId(id).map(universityEntity -> ok(UniversityDto.from(universityEntity))).orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<UniversityDto> save(@RequestBody UniversityDto dto) {
        final UniversityEntity university = conversionService.convert(dto, UniversityEntity.class);
        return ok(UniversityDto.from(service.save(university)));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final UniversityEntity university = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(university);
        return ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<UniversityDto>> all() {
        return ok(service.all().stream().map(UniversityDto::from).collect(Collectors.toList()));
    }

    @GetMapping("/list")
    public ResponseEntity<Page<UniversityDto>> list(@Valid UniversitySearch search, @PageableDefault(sort = {"rating"}) Pageable pageable) {

        final Specification<UniversityEntity> age = (root, query, builder) -> ofNullable(search.getAge()).map(value -> builder.lessThan(root.get("age"), search.getAge())).orElse(null);

        final Specification<UniversityEntity> rating = (root, query, builder) -> ofNullable(search.getRating()).map(value -> builder.lessThan(root.get("rating"), search.getRating())).orElse(null);

        final Specification<UniversityEntity> city = (root, query, builder) -> ofNullable(search.getCity()).map(value -> builder.equal(root.join("city", JoinType.INNER).get("id"), search.getCity())).orElse(null);

        final Specification<UniversityEntity> specialties = (root, query, builder) -> ofNullable(search.getSpecialty()).map(values -> builder.isTrue(root.join("specialties", JoinType.INNER).get("id").in(Collections.singletonList(search.getSpecialty())))).orElse(null);

        final Specification<UniversityEntity> country = (root, query, builder) -> ofNullable(search.getCountry()).map(values -> builder.equal(root.join("city", JoinType.INNER).join("country", JoinType.INNER).get("id"), search.getCountry())).orElse(null);

        final Specification<UniversityEntity> result = (root, query, builder) -> {
            query.distinct(true);
            return where(where(age).and(rating).and(city).and(specialties).and(country)).toPredicate(root, query, builder);
        };

        return ok(service.list(result, pageable).map(UniversityDto::from));
    }

}
