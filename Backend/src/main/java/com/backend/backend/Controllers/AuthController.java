package com.backend.backend.Controllers;

import com.backend.backend.Models.User;
import com.backend.backend.Services.UserServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://https://hostel-complaint-portall.netlify.app"
        },
        allowCredentials = "true"
)public class AuthController {
    @Autowired
    UserServices userServices;

    @PostMapping("/register")
    public User register(@RequestBody User userData) {
      return userServices.registerUsers(userData);
    }

    @PostMapping("/login")
    public User login(@RequestBody User userData, HttpSession session) {
        User user = userServices.loginUser(userData);
        session.setAttribute("userId", user.getId());
        session.setAttribute("role", user.getRole());

        System.out.println("LOGIN SESSION = " + session.getId());
        System.out.println("LOGIN USERID = " + session.getAttribute("userId"));
        return user;
    }

    @GetMapping("/loggedInUser")
    public User loggedIn(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if(userId == null){
            return null;
        }
        return userServices.getUserById(userId);
    }

    @PostMapping("/logout")
    public boolean logout(HttpSession session) {
        session.invalidate();
        return true;
    }
}
