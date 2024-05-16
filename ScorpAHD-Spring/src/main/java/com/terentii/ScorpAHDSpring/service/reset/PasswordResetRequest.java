package com.terentii.ScorpAHDSpring.service.reset;

import lombok.Getter;

@Getter
public class PasswordResetRequest {
    private String token;
    private String newPassword;

    public void setToken(String token) {
        this.token = token;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
