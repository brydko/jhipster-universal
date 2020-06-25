package tech.jhipster.service;

import java.util.List;
import java.util.Optional;

import tech.jhipster.service.dto.HeroDTO;

public interface HeroService {

	/**
	 * Save a hero.
	 *
	 * @param heroDTO the entity to save.
	 * @return the persisted entity.
	 */
	HeroDTO save(HeroDTO heroDTO);

	/**
	 * Get all the heroes.
	 *
	 * @return the list of entities.
	 */
	List<HeroDTO> findAll();

	/**
	 * Get the "id" hero.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	HeroDTO findOne(Integer id);

	/**
	 * Delete the "id" hero.
	 *
	 * @param id the id of the entity.
	 */
	void delete(Integer id);
	
	/**
	 * Search heroes.
	 *
	 * @return the list of entities.
	 */
	List<HeroDTO> searchHeroes(String name);
}
