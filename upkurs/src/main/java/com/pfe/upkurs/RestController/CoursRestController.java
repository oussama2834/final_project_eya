package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Cours;
import com.pfe.upkurs.Repository.CoursRepository;
import com.pfe.upkurs.Service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/cours")

public class CoursRestController {
    @Autowired
    CoursRepository coursRepository;
    @Autowired
    CoursService coursService;

    @PostMapping("/{id}")
    public Cours AjouterCours(@RequestBody Cours cours, @PathVariable Long id) {
        return coursService.AjouterCours(cours,id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Cours ModifierCours(@PathVariable("id") Long id, @RequestBody Cours cours) {
        Cours newCours = coursService.ModifierCours(cours);
        return newCours;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Cours>affichercours(){return coursService.Cours_LIST();}
    @RequestMapping(value ="/{id}",method = RequestMethod.GET)
    public Optional<Cours> getAdminById(@PathVariable("id")Long id){
        Optional<Cours> cours=coursRepository.findById(id);
        return cours ;

    }
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppAdmin(@PathVariable("id") long id){
        coursService.SupprimerCours(id);

    }

}