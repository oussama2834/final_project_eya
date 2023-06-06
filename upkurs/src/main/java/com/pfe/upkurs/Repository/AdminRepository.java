package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findAdminByEmail(String email);
    Boolean existsAdminByEmail(String email);

}
