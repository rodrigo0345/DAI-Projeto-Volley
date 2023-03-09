package com.example.application.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.application.repository.UserRepository;
import com.example.application.model.SecurityUser;

@Service
public class JpaUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        return userRepository.findByUsername(username).map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found, " + username));
    }
}
