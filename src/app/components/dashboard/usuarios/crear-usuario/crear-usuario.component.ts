import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup;

  //select
  sexo: any[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  constructor(private usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar) {

    this.form = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  agregarUsuario() {
    // console.log(this.form.value);
    const user: Usuario = {
      usuario: this.form.value.usuario,
      nombre: this.form.value.usuario,
      apellido: this.form.value.usuario,
      sexo: this.form.value.usuario,
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

}
