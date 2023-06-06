package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Repository.EtudiantRepository;
import com.pfe.upkurs.Repository.EtudiantRepository;
import com.pfe.upkurs.Service.EtudiantService;
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
@RequestMapping(value = "/etudiant")

public class EtudiantRestController {
    @Autowired
    EtudiantRepository etudiantRepository;

    @Autowired
    EtudiantService etudianttService;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public EtudiantRestController(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @GetMapping("/existbyemail/{email}")
    public Boolean existByEmail(@PathVariable String email){
        return etudiantRepository.existsByEmail(email);

    }

    @GetMapping("/existbycin/{cin}")
    public Boolean existBycin(@PathVariable Long cin){
        return etudiantRepository.existsByCin(cin);

    }



    @RequestMapping(method = RequestMethod.POST)
    public Etudiant AjouterEtudiant(@RequestBody Etudiant etudiant) {
        return etudianttService.AjouterEtudiant(etudiant);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Etudiant ModifierEtudiants(@PathVariable("id") Long id, @RequestBody Etudiant etudiant) {
        etudiant.setMdp(this.bCryptPasswordEncoder.encode(etudiant.getMdp()));
        Etudiant saveduser = etudiantRepository.save(etudiant);
        Etudiant newEtudiant = etudianttService.ModifierEtudiants(etudiant);
        return newEtudiant;
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Etudiant> afficheretudiants() {
        return etudianttService.ETUDIANTS_LIST();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Etudiant> getEtudiantsbyId(@PathVariable("id") Long id) {
        Optional<Etudiant> etudiants = etudiantRepository.findById(id);
        return etudiants ;
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppAdmin(@PathVariable("id") long id){
        etudianttService.SupprimerEtudiants(id);

    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Etudiant etudiant) {
        System.out.println("in login-admin"+etudiant);
        HashMap<String, Object> response = new HashMap<>();

        Etudiant userFromDB = etudiantRepository.findEtudiantByEmail(etudiant.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(etudiant.getMdp(), userFromDB.getMdp());
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
    @PostMapping(path ="registeretudiant")
    public ResponseEntity<?> addetudiant(@RequestBody Etudiant etudiant) {
        if(etudiantRepository.existsByEmail(etudiant.getEmail())
                ||etudiantRepository.existsByCin(etudiant.getCin())) {
            return new ResponseEntity<Void>(HttpStatus.FOUND);
        }else
        {
            etudiant.setMdp(this.bCryptPasswordEncoder.encode(etudiant.getMdp()));
            Etudiant savedUser = etudiantRepository.save(etudiant);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }


    }

}