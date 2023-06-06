package com.pfe.upkurs.Service;


import com.pfe.upkurs.Entites.Etudiant;

import java.util.List;
import java.util.Optional;

public interface EtudiantService {
    Etudiant AjouterEtudiant(Etudiant etudiant);
    Etudiant ModifierEtudiants(Etudiant etudiant);
    void SupprimerEtudiants(Long id);
    List<Etudiant> ETUDIANTS_LIST();

    Optional<Etudiant> findById(Long id);

}
