
import { Cour } from "./Cour.model";
import { DomaineEtude } from "./DomaineEtude.model";
import { Enseignant } from "./Enseignant.model";
export class SessionCours {
    public id?: number;
    public nom?: string;
    public prixbillet?: number;
    public affiche?: string;
    public date?: Date;
    public horaireDebut?: string;
    public horaireFin?: string;
    public enseignant?: Enseignant;
  public domaineEtude?: DomaineEtude;
  public cours?: Cour;
  public nombre?: number;
  public nbr_places?:number;
  public seance_rejoint?:boolean;

    constructor() {}
}
