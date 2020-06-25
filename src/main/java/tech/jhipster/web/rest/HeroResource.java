package tech.jhipster.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import tech.jhipster.service.HeroService;
import tech.jhipster.service.dto.HeroDTO;
import tech.jhipster.web.rest.errors.BadRequestAlertException;

@RestController
@RequestMapping("/api")
public class HeroResource {

    private final Logger log = LoggerFactory.getLogger(HeroResource.class);

    private static final String ENTITY_NAME = "hero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HeroService heroService;

    public HeroResource(HeroService heroService) {
        this.heroService = heroService;
    }

    /**
     * {@code POST  /heroes} : Create a new hero.
     *
     * @param heroDTO the heroDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new heroDTO, or with status {@code 400 (Bad Request)} if the hero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    
    @PostMapping("/heroes")
    public ResponseEntity<HeroDTO> createHero(@Valid @RequestBody HeroDTO heroDTO) throws URISyntaxException {
        log.debug("REST request to save Hero : {}", heroDTO);
        if (heroDTO.getId() != null) {
            throw new BadRequestAlertException("A new hero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HeroDTO result = heroService.save(heroDTO);
        return ResponseEntity.created(new URI("/api/heroes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, String.valueOf(result.getId())))
            .body(result);
    }
    

    /**
     * {@code PUT  /heroes} : Updates an existing hero.
     *
     * @param heroDTO the heroDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated heroDTO,
     * or with status {@code 400 (Bad Request)} if the heroDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the heroDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    
    @PutMapping("/heroes")
    public ResponseEntity<HeroDTO> updateHero(@Valid @RequestBody HeroDTO heroDTO) throws URISyntaxException {
        log.debug("REST request to update Hero : {}", heroDTO);
        if (heroDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HeroDTO result = heroService.save(heroDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, String.valueOf(heroDTO.getId())))
            .body(result);
    }
    

    /**
     * {@code GET  /heroes} : get all the heroes.
     *
     * @return list of heroes
     */
    
    @GetMapping("/heroes")
    public List<HeroDTO> getAllHeroes() {
        log.debug("REST request to get all Heroes");
        return heroService.findAll();
    }
    

    /**
     * {@code GET  /heroes/:id} : get the "id" hero.
     *
     * @param id the id of the heroDTO to retrieve.
     * @return heroDTO
     */
    
    @GetMapping("/heroes/{id}")
    public HeroDTO getHero(@PathVariable Integer id) {
        log.debug("REST request to get Hero : {}", id);
        return heroService.findOne(id);
    }
    

    /**
     * {@code DELETE  /heroes/:id} : delete the "id" hero.
     *
     * @param id the id of the heroDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    
    @DeleteMapping("/heroes/{id}")
    public ResponseEntity<Void> deleteHero(@PathVariable Integer id) {
        log.debug("REST request to delete Hero : {}", id);
        heroService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, String.valueOf(id))).build();
    }
    
    
    /**
     * {@code GET  /heroes/:name} : get all heroes with similar name
     *
     * @param name substring of the name of the heroDTO to retrieve.
     * @return List<HeroDTO> list of the heroes with similar names
     */
    
	@GetMapping(value="/heroes", params = "name")
	public List<HeroDTO> searchHeroes(@RequestParam(value = "name") String name) {
        log.debug("REST request to search Hero with name : {}", name);
        return heroService.searchHeroes(name);
	}
	
	
}
