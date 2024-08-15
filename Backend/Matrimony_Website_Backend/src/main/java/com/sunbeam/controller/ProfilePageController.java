package com.sunbeam.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.entities.User_Details;
import com.sunbeam.service.UserDetailsService;
import com.sunbeam.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfilePageController {
	@Autowired
	UserDetailsServiceImpl userDao;
	
	@GetMapping("/{id}")
	public User_Details getUserById(@PathVariable Long id) {
		System.out.println(id);
        Optional<User_Details> user = userDao.getUserDetailsById(id); 
        System.out.println(user);
        return user.get();
    }
}
