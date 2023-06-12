package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Enseignant;

import java.util.List;
import java.util.Optional;

public interface EnseignantService {
    Enseignant AjouterEnseignant(Enseignant enseignant);
    Enseignant ModifierEnseignant(Enseignant enseignant,Long id);

    void SupprimerEnseignant(Long id);
    List<Enseignant> ENSEIGNANT_LIST();
    Optional<Enseignant> findById(Long id);
    boolean ExistsByTelephone(String telephone);


}
