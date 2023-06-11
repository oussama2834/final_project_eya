package com.pfe.upkurs.RestController;
import com.pfe.upkurs.Entites.Reservation;
import com.pfe.upkurs.Entites.ValidateSessionRq;
import com.pfe.upkurs.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/reservation")
public class ReservqtionRestContrller {
    @Autowired
    ReservationService reservationService;

    @RequestMapping(value ="/ajout/{id}",method = RequestMethod.POST)
    public Reservation ajouterReservation(@RequestBody Reservation reservation,@PathVariable Long id ){
        return reservationService.ajouterReservation(reservation,id);
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Reservation modifierReservation(@PathVariable("id")Long id, @RequestBody Reservation reservation){
        Reservation newReservation = reservationService.modifierReservation(reservation);
        return newReservation;
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Reservation> getReservationById(@PathVariable("id") long id){

        Optional<Reservation> reservation = reservationService.getReservationById(id);
        return reservation;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void supprimerReservation(@PathVariable("id") Long id){
        reservationService.supprimerReservation(id);
    }


    @RequestMapping(method = RequestMethod.GET) // select * from admin;
    public List<Reservation> afficherReservation(){
        return reservationService.listeReservation();
    }

    @RequestMapping("get-all-by-id-etudient/{id}")
    public  List<Reservation> listReservationByEtudient(@PathVariable Long id){
        return reservationService.listeSessionCoursByEtudient(id);
    }
    @RequestMapping("get-all-by-id-enseignant/{id}")
    public  List<Reservation> listReservationByEnseignant(@PathVariable Long id){
        return reservationService.listeSessionCoursByEnseignat(id);
    }

    @PutMapping("validate-reservation")
    public ResponseEntity<?> listReservationByEnseignant(@RequestBody ValidateSessionRq validateSessionRq){
        return reservationService.validateSession(validateSessionRq);
    }

    @PutMapping("/annuler/{id}")
    public ResponseEntity<?> annulerReservatioin(@PathVariable("id") Long id){
        return reservationService.annulerReservation(id);
    }
    @PutMapping("/valider/{id}")
    public ResponseEntity<?> validerReservation(@PathVariable("id") Long id){
        return reservationService.validerReservation(id);
    }
}

