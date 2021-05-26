import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  LIST_USUARIOS: Usuario[] = [
    { id: uuidv4(), usuario: "juantor", nombre: 'Juan', apellido: "Tormento", sexo: 'Masculino' },
    { id: uuidv4(), usuario: "mgalan", nombre: 'Martirio', apellido: "Galan", sexo: 'Femenino' },
    { id: uuidv4(), usuario: "mduran", nombre: 'Mario', apellido: "Duran", sexo: 'Masculino' },
    { id: uuidv4(), usuario: "fmercury", nombre: 'Fredie', apellido: "Mercury", sexo: 'Masculino' },
    { id: uuidv4(), usuario: "ldivan", nombre: 'Luisa', apellido: "Divan", sexo: 'Femenino' },
    { id: uuidv4(), usuario: "msantos", nombre: 'Monica', apellido: "Santos", sexo: 'Femenino' },
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

  getUsuario(pId: string) {
    return this.LIST_USUARIOS.find(user => user.id === pId);
  }

  editarUsuario(id: string, user: Usuario) {
    this.LIST_USUARIOS.map(function (data) {
      if (data.id == id) {
        data.nombre = user.nombre;
        data.apellido = user.apellido;
        data.sexo = user.sexo;
      }
      return data;
    })
  }

}
