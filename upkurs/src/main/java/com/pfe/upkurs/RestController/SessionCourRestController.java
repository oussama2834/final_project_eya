package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.SessionCours;
import com.pfe.upkurs.Service.SessionCourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/sessionCour")
public class SessionCourRestController {

    @Autowired
    SessionCourService sessionCoursService;

    @RequestMapping("/{idEns}")
    public SessionCours ajouterSessionCours(@RequestBody SessionCours sessionCours,
                                            @PathVariable Long idEns){

        return sessionCoursService.ajouterSessionCours(sessionCours, idEns);
    }

    @RequestMapping(method = RequestMethod.POST)
    public SessionCours ajouterSessionCours(@RequestBody SessionCours sessionCours){
        return sessionCoursService.ajouterSessionCours(sessionCours);
    }

    @PutMapping("/mise-a-jour")
    public SessionCours miseAjourSessionCours(@RequestBody SessionCours sessionCours){

        return sessionCoursService.miseAjourSessionCours(sessionCours);
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public SessionCours modifierSessionCours(@PathVariable("id")Long id, @RequestBody SessionCours sessionCours){
        SessionCours newSessionCours = sessionCoursService.modifierSessionCours(sessionCours);
        return newSessionCours;
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<SessionCours> getSessionCoursById(@PathVariable("id") long id){

        Optional<SessionCours> sessionCours = sessionCoursService.getSessionCoursById(id);
        return sessionCours;
    }
    @RequestMapping(method = RequestMethod.PUT)
    public SessionCours modifierSessionCours(@RequestBody SessionCours sessionCours){
        return sessionCoursService.modifierSessionCours(sessionCours);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void supprimerSessionCours(@PathVariable("id") Long id){
        sessionCoursService.supprimerSessionCours(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<SessionCours> afficherSessionCours(){
        return sessionCoursService.listeSessionCours();
    }

    @GetMapping("get-by-id-ens/{id}")
    public List<SessionCours> afficherSessionCoursByEns(@PathVariable Long id){
        return sessionCoursService.listeSessionCoursByEns(id);
    }

}
