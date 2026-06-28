package com.backend.backend.Services;

import com.backend.backend.Models.User;
import com.backend.backend.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    UsersRepo  usersRepo;

    public User registerUsers(User userData) {
        boolean existingEmail = usersRepo.existsByEmail(userData.getEmail());

        if (existingEmail) {
            throw new RuntimeException("Users already exists");
        }else  {
            userData.setRole("user");
            userData.setVerified(false);
           return usersRepo.save(userData);
        }
    }

    public User loginUser(User userData) {
        User existedUser = usersRepo.findByEmail(userData.getEmail());
        if(existedUser == null){
            throw new RuntimeException("User not found");
        }
        if(!existedUser.getPassword().equals(userData.getPassword())){
            throw new RuntimeException("Passwords don't match");
        }
        if(!existedUser.isVerified()){
            throw new RuntimeException("User not verified");
        }
        return existedUser;
        }

    public User getUserById(Long id) {
        return usersRepo.findById(id).orElse(null);
    }

    public List<User> fetchUserData() {
        return usersRepo.findAll();
    }

    public String fetchUserName(Long id) {
        User user = usersRepo.findById(id).orElse(null);
        return user.getUsername();
    }

    public boolean acceptReq(Long id) {
        User user = usersRepo.findById(id).orElse(null);
        if(user == null){
            throw new RuntimeException("User not found");
        }
        user.setVerified(true);
        usersRepo.save(user);
        return true;
    }

    public boolean rejectReq(Long id) {
        User user = usersRepo.findById(id).orElse(null);
        if(user == null){
            throw new RuntimeException("User not found");
        }
        user.setVerified(false);
        usersRepo.save(user);
        return true;
    }

    public User getUserInfo(String email) {
        User user = usersRepo.findByEmail(email);
        return user;
    }
}
