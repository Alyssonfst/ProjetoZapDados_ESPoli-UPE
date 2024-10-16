package br.com.zapdados.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author thiagoespinhara
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite CORS em todas as URLs
                .allowedOrigins("http://localhost:4200", "http://zapdados.com.br", "http://www.zapdados.com.br") // Adicione aqui os domínios permitidos
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Todos os cabeçalhos
                .allowCredentials(true); // Permitir credenciais
    }
}
