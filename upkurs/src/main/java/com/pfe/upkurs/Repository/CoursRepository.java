package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursRepository extends JpaRepository<Cours,Long> {
}
