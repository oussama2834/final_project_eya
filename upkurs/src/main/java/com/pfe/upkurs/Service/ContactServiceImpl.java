package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Contact;
import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Repository.ContactRepository;
import com.pfe.upkurs.Repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ContactServiceImpl implements ContactService{
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    EtudiantRepository etudiantRepository;

    @Override
    public Contact AjouterContact(Contact contact) {
        return contactRepository.save(contact);
//        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
//        if (etudiant.isPresent()){
//            contact.setEtudiant(etudiant.get());
//
//        }
//        return null;


    }

    @Override
    public Contact ModifierContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void SupprimerContact(Long id) {
        contactRepository.deleteById(id);

    }

    @Override
    public List<Contact> CONTACT_LIST() {
        return contactRepository.findAll();
    }

    @Override
    public Optional<Contact> findById(Long id) {
        return contactRepository.findById(id);
    }
}
