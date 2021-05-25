import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  LIST_USUARIOS: Usuario[] = [
    { usuario: "juantor", nombre: 'Juan', apellido: "Tormento", sexo: 'Masculino' },
    { usuario: "mgalan", nombre: 'Martirio', apellido: "Galan", sexo: 'Femenino' },
    { usuario: "mduran", nombre: 'Mario', apellido: "Duran", sexo: 'Masculino' },
    { usuario: "fmercury", nombre: 'Fredie', apellido: "Mercury", sexo: 'Masculino' },
    { usuario: "ldivan", nombre: 'Luisa', apellido: "Divan", sexo: 'Femenino' },
    { usuario: "msantos", nombre: 'Monica', apellido: "Santos", sexo: 'Femenino' },
  ];

  constructor() { }

  sendUsuarios() {
    //Con slice() retorno una COPIA del listado de usuarios
    return this.LIST_USUARIOS.slice();
  }

  eliminarUsuario(index: number) {
    this.LIST_USUARIOS.splice(index, 1);
  }

  //push() agrega al final | unshift() agrega al principio
  agregarUsuario(usuario: Usuario) {
    this.LIST_USUARIOS.unshift(usuario);
  }

}
