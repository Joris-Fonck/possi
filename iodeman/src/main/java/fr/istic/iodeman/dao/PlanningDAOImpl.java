package fr.istic.iodeman.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import fr.istic.iodeman.model.Planning;

@Repository
public class PlanningDAOImpl extends AbstractHibernateDAO implements PlanningDAO {

	public void persist(Planning planning) {
		Session session = getCurrentSession();
		session.beginTransaction();
		getCurrentSession().save(planning);
		session.getTransaction().commit();
	}

	public Planning findById(Integer id) {
		Planning pla = (Planning) getCurrentSession().load(Planning.class, id);
		return pla; 
	}

	public void delete(Planning entity) {
		Session session = getCurrentSession();
		session.beginTransaction();
		session.delete(entity);
		session.getTransaction().commit();
	}

	@SuppressWarnings("unchecked")
	public List<Planning> findAll() {
		Session session = getCurrentSession();
		return (List<Planning>) session.createCriteria(Planning.class).list();
	}

	public void deleteAll() {
		List<Planning> entityList = findAll();
		for (Planning entity : entityList) {
			delete(entity);
		}
	}

}
