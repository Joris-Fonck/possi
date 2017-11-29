package fr.istic.iodeman.strategy;

import fr.istic.iodeman.model.OralDefense;
import fr.istic.iodeman.model.Planning;
import fr.istic.iodeman.model.TimeBox;
import fr.istic.iodeman.model.Unavailability;

import java.util.Collection;
import java.util.List;

public interface AlgoPlanning {

	public void configure(Planning planning);
	
	public Collection<OralDefense> execute(List<TimeBox> timeboxes, List<Unavailability> unavailability);
	
}
