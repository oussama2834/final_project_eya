package com.pfe.upkurs.RestController;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Contact;
import com.pfe.upkurs.Repository.ContactRepository;
import com.pfe.upkurs.Service.AdminService;
import com.pfe.upkurs.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/contact")


public class ContactRestController {
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    ContactService contactService;

    @PostMapping()
    public Contact AjouterContact(@RequestBody Contact contact) {
        return contactService.AjouterContact(contact);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Contact ModifierContact(@PathVariable("id") Long id, @RequestBody Contact contact) {

        Contact newContact = contactService.ModifierContact(contact);
        return new Contact();

    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Contact> affichercontact() {

        return contactService.CONTACT_LIST();
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Contact> getContactbyId(@PathVariable("id") Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return contact;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppAdmin(@PathVariable("id") long id){
        contactService.SupprimerContact(id);

    }


}


