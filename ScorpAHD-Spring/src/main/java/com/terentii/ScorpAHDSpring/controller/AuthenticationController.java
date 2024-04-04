package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.AuthenticationResponse;
import com.terentii.ScorpAHDSpring.model.user.User;
import com.terentii.ScorpAHDSpring.repository.UserRepository;
import com.terentii.ScorpAHDSpring.service.AuthenticationService;
import com.terentii.ScorpAHDSpring.service.UserDetailsServiceImp;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserRepository userRepository;
    private final UserDetailsServiceImp userDetailsServiceImp;

    public AuthenticationController(AuthenticationService authService, UserRepository userRepository, UserDetailsServiceImp userDetailsServiceImp) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.userDetailsServiceImp = userDetailsServiceImp;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public void login(
            @RequestBody User request,
            HttpServletResponse response
    ) throws IOException {
        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(request.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = authService.authenticate(request);

        if (optionalUser.isPresent()) {
                response.getWriter().write(new JSONObject()
                        .put("role", optionalUser.get().getRole())
                        .put("userId", optionalUser.get().getId())
                                .toString());
            }

            response.setHeader("Access-Control-Expose-Headers", "Authorization");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, X-Pingother, Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
            response.setHeader("Authorization", authenticationResponse.getToken());
    }
}



