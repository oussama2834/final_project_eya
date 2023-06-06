package com.pfe.upkurs.Service;

import com.pfe.upkurs.Entites.Admin;
import com.pfe.upkurs.Entites.Contact;
import jdk.dynalink.Operation;

import java.util.List;
import java.util.Optional;

public interface ContactService {
    Contact AjouterContact(Contact contact);
    Contact ModifierContact(Contact contact);
    void SupprimerContact(Long id);
    List<Contact> CONTACT_LIST();
    Optional<Contact> findById(Long id);

}
