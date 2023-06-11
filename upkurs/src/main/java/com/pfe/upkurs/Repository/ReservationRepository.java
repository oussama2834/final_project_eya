package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Reservation;
import com.pfe.upkurs.Entites.SessionCours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
//    List<Reservation> findByEtudiantId(Long Id);
//    List<Reservation> findByEnseignantId(Long Id);
@Query("SELECT r FROM Reservation r WHERE r.etudiant.id = :id")
List<Reservation> findReservationByEtudiantId(@Param("id") long id);

}
