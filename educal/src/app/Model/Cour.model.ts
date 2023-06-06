import { Enseignant } from "./Enseignant.model";

export class Cour {
    constructor (
        public id?: number,
        public img?: any,
        public nom?: string,
        public Cour?: any,
        public description?: string,
        public prix?: string,
        public enseignant? : Enseignant
    )
    {}
}
