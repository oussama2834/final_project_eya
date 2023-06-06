package com.pfe.upkurs.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionCours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private Float prixbillet;
    private String affiche;
    private Date date;
    private String horaireDebut;
    private String horaireFin;

    @ManyToOne
     private Cours cours;
    @ManyToOne
    private Enseignant enseignant;
}

