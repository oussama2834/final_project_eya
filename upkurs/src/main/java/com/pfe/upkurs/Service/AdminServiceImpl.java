package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AdminServiceImpl implements AdminService{
    @Autowired
    AdminRepository adminRepository;
    @Override
    public Admin AjouterAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin ModifierAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public void SupprimerAdmin(Long id) {
        adminRepository.deleteById(id);

    }

    @Override
    public List<Admin> ADMIN_LIST() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }
}
