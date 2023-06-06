package com.pfe.upkurs.Service;
import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Entites.Reservation;
import com.pfe.upkurs.Entites.ValidateSessionRq;
import com.pfe.upkurs.Repository.ReservationRepository;
import com.pfe.upkurs.Repository.SessionCoursRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService{
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    SessionCourService sessionCoursService;
    @Autowired
    EtudiantService etudiantService;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public Reservation ajouterReservation(Reservation reservation) {

        reservation.setEtat("En attente");

        return reservationRepository.save(reservation);


    }

    @Override
    public Reservation modifierReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public void supprimerReservation(Long id) {
        reservationRepository.deleteById(id);
    }


    @Override
    public ResponseEntity<?>  annulerReservation(Long id) {
        Optional<Reservation> r = reservationRepository.findById(id);
        if(r.isPresent()){
            Reservation res = r.get();
            res.setEtat("Réfusée");
            return new ResponseEntity(  reservationRepository.save(res) ,HttpStatus.OK);
        }
        return new ResponseEntity("not found" ,HttpStatus.NOT_FOUND);
    }
    private void envoyerMail(Etudiant etudiant, Enseignant enseignant){
//        SimpleMailMessage mail = new SimpleMailMessage();
//        mail.setTo(etudiant.getEmail());
//        mail.setSubject("lien meet");
//        mail.setText("Bonjour " + etudiant.getPrenom()+" "+etudiant.getNom() +
//                ",\n\nvoici ci joint le lien de meet.\n\n <a href ='https://meet.google.com/yir-rjdt-edx'> Lien meet </a> \n\nCordialement,\n ."+enseignant.getPrenom()+" "+enseignant.getNom());
//        mailSender.send(mail);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        try {
            helper.setTo(etudiant.getEmail());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        try {
            helper.setSubject("lien meet");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        String htmlContent = "<html><body>" +
                "<p>Bonjour " + etudiant.getPrenom() + " " + etudiant.getNom() + ",</p>" +
                "<p>Voici ci joint le lien de meet :</p>" +
                "<p><a href='https://meet.google.com/yir-rjdt-edx'>Lien Meet</a></p>" +
                "<p>Cordialement,<br/>" + enseignant.getPrenom() + " " + enseignant.getNom() + "</p>" +
                "</body></html>";

        try {
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }
    @Override
    public ResponseEntity<?>  validerReservation(Long id) {
        Optional<Reservation> r = reservationRepository.findById(id);
        if(r.isPresent()){
            Reservation res = r.get();
            res.setEtat("Validée");
            envoyerMail(r.get().getEtudiant(),r.get().getSessionCours().getEnseignant());
            return new ResponseEntity(  reservationRepository.save(res) ,HttpStatus.OK);
        }
        return new ResponseEntity("not found" ,HttpStatus.NOT_FOUND);
    }


    @Override
    public List<Reservation> listeReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public List<Reservation> listeSessionCoursByEtudient(Long id) {
        return null;
    }

    @Override
    public List<Reservation> listeSessionCoursByEnseignat(Long id) {
        return null;
    }


    @Transactional
    @Override
    public ResponseEntity<?> validateSession(ValidateSessionRq validateSessionRq) {
        Optional<Reservation> optionalReservation=reservationRepository.findById(validateSessionRq.getIdSession());
        if(optionalReservation.isPresent())
        {
            optionalReservation.get().setEtat("Validée");
            return new ResponseEntity<Void>(HttpStatus.OK) ;
        }else
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST) ;
    }


}
