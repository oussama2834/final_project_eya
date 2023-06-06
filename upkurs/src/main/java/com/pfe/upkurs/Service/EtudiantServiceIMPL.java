package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantServiceIMPL implements EtudiantService{
    @Autowired
    EtudiantRepository etudiantRepository;


    @Override
    public Etudiant AjouterEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    @Override
    public Etudiant ModifierEtudiants(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }


    @Override
    public void SupprimerEtudiants(Long id) {
        etudiantRepository.deleteById(id);


    }

    @Override
    public List<Etudiant> ETUDIANTS_LIST() {
        return etudiantRepository.findAll();
    }

    @Override
    public Optional<Etudiant> findById(Long id) {
        return etudiantRepository.findById(id);


    }
}
