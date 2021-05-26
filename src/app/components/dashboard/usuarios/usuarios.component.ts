import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  //Columnas nombres
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  //(operador NOT NULL ASSERTION ! = no null = va tener un valor)
  dataSource!: MatTableDataSource<any>;

  //Paginacion (operador ! = no null = va tener un valor)
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Alineamiento - Sorting (operador ! = no null = va tener un valor)
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.listUsuarios = this.usuarioService.sendUsuarios();
    this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  //Funcion de paginacion de angulr material
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //Del alineamiento - sorting
    this.dataSource.sort = this.sort;
  }

  //Funcion de filtrado de angulr material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //eliminar por indice de array o crear a cada usuario un id con uuid() o nanoid()
  eliminarUsuario(index: number) {
    console.log(index);
    this.usuarioService.eliminarUsuario(index);
    this.getUsuarios();

    //snackbar - aviso
    this._snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
