package com.university.task.university.controller;

import com.university.task.university.controller.dto.SpecialtyDto;
import com.university.task.university.controller.search.CountrySearch;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.SpecialtyEntity;
import com.university.task.university.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;
import static org.springframework.data.jpa.domain.Specification.where;
import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/specialty")
public class SpecialtyController {

    @Autowired
    public SpecialtyService service;

    @Autowired
    public ConversionService conversionService;

    @GetMapping("/all")
    public ResponseEntity<List<SpecialtyDto>> all() {
        return ok(service.all().stream().map(SpecialtyDto::from).collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SpecialtyDto> index(@PathVariable Long id) {
        return service.byId(id).map(specialtyEntity -> ok(SpecialtyDto.from(specialtyEntity))).orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<SpecialtyDto> save(@RequestBody SpecialtyDto dto) {
        validate(dto);
        final SpecialtyEntity specialty = conversionService.convert(dto, SpecialtyEntity.class);
        return ok(SpecialtyDto.from(service.save(specialty)));
    }

    private void validate(SpecialtyDto dto) {
        if (dto.getName() == null) {
            throw new UniversityBadRequestException();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final SpecialtyEntity specialty = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(specialty);
        return ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<Page<SpecialtyDto>> list(@Valid CountrySearch search, @PageableDefault(sort = {"name"}) Pageable pageable) {

        final Specification<SpecialtyEntity> name = (root, query, builder) ->
                ofNullable(search.getName())
                        .map(value -> builder.lessThan(root.get("name"), search.getName()))
                        .orElse(null);

        final Specification<SpecialtyEntity> result = (root, query, builder) -> {
            query.distinct(true);
            return where(name).toPredicate(root, query, builder);
        };

        return ok(service.list(result, pageable).map(SpecialtyDto::from));
    }
}
