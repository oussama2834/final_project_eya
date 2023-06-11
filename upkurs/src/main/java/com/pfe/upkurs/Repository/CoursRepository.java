package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Cours;
import com.pfe.upkurs.Entites.SessionCours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoursRepository extends JpaRepository<Cours,Long> {

    @Query("SELECT c FROM Cours c WHERE c.enseignant.id = :id")
    List<Cours> findCoursByEnseignantId(@Param("id") long id);
}
