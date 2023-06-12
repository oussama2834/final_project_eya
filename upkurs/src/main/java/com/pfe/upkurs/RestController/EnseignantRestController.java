package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Repository.EnseignantRepository;
import com.pfe.upkurs.Service.EmailService;
import com.pfe.upkurs.Service.EnseignantService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/enseignant")

public class EnseignantRestController {
    @Autowired
    EnseignantService enseignantService;

    @Autowired
    EnseignantRepository enseignantRepository;
    @Autowired
    EmailService emailService;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    public EnseignantRestController(EnseignantRepository enseignantRepository)
    {this.enseignantRepository= enseignantRepository;}


    @GetMapping("/existbyemail/{email}")
    public Boolean existByEmail(@PathVariable String email){
        return enseignantRepository.existsByEmail(email);

    }
    @GetMapping("/existbytelephone/{telephone}")
    public boolean existByTelephone(@PathVariable String telephone){
        return enseignantRepository.existsByTelephone(telephone);

    }
    @GetMapping("/{id}")
    public Enseignant getEnseignant(@PathVariable  Long id){

        return enseignantRepository.findById(id).get();
    }
    @RequestMapping(method = RequestMethod.POST)
    public Enseignant AjouterEnseignat(@RequestBody Enseignant enseignant)
    {
       enseignant.setMdp(this.bCryptPasswordEncoder.encode(enseignant.getMdp()));
        Enseignant saveduser = enseignantRepository.save(enseignant);
        return enseignantService.AjouterEnseignant(enseignant);}
    @RequestMapping(value = "/{id}",method =RequestMethod.PUT)
    public Enseignant ModifierEnseignant(@PathVariable("id")Long id,@RequestBody Enseignant enseignant)
    {
       Optional<Enseignant> optionalenseignant = enseignantRepository.findById(id);
        if (optionalenseignant.isPresent()){
        Enseignant enseignant1=optionalenseignant.get();

            enseignant1.setNom(enseignant.getNom());
            enseignant1.setEmail(enseignant.getEmail());
            enseignant1.setAdresse(enseignant.getAdresse());
            enseignant1.setTelephone(enseignant.getTelephone());

            enseignant.setMdp(this.bCryptPasswordEncoder.encode(enseignant1.getMdp()));
//        if( enseignant.isEtat() != enseignant1.isEtat()){
//            //ternary expression
//            String etat = enseignant1.isEtat()? "blouqué" : "Accepté";
//            emailService.sendSimpleMessage(enseignant1.getEmail(),"L'etat de votre compte","votre compte a été " +etat);
//        }
//            enseignant1.setEtat(enseignant.isEtat());
        return enseignantRepository.save(enseignant1);
    }
        return null;
    }
    @RequestMapping(method = RequestMethod.GET)
    public List<Enseignant> afficherenseignant(){return enseignantService.ENSEIGNANT_LIST();}

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppAdmin(@PathVariable("id") long id){
        enseignantService.SupprimerEnseignant(id);

    }
    @PostMapping("/loginl")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Enseignant enseignant) {
        System.out.println("in login-admin"+enseignant);
        HashMap<String, Object> response = new HashMap<>();

        Enseignant userFromDB = enseignantRepository.findEnseignantByEmail(enseignant.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(enseignant.getMdp(), userFromDB.getMdp());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "admin not found !");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }

    }

    @PostMapping(path = "registerenseignant")
    public ResponseEntity<?> addenseignant(@RequestBody Enseignant enseignant) {
        if(enseignantRepository.existsByEmail(enseignant.getEmail() )||enseignantRepository.existsByTelephone(enseignant.getTelephone())) {
            return new ResponseEntity<Void>(HttpStatus.FOUND);
        }else
        {
            enseignant.setMdp(this.bCryptPasswordEncoder.encode(enseignant.getMdp()));
            Enseignant savedUser = enseignantRepository.save(enseignant);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }


    }
}
