package com.university.task.university.controller;

import com.university.task.university.controller.dto.RatingDto;
import com.university.task.university.controller.search.RatingSearch;
import com.university.task.university.exceptions.UniversityBadRequestException;
import com.university.task.university.model.RatingEntity;
import com.university.task.university.service.RatingService;
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
@RequestMapping(value = "/api/rating")
public class RatingController {

    @Autowired
    private RatingService service;

    @Autowired
    private ConversionService conversionService;

    @GetMapping("/all")
    public ResponseEntity<List<RatingDto>> all() {
        return ok(service.all().stream().map(RatingDto::from).collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RatingDto> index(@PathVariable Long id) {
        return service.byId(id).map(ratingEntity -> ok(RatingDto.from(ratingEntity)))
                .orElseThrow(UniversityBadRequestException::new);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RatingDto> save(@RequestBody RatingDto dto) {
        final RatingEntity rating = conversionService.convert(dto, RatingEntity.class);
        return ok(RatingDto.from(service.save(rating)));

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        final RatingEntity rating = service.byId(id).orElseThrow(UniversityBadRequestException::new);
        return ok(rating);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<RatingDto>> list(@Valid RatingSearch search, @PageableDefault(sort = {"name"}, size = 20) Pageable pageable) {

        final Specification<RatingEntity> name = (root, query, builder) ->
                ofNullable(search.getName())
                        .map(value -> builder.lessThan(root.get("name"), search.getName()))
                        .orElse(null);

        final Specification<RatingEntity> position = (root, query, builder) ->
                ofNullable(search.getPosition())
                        .map(value -> builder.lessThan(root.get("position"), search.getPosition()))
                        .orElse(null);

        final Specification<RatingEntity> country = (root, query, builder) ->
                ofNullable(search.getCountry())
                        .map(value -> builder.equal(root.join("country", JoinType.INNER).get("id"), search.getCountry()))
                        .orElse(null);

        final Specification<RatingEntity> result = (root, query, builder) -> {
            query.distinct(true);
            return where(name.and(position).and(country)).toPredicate(root, query, builder);
        };

        return ok(service.list(result, pageable).map(RatingDto::from));
    }
}
