package fr.istic.iodeman.strategy;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Collection;

import fr.istic.iodeman.model.Participant;
import fr.istic.iodeman.model.Person;
import fr.istic.iodeman.resolver.PersonResolver;

public class ParticipantsCSVImport implements ParticipantsImport {

	private PersonResolver personResolver;

	public void configure(PersonResolver personResolver) {
		this.personResolver = personResolver;
	}
	
	public Collection<Participant> execute(File file) throws Exception {
		Collection<Participant> participants = new ArrayList<Participant>();
		
		BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ";";
        
        try {
            br = new BufferedReader(new FileReader(file));
            
            line = br.readLine();
            
            if(!line.contains(",")) {
            	cvsSplitBy = ";";
            }
            
            if(!line.contains(";")) {
            	cvsSplitBy = ",";
            }
            
            while ((line = br.readLine()) != null) {
            	System.err.println(line);
            	
                // use comma as separator
                String[] row = line.split(cvsSplitBy);
                
                System.err.println(row[1].trim() + " " + row[2].trim());
                
                // create participants
    			Participant participant = new Participant();
    			
    			// Student
    			String email = row[0].trim();
    			String normedEmail = normalize(email);
    			System.err.println(email);
    			System.err.println(normedEmail);
    			Person student = personResolver.resolve(normedEmail);

				if(student != null) {
					// following teacher
					email = row[4].trim();
					normedEmail = normalize(email);
					Person followingTeacher = personResolver.resolve(normedEmail);

					if (followingTeacher != null) {
						String tutorFullName = row[5].trim();

						participant.setTutorFullName(tutorFullName);
						// Compagny
						String company = row[3].trim();
						participant.setCompany(company);

						participant.setStudent(student);
						participant.setFollowingTeacher(followingTeacher);

						participants.add(participant);
					}
				}
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
		
        return participants;
	}
	
	private String normalize(String input){
		return Normalizer.normalize(input, Normalizer.Form.NFC).replaceAll("[^\\p{ASCII}]", "");
	}

}
