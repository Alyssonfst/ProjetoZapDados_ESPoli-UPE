package br.com.zapdados.controllers;

import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.UsuarioServiceImpl;
import br.com.zapdados.model.ResponseLoginTO;
import br.com.zapdados.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
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
    private IUsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<ResponseLoginTO> login(@RequestBody Usuario usuario) {

        System.out.println(usuario);
        if (usuarioService.validarLogin(usuario.getUsername(), usuario.getPassword())) {
            return ResponseEntity.ok().body(new ResponseLoginTO("etc123"));
        } else {
            return ResponseEntity.status(403).body(new ResponseLoginTO("etc123"));
        }
    }
}
