package com.pfe.upkurs.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Enseignant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private  String prenom;
    private String email;
    private String adresse;
    private  String telephone;
    private String mdp;
    @Lob
    private String cv;
    private boolean etat ;
    @OneToMany
    private List<Cours> cours;
}


