package br.com.integration;

import br.com.services.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author thiagoespinhara
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

}
