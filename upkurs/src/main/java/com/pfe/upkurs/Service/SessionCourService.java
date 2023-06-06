package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.SessionCours;

import java.util.List;
import java.util.Optional;

public interface SessionCourService {
    SessionCours ajouterSessionCours(SessionCours sessionCours,Long idEns);
    SessionCours ajouterSessionCours(SessionCours sessionCours);
    SessionCours miseAjourSessionCours(SessionCours sessionCours);
    SessionCours modifierSessionCours(SessionCours sessionCours);
    void supprimerSessionCours(Long id);
    List<SessionCours> listeSessionCours();

    Optional<SessionCours> getSessionCoursById(Long id);

    List<SessionCours> listeSessionCoursByEns(Long id);
}
