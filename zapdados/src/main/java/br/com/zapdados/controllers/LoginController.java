package br.com.zapdados.controllers;

import br.com.services.UsuarioService;
import br.com.services.model.ResponseLoginTO;
import br.com.services.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author thiagoespinhara
 */
@RestController
@RequestMapping("/login")
public class LoginController {
    
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<ResponseLoginTO> login(@RequestBody Usuario usuario) {

        System.out.println(usuario);

        if (usuario.getUsername().equals("admin") && usuario.getPassword().equals("admin")) { 
            return new ResponseEntity<>(new ResponseLoginTO("etc123"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseLoginTO(null), HttpStatus.UNAUTHORIZED);
        }

    }
}
