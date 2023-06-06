export class Enseignant {
    constructor(
        public id?:number,
        public nom?:string,
        public prenom?:string,
        public email?:string,
        public adresse?:string,
        public telephone?:string,
        public mdp ?:string,
        public cv?:string,
        public etat:boolean=false



    ){}
}