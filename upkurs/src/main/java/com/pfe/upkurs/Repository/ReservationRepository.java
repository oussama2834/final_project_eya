package com.pfe.upkurs.Repository;

import com.pfe.upkurs.Entites.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
//    List<Reservation> findByEtudiantId(Long Id);
//    List<Reservation> findByEnseignantId(Long Id);

}
