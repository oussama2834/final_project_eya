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
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(columnDefinition ="LONGTEXT")
    private String img;
    private  String nom;
    private String description;
    private String prix;
    @ManyToOne
    private Enseignant enseignant;

}
