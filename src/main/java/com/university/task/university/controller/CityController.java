package com.university.task.university.controller;

import com.university.task.university.controller.dto.CityDto;
import com.university.task.university.controller.search.CitySearch;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.CityEntity;
import com.university.task.university.service.CityService;
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
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;
import static org.springframework.data.jpa.domain.Specification.where;
import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping(value = "/api/city")
public class CityController {

    @Autowired
    private CityService service;

    @Autowired
    private ConversionService conversionService;

    @GetMapping("/all")
    public ResponseEntity<List<CityDto>> all() {
        return ok(service.all().stream().map(CityDto::from).collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CityDto> index(@PathVariable Long id) {
        return service.byId(id).map(cityEntity -> ok(CityDto.from(cityEntity))).orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<CityDto> save(@RequestBody CityDto dto) {
        final CityEntity city = conversionService.convert(dto, CityEntity.class);
        return ok(CityDto.from(service.save(city)));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final CityEntity city = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        service.delete(city);
        return ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<Page<CityDto>> list(@Valid CitySearch search, @PageableDefault(sort = {"name"}, size = 20) Pageable pageable) {

        final Specification<CityEntity> name = (root, query, builder) ->
                ofNullable(search.getName())
                        .map(value -> builder.lessThan(root.get("name"), search.getName()))
                        .orElse(null);

        final Specification<CityEntity> country = (root, query, builder) ->
                ofNullable(search.getCountry())
                        .map(value -> builder.equal(root.join("countryEntity", JoinType.INNER).get("id"), search.getCountry()))
                        .orElse(null);

        final Specification<CityEntity> result = (root, query, builder) -> {
            query.distinct(true);
            return where(name.and(country)).toPredicate(root, query, builder);
        };

        return ok(service.list(result, pageable).map(CityDto::from));
    }
}
