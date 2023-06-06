package com.pfe.upkurs.Entites;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ValidateSessionRq {
    private Long idSession;
    private int etat;
}
