package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Repository.AdminRepository;
import com.pfe.upkurs.Service.AdminService;
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
@RequestMapping(value = "/admin")

public class AdminRestController {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AdminService adminService;



    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    public AdminRestController(AdminRepository adminrepository)
    {this.adminRepository= adminrepository;}


    @GetMapping("/existbyemail")
    public Boolean existByEmail(String email){
       return adminRepository.existsAdminByEmail(email);

    }

    @RequestMapping(method = RequestMethod.POST)
    public Admin AjouterAdmin (@RequestBody Admin admin)

    {

        admin.setMdp(this.bCryptPasswordEncoder.encode(admin.getMdp()));
        Admin saveduser = adminRepository.save(admin);



        return adminService.AjouterAdmin(admin);}
    @RequestMapping(value = "/{id}",method =RequestMethod.PUT)
    public Admin ModifierAdmin(@PathVariable("id")Long id,@RequestBody Admin admin)
    {admin.setMdp(this.bCryptPasswordEncoder.encode(admin.getMdp()));
        Admin saveduser = adminRepository.save(admin);

        Admin newAdmin=adminService.ModifierAdmin(admin);
         return newAdmin;}


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Admin admin) {
        System.out.println("in login-admin"+admin);
        HashMap<String, Object> response = new HashMap<>();

        Admin userFromDB = adminRepository.findAdminByEmail(admin.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(admin.getMdp(), userFromDB.getMdp());
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
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppAdmin(@PathVariable("id") long id){
        adminService.SupprimerAdmin(id);

    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Admin>afficheradmin(){return adminService.ADMIN_LIST();}




    @RequestMapping(value ="/{id}",method = RequestMethod.GET)
    public Optional<Admin>getAdminById(@PathVariable("id")Long id){
        Optional<Admin> admin=adminRepository.findById(id);
        return admin ;
    }


}
