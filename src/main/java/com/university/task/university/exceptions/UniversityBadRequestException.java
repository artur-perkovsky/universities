package com.university.task.university.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UniversityBadRequestException extends RuntimeException {

    public UniversityBadRequestException() {
    }

    public UniversityBadRequestException(String message) {
        super(message);
    }

    public UniversityBadRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    public UniversityBadRequestException(Throwable cause) {
        super(cause);
    }

    public UniversityBadRequestException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
