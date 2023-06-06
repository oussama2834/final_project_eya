package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Cours;

import java.util.List;
import java.util.Optional;

public interface CoursService {
    Cours AjouterCours(Cours cours, Long id);
    Cours ModifierCours(Cours cours);
    void SupprimerCours(Long id);
    List<Cours> Cours_LIST();
    Optional<Cours> findById(Long id);



}
