package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Reservation;
import com.pfe.upkurs.Entites.ValidateSessionRq;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ReservationService {
    Reservation ajouterReservation(Reservation reservation );

    Reservation modifierReservation(Reservation reservation);

    void supprimerReservation(Long id);

    ResponseEntity<?> annulerReservation(Long id);
    ResponseEntity<?> validerReservation(Long id);

    List<Reservation> listeReservation();


    Optional<Reservation> getReservationById(Long id);

    List<Reservation> listeSessionCoursByEtudient(Long id);

    List<Reservation> listeSessionCoursByEnseignat(Long id);

    ResponseEntity<?> validateSession(ValidateSessionRq validateSessionRq);
}
