#!/bin/bash

# Executar aplicação JAVA através do shell, para que seja possível buscar os valores da variável JAVA_OPTS que estão declarados no docker-compose.yml do respectivo ambiente que será dado deploy. 
sh -c "java $JAVA_OPTS -jar /zapdados/app.jar"