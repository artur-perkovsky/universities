package com.university.task.university.controller;

import com.university.task.university.controller.dto.CountryDto;
import com.university.task.university.controller.search.CountrySearch;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.CountryEntity;
import com.university.task.university.service.CountryService;
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
        validate(dto);
        final CountryEntity country = conversionService.convert(dto, CountryEntity.class);
        return ok(CountryDto.from(service.save(country)));
    }

    private void validate(CountryDto dto) {
        if (dto.getName() == null) {
            throw new UniversityBadRequestException();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final CountryEntity country = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(country);
        return ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<Page<CountryDto>> list(@Valid CountrySearch search, @PageableDefault(sort = {"name"}) Pageable pageable) {

        final Specification<CountryEntity> name = (root, query, builder) ->
                ofNullable(search.getName())
                        .map(value -> builder.lessThan(root.get("name"), search.getName()))
                        .orElse(null);

        final Specification<CountryEntity> result = (root, query, builder) -> {
            query.distinct(true);
            return where(name).toPredicate(root, query, builder);
        };

        return ok(service.list(result, pageable).map(CountryDto::from));
    }
}
