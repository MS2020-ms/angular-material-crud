import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  loading = false;

  constructor(private _snackBar: MatSnackBar, private router: Router) {

    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  ingresar() {
    // console.log(this.formulario.value);
    const usuario = this.formulario.value.usuario;
    const password = this.formulario.value.password;
    // console.log(usuario);
    // console.log(password);
    // caso real: peticion a BBDD
    if (usuario == 'mmm' && password == '12345') {
      this.fakeloading();
    } else {
      //mostrar error
      this.error();
      this.formulario.reset();
    }
  }

  error() {
    this._snackBar.open('Usuario o password no validos!', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      // redireccionar al dashboard
      this.router.navigate(['dashboard']);
      // this.loading = false;
    }, 1500);
  }

}
