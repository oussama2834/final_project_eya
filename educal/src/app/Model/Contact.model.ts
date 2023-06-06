import { Etudiant } from "./etudiant.model";

export class Contact {
    constructor(
        public id?:number,
        public nom?:string,
        public email?:string,

        public sujet?:string,
        public message?:string,
        public etudiant?:Etudiant



    ){}
}
