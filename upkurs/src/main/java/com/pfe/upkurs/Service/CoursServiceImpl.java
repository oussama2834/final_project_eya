package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Cours;
import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Repository.CoursRepository;
import com.pfe.upkurs.Repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoursServiceImpl implements CoursService{
    @Autowired
    CoursRepository coursRepository;
    @Autowired
    EnseignantRepository enseignantRepository;
    @Override
    public Cours AjouterCours(Cours cours, Long id) {
        Optional<Enseignant> enseignant = enseignantRepository.findById(id);
        if(enseignant.isPresent()){
            cours.setEnseignant(enseignant.get());
            return coursRepository.save(cours);
        }
        return null;
    }

    @Override
    public Cours ModifierCours(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public void SupprimerCours(Long id) {
        coursRepository.deleteById(id);

    }

    @Override
    public List<Cours> Cours_LIST() {
        return coursRepository.findAll();
    }

    @Override
    public Optional<Cours> findById(Long id) {
        return coursRepository.findById(id);

    }
}
