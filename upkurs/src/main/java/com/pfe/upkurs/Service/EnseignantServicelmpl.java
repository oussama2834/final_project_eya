package com.pfe.upkurs.Service;


import com.pfe.upkurs.Entites.Cours;
import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Entites.SessionCours;
import com.pfe.upkurs.Repository.AdminRepository;
import com.pfe.upkurs.Repository.CoursRepository;
import com.pfe.upkurs.Repository.EnseignantRepository;
import com.pfe.upkurs.Repository.SessionCoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnseignantServicelmpl implements EnseignantService {

    @Autowired
    EnseignantRepository enseignantRepository;
    @Autowired
    CoursRepository coursRepository;
    @Autowired
    SessionCoursRepository sessionCoursRepository;



    @Override
    public Enseignant AjouterEnseignant(Enseignant enseignant) {

        return enseignantRepository.save(enseignant);
    }

    @Override
    public Enseignant ModifierEnseignant(Enseignant enseignant,Long id) {
        return enseignantRepository.save(enseignant);
    }

    @Override
    public void SupprimerEnseignant(Long id) {
        List<Cours> cours = coursRepository.findCoursByEnseignantId(id);
        List<SessionCours> seances = sessionCoursRepository.findSessionCoursByEnseignantId(id);
        if (seances == null  ){
            coursRepository.deleteAll(cours);
            enseignantRepository.deleteById(id);
//            sessionCoursRepository.deleteAll(seances);
        }
        else {
            sessionCoursRepository.deleteAll(seances);
            coursRepository.deleteAll(cours);
            enseignantRepository.deleteById(id);
        }


    }

    @Override
    public List<Enseignant> ENSEIGNANT_LIST() {
        return enseignantRepository.findAll();
    }

    @Override
    public Optional<Enseignant> findById(Long id) {
        return enseignantRepository.findById(id);

    }
}
