package com.pfe.upkurs.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne

    private Etudiant etudiant;

    @ManyToOne

    private SessionCours cours;



    @ManyToOne
    private SessionCours sessionCours;
    private Integer quantite;
    private Integer total;

    private String etat ;



}
