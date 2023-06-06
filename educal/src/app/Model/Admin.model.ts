/* bibliothèque open source de programmation par acteurs pour TypeScript et JavaScript. 
Elle est basée sur le modèle d'acteur*/ 
export class Admin { //une classe TypeScript qui définit une structure de données 
    constructor (
        //les propriétés de la classe njibhom mel springboot mnadhmin
        //(public), ce qui signifie qu'elles sont accessibles depuis l'extérieur de la classe
        // Les propriétés sont définies comme étant facultatives (?), ce qui signifie qu'elles peuvent être undefined ou null.
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public photo?: any,
        public email?: string,
        public mp?: string,
        public etat?: boolean //indique si le compte de l'administrateur est actif ou non
    )
    {}
}