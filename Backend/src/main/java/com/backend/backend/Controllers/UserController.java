package com.backend.backend.Controllers;

import com.backend.backend.Models.User;
import com.backend.backend.Services.UserServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)public class UserController {

    @Autowired
    UserServices userServices;

    @GetMapping("/userData")
    public List<User> fetchUserData(){
        return userServices.fetchUserData();
    }

    @GetMapping("/userName/{id}")
    public String fetchUserData(@PathVariable Long id){
        return userServices.fetchUserName(id);
    }

    @PutMapping("/acceptReq/{id}")
    public boolean acceptReq(@PathVariable Long id){
        return userServices.acceptReq(id);
    }
    @PutMapping("/rejectReq/{id}")
    public boolean rejectReq(@PathVariable Long id){
        return userServices.rejectReq(id);
    }

    @GetMapping("/getUserInfo/{email}")
    public User getUserInfo(@PathVariable String email) {
        return userServices.getUserInfo(email);
    }
}
