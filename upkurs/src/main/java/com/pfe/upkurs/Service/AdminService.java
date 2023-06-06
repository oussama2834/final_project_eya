package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Admin AjouterAdmin(Admin admin);
    Admin ModifierAdmin(Admin admin);
    void SupprimerAdmin(Long id);
    List<Admin> ADMIN_LIST();
    Optional<Admin> findById(Long id);

}
