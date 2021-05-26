import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup;

  //uid  (index para editar usuario, sera number) cuando es para editar = ruta trae el id | cuando es para crear = ruta trae null
  uid: string | null;
  //titulo dependiendo si es editar o agregar
  titulo = 'Crear Usuario';

  //select
  sexo: any[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  constructor(private usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {

    this.form = new FormGroup({
      id: new FormControl(uuidv4()),
      usuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
    });

    //id = valor escrito en ruta
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.uid);

  }

  ngOnInit(): void {

    this.asignEditableUsuario();
  }

  agregarEditarUsuario() {
    //uid cuando es para editar = ruta trae el id | cuando es para crear = ruta trae null
    if (this.uid === null) {
      this.agregarUsuario();
    } else {
      this.editarUsuario(this.uid);
    }
  }

  agregarUsuario() {
    // console.log(this.form.value);
    const user: Usuario = {
      id: this.form.value.id,
      usuario: this.form.value.usuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      sexo: this.form.value.sexo,
    }
    // console.log(user);
    this.usuarioService.agregarUsuario(user);
    this.router.navigate(['/dashboard/usuarios']);

    //snackbar - aviso
    this._snackBar.open('Usuario creado correctamente', 'Cerrar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  editarUsuario(id: string) {
    const user: Usuario = {
      id: this.form.value.id,
      usuario: this.form.value.usuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      sexo: this.form.value.sexo,
    }
    // console.log(user);
    this.usuarioService.editarUsuario(id, user);
    this.router.navigate(['/dashboard/usuarios']);

    //snackbar - aviso
    this._snackBar.open('Usuario editado correctamente', 'Cerrar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  asignEditableUsuario() {
    this.titulo = 'Editar Usuario';
    //uid cuando es para editar = ruta trae el id | cuando es para crear = ruta trae null
    if (this.uid != null) {

      let data = this.usuarioService.getUsuario(this.uid);
      // console.log(data);

      this.form.controls['usuario'].setValue(data?.usuario);
      this.form.controls['nombre'].setValue(data?.nombre);
      this.form.controls['apellido'].setValue(data?.apellido);
      this.form.controls['sexo'].setValue(data?.sexo);

    }
  }

}
