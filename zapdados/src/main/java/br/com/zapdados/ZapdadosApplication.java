package br.com.zapdados;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"br.com.zapdados", "br.com.services"})
@SpringBootApplication
public class ZapdadosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZapdadosApplication.class, args);
	}

}
