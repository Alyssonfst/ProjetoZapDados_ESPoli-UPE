package br.com.zapdados.controllers;

import br.com.zapdados.integration.UsuarioRepository;
import br.com.zapdados.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;

@Component
public class UrlListingListener implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;
    
    @Autowired
    private UsuarioRepository repository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        
        addUsers();
        
        Map<?, ?> handlerMethods = requestMappingHandlerMapping.getHandlerMethods();
        System.out.println("URLs disponíveis na aplicação:");

        handlerMethods.forEach((key, value) -> {
            System.out.println(key + " -> " + value);
        });
    }
    
    private void addUsers() {
        if (!repository.existsById("admin")) {
            repository.save(new Usuario("admin", "admin", null));
        }
    }
}
