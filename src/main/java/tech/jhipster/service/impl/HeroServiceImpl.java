package tech.jhipster.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import tech.jhipster.service.HeroService;
import tech.jhipster.service.dto.HeroDTO;

@Service
public class HeroServiceImpl implements HeroService {

	private final Logger log = LoggerFactory.getLogger(HeroServiceImpl.class);

	private List<HeroDTO> heroes;

	public HeroServiceImpl() {
		heroes = new ArrayList<>(Arrays.asList(
				new HeroDTO(11, "Dr Nice"), 
				new HeroDTO(12, "Narco"),
				new HeroDTO(13, "Bombasto"), 
				new HeroDTO(14, "Celeritas"), 
				new HeroDTO(15, "Magneta"),
				new HeroDTO(16, "RubberMan"), 
				new HeroDTO(17, "Dynama"), 
				new HeroDTO(18, "Dr IQ"),
				new HeroDTO(19, "Magma"), 
				new HeroDTO(20, "Tornado")
		));
	}

	/**
	 * Save a hero.
	 *
	 * @param heroDTO the entity to save.
	 * @return the persisted entity.
	 */
	@Override
	public HeroDTO save(HeroDTO heroDTO) {

		log.debug("Request to save Hero : {}", heroDTO);

		if (heroDTO.getId() == null) {
			if (heroes.isEmpty()) {
				heroDTO.setId(11);
			} else {
				heroDTO.setId(heroes.get(heroes.size() - 1).getId() + 1);
			}
			heroes.add(heroDTO);
		} else {
			for (HeroDTO hero : heroes) {
				if (hero.getId().equals(heroDTO.getId())) {
					hero.setName(heroDTO.getName());
					return hero;
				}
			}
		}

		return heroDTO;
	}

	/**
	 * Get all the heroes.
	 *
	 * @return the list of entities.
	 */
	@Override
	public List<HeroDTO> findAll() {
		log.debug("Request to get all Heroes");
		return heroes;
	}

	/**
	 * Get one hero by id.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	@Override
	public HeroDTO findOne(Integer id) {
		log.debug("Request to get Hero : {}", id);
		return heroes.stream().filter(hero -> hero.getId().equals(id)).findFirst().get();
	}

	/**
	 * Delete the hero by id.
	 *
	 * @param id the id of the entity.
	 */
	@Override
	public void delete(Integer id) {
		log.debug("Request to delete Hero : {}", id);
		heroes.removeIf(hero -> hero.getId().equals(id));
	}

	/**
	 * Search heroes.
	 *
	 * @return the list of entities.
	 */
	@Override
	public List<HeroDTO> searchHeroes(String name) {
		log.debug("Request to search Hero with name : {}", name);
		return heroes.stream().filter(hero -> hero.getName().trim().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
	}
}
