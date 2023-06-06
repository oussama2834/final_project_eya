package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.SessionCours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SessionCoursRepository extends JpaRepository<SessionCours,Long> {
    List<SessionCours> findByEnseignantId(Long id);
}
