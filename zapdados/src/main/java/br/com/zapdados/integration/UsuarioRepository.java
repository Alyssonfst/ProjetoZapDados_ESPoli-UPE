package br.com.zapdados.integration;

import br.com.zapdados.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author thiagoespinhara
 */
@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String> {

}
