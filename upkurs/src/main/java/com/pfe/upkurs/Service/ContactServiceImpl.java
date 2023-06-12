package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Contact;
import com.pfe.upkurs.Entites.Enseignant;
import com.pfe.upkurs.Entites.Etudiant;
import com.pfe.upkurs.Repository.ContactRepository;
import com.pfe.upkurs.Repository.EnseignantRepository;
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
    @Autowired
    EnseignantRepository enseignantRepository;

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
    public Contact AjouterContactEnseignant(Contact contact,Long idEnseignant) {
        Optional<Enseignant> enseignantoptional = enseignantRepository.findById(idEnseignant);
        if (enseignantoptional.isPresent()){
          Enseignant enseignant = enseignantoptional.get();
             contact.setEnseignant(enseignant);
             return contactRepository.save(contact);
        }
        return null;
    }

    @Override
    public Contact AjouterContactEtudiant(Contact contact, Long idEtudiant) {
        Optional<Etudiant> etudiantoptional = etudiantRepository.findById(idEtudiant);
        if (etudiantoptional.isPresent()){
            Etudiant etudiant= etudiantoptional.get();
            contact.setEtudiant(etudiant);
            return contactRepository.save(contact);
        }
        return null;
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
