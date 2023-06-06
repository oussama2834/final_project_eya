package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant,Long> {
Enseignant findEnseignantByEmail(String email);
boolean existsByEmail(String email);

boolean existsByTelephone(String telephone);
}
