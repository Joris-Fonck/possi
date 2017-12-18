package fr.istic.iodeman.Scheduler;

import fr.istic.iodeman.dao.PersonDAO;
import fr.istic.iodeman.model.Person;
import fr.istic.iodeman.resolver.PersonUidResolver;
import fr.istic.iodeman.utils.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import fr.istic.iodeman.service.LdapRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("myBean")
public class MyBean {

	@Autowired
	private PersonDAO personDAO;


	@Autowired
	private LdapRepository ldap;

	@Autowired
	PersonUidResolver resolverUID;

	public void printMessage() {
		System.out.println("commence sessfact");
		SessionFactory sessFact =  HibernateUtil.getSessionFactory();
		System.out.println("passe par sessfact");
		Session session = sessFact.getCurrentSession();
		System.out.println("passe par session");

		org.hibernate.Transaction tr = session.beginTransaction();
		System.out.println("passe par tr");
		Criteria criteria = session.createCriteria(Person.class);
		System.out.println("passe par criteria");
		List<Person> personlist = criteria.list();
		System.out.println("passe par personlist");
		// Iterator itr = personlist.iterator();
		System.out.println("entre dans la boucle");
		System.out.println("voilà ce que représente le resolverUID"+resolverUID);
		System.out.println("I am called by MethodInvokingJobDetailFactoryBean using SimpleTriggerFactoryBean");
		for(Person p :personlist)
		{   //resolverUID.verifyPerson(p.getUid());
			System.out.println("Voilà la personne"+p.getUid());
			System.out.println(ldap);
			 Person person = ldap.searchByUID(p.getUid());
			//  System.out.println("personne cherché dans le LDAPREPO"+person.getUid());
			if(person==null)
			{
				personDAO.delete(p);
				System.out.println("passe par delete");
			}
			else
			{
				System.out.println("La personne existe dans le LDAP");
			}


		}
		tr.commit();
		// System.out.println("Data displayed");
		//sessFact.close();
		//System.out.println("session close");
	}
	
}
