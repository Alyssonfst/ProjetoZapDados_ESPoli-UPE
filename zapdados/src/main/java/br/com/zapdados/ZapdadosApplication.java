package br.com.zapdados;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = {"br.com.zapdados", "br.com.zapdados.service", "br.com.zapdados.model", "br.com.zapdados.service.controllers", "br.com.zapdados.service.integration"})
@SpringBootApplication
@EnableJpaRepositories
public class ZapdadosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZapdadosApplication.class, args);
	}

}
