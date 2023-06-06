package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {
    Etudiant findEtudiantByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCin(Long cin);

}
