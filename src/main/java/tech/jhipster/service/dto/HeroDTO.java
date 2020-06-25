package tech.jhipster.service.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

public class HeroDTO implements Serializable {

	private Integer id;

	@NotNull
	private String name;

	public HeroDTO() {
	}

	public HeroDTO(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof HeroDTO)) {
			return false;
		}

		return id != null && id.equals(((HeroDTO) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "HeroDTO{" + "id=" + getId() + ", name='" + getName() + "'" + "}";
	}
}
