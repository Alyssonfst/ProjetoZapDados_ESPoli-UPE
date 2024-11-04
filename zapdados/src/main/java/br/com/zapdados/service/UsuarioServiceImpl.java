package br.com.zapdados.service;

import br.com.zapdados.integration.UsuarioRepository;
import br.com.zapdados.model.Usuario;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

/**
 *
 * @author thiagoespinhara
 */
@Service
public class UsuarioServiceImpl implements IUsuarioService {
    
    @Inject
    private UsuarioRepository repository;
    
    @Override
    public boolean validarLogin(String user, String pass) {
        Usuario usuario = repository.findById(user).get();
        
        return usuario!=null && usuario.getPassword().equals(pass);
    }
    
    @Override
    public void salvarArquivo(byte[] arquivo) {
        Usuario usuario = repository.findById("admin").get();
        usuario.setArquivo(arquivo);
        repository.save(usuario);
    }
    
    @Override
    public byte[] obterArquivo(String user) {
        return repository.findById("admin").get().getArquivo();
    }
}
