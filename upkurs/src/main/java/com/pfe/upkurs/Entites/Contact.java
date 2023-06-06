package com.pfe.upkurs.Entites;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;
@Entity
@Data

public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    private String email;

    private  String sujet;
    private String message;
    @ManyToOne
    Etudiant etudiant;
}
