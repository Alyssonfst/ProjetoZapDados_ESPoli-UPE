package br.com.zapdados.service;

/**
 *
 * @author thiagoespinhara
 */
public interface IUsuarioService {
    boolean validarLogin(String user, String pass);
}