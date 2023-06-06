import { Enseignant } from "./Enseignant.model";
import { SessionCours } from "./SessionCour.model";
import { Etudiant } from "./etudiant.model";

export class Reservation {
  id !: number;
  etudiant !: Etudiant
  enseignant !: Enseignant
  sessionCours !: SessionCours
  etat !:string
}
