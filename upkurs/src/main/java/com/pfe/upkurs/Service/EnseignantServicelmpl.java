package com.pfe.upkurs.Service;


import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Repository.AdminRepository;
import com.pfe.upkurs.Repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnseignantServicelmpl implements EnseignantService {

    @Autowired
    EnseignantRepository enseignantRepository;


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
        enseignantRepository.deleteById(id);

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
