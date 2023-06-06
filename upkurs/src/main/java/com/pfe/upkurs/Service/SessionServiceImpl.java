package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Entites.SessionCours;
import com.pfe.upkurs.Repository.SessionCoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class SessionServiceImpl implements SessionCourService{

    @Autowired
    SessionCoursRepository sessionCoursRepository;
    @Autowired
    EnseignantService enseignantService;
    @Override
    public SessionCours ajouterSessionCours(SessionCours sessionCours,Long idEns) {
        Optional<Enseignant> ens = enseignantService.findById(idEns);
        if(ens.isPresent())
        {
            sessionCours.setEnseignant(ens.get());
            return sessionCoursRepository.save(sessionCours);
        }
        else
            return null;
    }

    @Override
    public SessionCours ajouterSessionCours(SessionCours sessionCours) {
        return sessionCoursRepository.save(sessionCours);
    }

    @Transactional
    @Override
    public SessionCours miseAjourSessionCours(SessionCours sessionCours) {

        Optional<SessionCours>sessionCoursOptional =sessionCoursRepository.findById(sessionCours.getId());
        if(sessionCoursOptional.isPresent())
        {
            sessionCoursOptional.get().setNom(sessionCours.getNom());
            sessionCoursOptional.get().setHoraireDebut(sessionCours.getHoraireDebut());
            sessionCoursOptional.get().setHoraireFin(sessionCours.getHoraireFin());
            sessionCoursOptional.get().setPrixbillet(sessionCours.getPrixbillet());
            sessionCoursOptional.get().setCours(sessionCours.getCours());
          return   sessionCoursRepository.save(sessionCoursOptional.get());
        }
        return null;
    }

    @Override
    public SessionCours modifierSessionCours(SessionCours sessionCours) {
        return sessionCoursRepository.save(sessionCours);
    }

    @Override
    public void supprimerSessionCours(Long id) {
        sessionCoursRepository.deleteById(id);
    }

    @Override
    public List<SessionCours> listeSessionCours() {
        return sessionCoursRepository.findAll();
    }

    @Override
    public Optional<SessionCours> getSessionCoursById(Long id) {
        return sessionCoursRepository.findById(id);
    }

    @Override
    public List<SessionCours> listeSessionCoursByEns(Long id) {
        return sessionCoursRepository.findByEnseignantId(id);
    }


}
