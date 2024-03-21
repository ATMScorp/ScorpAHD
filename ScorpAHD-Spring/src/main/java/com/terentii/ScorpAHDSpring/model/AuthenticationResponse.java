package com.terentii.ScorpAHDSpring.model;

public class AuthenticationResponse {
    private String token;
    private String message;

    public AuthenticationResponse(String token, String message, String role) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }
}

