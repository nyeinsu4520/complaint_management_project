package com.cmsproject.complaint_service.dto;

import com.cmsproject.complaint_service.model.AuthorRole;
import com.fasterxml.jackson.annotation.JsonFormat;

public class ReplyRequest {

    private Long authorId;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private AuthorRole authorRole;
    private String message;

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public AuthorRole getAuthorRole() {
        return authorRole;
    }

    public void setAuthorRole(AuthorRole authorRole) {
        this.authorRole = authorRole;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
