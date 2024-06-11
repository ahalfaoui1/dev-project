
package com.crm.backend.services;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.Buffer;
import java.util.Set;
import java.util.stream.Collectors;


import com.crm.backend.models.Contact;

import com.crm.backend.repository.*;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.*;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public  class ContactServiceImpl implements ContactService {

	private final ContactRepository ContactRepository;
    private final UserRepository userRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository ContactRepository, UserRepository userRepository) {
        this.ContactRepository = ContactRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Contact> getAllContact() {
        return (List<Contact>) ContactRepository.findAll();
    }

    
    @Override
    public Contact getContactById(Long id) {
        Optional<Contact> Contact = ContactRepository.findById(id);
        return ((Optional<Contact>) Contact).orElse(null);
    }

    @Override
    public Contact createContact(Contact Contact) {
        // You may want to set the creation date here
        return ContactRepository.save(Contact);
    }

    @Override
    public Contact updateContact(Long id, Contact Contact) {
        Contact existingContact = getContactById(id);

        if (existingContact != null) {
            // Update the fields you want to allow to be modified
           // existingContact.setFirstname(contact.getFirstname());
           // existingContact.setLastname(contact.getLastname());
            existingContact.setEmail(Contact.getEmail());
            existingContact.setAdress(Contact.getAdress());
            existingContact.setCompanyName(Contact.getCompanyName());
            existingContact.setJobTitle(Contact.getJobTitle());
            existingContact.setSource(Contact.getSource());
            existingContact.setStatus(Contact.getStatus());
            existingContact.setType(Contact.getType());
            existingContact.setTel(Contact.getTel());
            existingContact.setDateUpdated(Contact.getDateUpdated());
            
            return ContactRepository.save(existingContact);
        }

        return null; // or throw an exception if you prefer
    }

    @Override
    public void deleteContact(Long id) {
    	ContactRepository.deleteById(id);
    }
    @Override
    public Page<Contact> getAllContactByPage(Pageable pageable) {
        return ContactRepository.findAll(pageable);
    }
    @Override
    public Page<Contact> getPageContactByCustomFilter(Pageable pageable,String search,String status,String type) {
        return ContactRepository.getPageContactByCustomFilter(pageable, search, status, type);
    }
    
    @Override
    public Page<Contact> getPageContactByCustomFilterbyRole(Pageable pageable,String search,String status,String type,String role) {
        System.out.println("list"+ContactRepository.getPageContactByCustomFilterbyRole(pageable, search, status,type,role));
    	return ContactRepository.getPageContactByCustomFilterbyRole(pageable, search, status,type,role);
        
    }
	@Override
	public Page<Contact> getAllContactByPage(Pageable pageable, String nom) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	  public static boolean isValidExcelFile(MultipartFile file){
	        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" );
	    }
	  
	  
	  public  void saveContactToDatabase(MultipartFile file){
	        if(isValidExcelFile(file)){
	            try {
	                List<Contact> Contact = getContactDataFromExcel(file.getInputStream());
	                ContactRepository.saveAll(Contact);
	            } catch (IOException e) {
	                throw new IllegalArgumentException("The file is not a valid excel file");
	            }
	        }
	    }

	  public List<Contact> getContactDataFromExcel(InputStream inputStream) {
	        List<Contact> Contact = new ArrayList<>();
	        try {
	            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
	            XSSFSheet sheet = workbook.getSheet("contacts");
	            int rowIndex = 0;
	            for (Row row : sheet) {
	                if (rowIndex == 0) {
	                    rowIndex++;
	                    continue;
	                }
	                Iterator<Cell> cellIterator = row.iterator();
	                int cellIndex = 0;
	                Contact contact = new Contact();
	                while (cellIterator.hasNext()) {
	                    Cell cell = cellIterator.next();
	                    switch (cellIndex) {
	                        case 0:
	                            contact.setImageCode(cell.getStringCellValue());
	                            break;
	                        case 1:
	                            contact.setLastName(cell.getStringCellValue());
	                            break;
	                        case 2:
	                            contact.setFirstName(cell.getStringCellValue());
	                            break;
	                        case 3:
	                            contact.setEmail(cell.getStringCellValue());
	                            break;
	                        case 4:
	                            contact.setTel(cell.getStringCellValue());
	                            break;
	                        case 5:
	                            contact.setStatus(cell.getStringCellValue());
	                            break;
	                        case 6:
	                            contact.setCompanyName(cell.getStringCellValue());
	                            break;
	                        case 7:
	                            contact.setJobTitle(cell.getStringCellValue());
	                            break;
	                        case 8:
	                            contact.setLinkedin(cell.getStringCellValue());
	                            break;
	                        case 9:
	                            contact.setType(cell.getStringCellValue());
	                            break;
	                        default:
	                            break;
	                    }
	                    cellIndex++;
	                }
	               
	                contact.setDateCreated(new Date());
	                contact.setDateUpdated(new Date());
	                // Assuming you have a method like findById in UserRepository
	                contact.setContactOwner(userRepository.findById(1L).orElse(null));
	                Contact.add(contact);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return Contact;
	    }

	@Override
	public Integer uploadContact(MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

	
    


}
