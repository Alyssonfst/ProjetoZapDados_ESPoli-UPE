package br.com.zapdados.controllers;

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

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Map<?, ?> handlerMethods = requestMappingHandlerMapping.getHandlerMethods();
        System.out.println("URLs disponíveis na aplicação:");

        handlerMethods.forEach((key, value) -> {
            System.out.println(key + " -> " + value);
        });
    }
}
