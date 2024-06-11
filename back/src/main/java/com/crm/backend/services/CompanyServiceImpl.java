
package com.crm.backend.services;


import com.crm.backend.models.Contact;
import com.crm.backend.models.Company;
import com.crm.backend.repository.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public  class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository CompanyRepository;
    private final UserRepository userRepository;
    @Autowired
    public CompanyServiceImpl(CompanyRepository CompanyRepository,UserRepository userRepository) {
        this.CompanyRepository = CompanyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Company> getAllCompany() {
        return (List<Company>) CompanyRepository.findAll();
    }

    @Override
    public Company getCompanyById(Long id) {
        Optional<Company> optionalContact = CompanyRepository.findById(id);
        return optionalContact.orElse(null);
    }

    @Override
    public Company createCompany(Company Company) {
        // You may want to set the creation date here
        return CompanyRepository.save(Company);
    }
    @Override
    public Page<Company> getPageCompanyByCustomFilter(Pageable pageable,String search,String activityArea,String type) {
        return CompanyRepository.getPageCompanyByCustomFilter(pageable, search, activityArea, type);
    }
    @Override
    public Page<Company> getPageCompanyByCustomFilterbyRole(Pageable pageable,String search,String activityArea,String type,String role) {
        return CompanyRepository.getPageCompanyByCustomFilterbyrole(pageable, search, activityArea, type,role);
    }

    @Override
    public Company updateCompany(Long id, Company Company) {
        Company existingCompany = getCompanyById(id);

        if (existingCompany != null) {
            // Update the fields you want to allow to be modified
           // existingContact.setFirstname(contact.getFirstname());
           // existingContact.setLastname(contact.getLastname());
            existingCompany.setEmail(Company.getEmail());
            existingCompany.setAdress(Company.getAdress());
            existingCompany.setCity(Company.getCity());
            existingCompany.setCountry(Company.getCountry());
            existingCompany.setDateUpdated(Company.getDateUpdated());
            existingCompany.setDescription(Company.getDescription());
            existingCompany.setEmployeeNb(Company.getEmployeeNb());
            existingCompany.setTel(Company.getTel());
            existingCompany.setTimezone(Company.getTimezone());
            existingCompany.setType(Company.getType());
            existingCompany.setZipcode(Company.getZipcode());

            return CompanyRepository.save(existingCompany);
        }

        return null; // or throw an   if you prefer
    }

    @Override
    public void deleteCompany(Long id) {
    	CompanyRepository.deleteById(id);
    }
    @Override
    public Page<Company> getAllCompanyByPage(Pageable pageable) {
        return CompanyRepository.findAll(pageable);
    }

	@Override
	public Page<Company> findByTypeCompany(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}
	  public static boolean isValidExcelFile(MultipartFile file){
	        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" );
	    }
	  public  void saveCompanyToDatabase(MultipartFile file){
	        if(isValidExcelFile(file)){
	            try {
	                List<Company> Companys = getCompanyDataFromExcel(file.getInputStream());
	                CompanyRepository.saveAll(Companys);
	            } catch (IOException e) {
	                throw new IllegalArgumentException("The file is not a valid excel file");
	            }
	        }
	    }

	  public List<Company> getCompanyDataFromExcel(InputStream inputStream) {
		 
	        List<Company> Companys = new ArrayList<>();
	        try {
	            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
	            XSSFSheet sheet = workbook.getSheet("Companys");
	           
	            int rowIndex = 0;
	            for (Row row : sheet) {
	                if (rowIndex == 0) {
	                    rowIndex++;
	                    continue;
	                }
	                Iterator<Cell> cellIterator = row.iterator();
	                int cellIndex = 0;
	                Company Company = new Company();
	                while (cellIterator.hasNext()) {
	                	  
	                    Cell cell = cellIterator.next();
	                    switch (cellIndex) {
	                        case 0:
	                        	Company.setImageCode(cell.getStringCellValue());
	                            break;
	                           
	                        case 1:

	                        	Company.setName(cell.getStringCellValue());
	                            break;
	                        case 2:
	                        	Company.setEmail(cell.getStringCellValue());
	                            break;
	                        case 3:
	                        	Company.setTel(cell.getStringCellValue());
	                            break;
	                        case 4:
	                        	Company.setType(cell.getStringCellValue());
	                            break;
	                        case 5:
	                        	Company.setAdress(cell.getStringCellValue());
	                            break;
	                        case 6:
	                        	Company.setCity(cell.getStringCellValue());

	                            break;
	                        case 7:
	                        	Company.setZipcode(cell.getStringCellValue() );

	                            break;
	                        case 8:
	                        	Company.setCountry(cell.getStringCellValue());

	                            break;
	                        case 9:
	                        	Company.setActivityArea(cell.getStringCellValue());

	                            break;
	                        case 10:
	                        	Company.setEmployeeNb(cell.getStringCellValue());
	                        	 System.out.println("cell.getStringCellValue()"+cell.getStringCellValue());

	                            break;
	                        case 11:
	                        	Company.setDescription(cell.getStringCellValue());
	                            break;
	                        case 12:
	                        	Company.setWebSite(cell.getStringCellValue());
	                            break;
	                        case 13:
	                        	Company.setLinkedin(cell.getStringCellValue());
	                            break;
	                        default:
	                            break;
	                    }
	                    cellIndex++;
	                }
	               
	                Company.setDateCreated(new Date());
	                Company.setDateUpdated(new Date());
	                // Assuming you have a method like findById in UserRepository
	                Company.setCompanyOwner(userRepository.findById(1L).orElse(null));
	             
	                Companys.add(Company);
	                
	            }
	        } catch (IOException e) {
	        	 
	            e.printStackTrace();
	        }
	        return Companys;
	    }

	@Override
	public Integer uploadCompany(MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

	



}
