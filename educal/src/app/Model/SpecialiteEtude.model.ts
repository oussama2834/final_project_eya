import { DomaineEtude } from "./DomaineEtude.model"; //kif rbatt domaine bel specialité
/* bibliothèque open source de programmation par acteurs pour TypeScript et JavaScript. 
Elle est basée sur le modèle d'acteur*/
export class SpecialiteEtude {
    constructor (

        //les propriétés de la classe njibhom mel springboot mnadhmin
        //(public), ce qui signifie qu'elles sont accessibles depuis l'extérieur de la classe
        // Les propriétés sont définies comme étant facultatives (?), ce qui signifie qu'elles peuvent être undefined ou null.
        public id?: number,
        public titre?: string,
        public description?: string,
        public domaineEtude? : DomaineEtude
    )
    {}
}