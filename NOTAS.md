# Inicio
>ng new angular-material
>ng serve --open
Ir a http://localhost:4200/
Login: mmm | 12345

# Angular Material
https://material.angular.io/guide/getting-started
>ng add @angular/material
    - Deep Purple/Ambar - Yes - Yes
Ir app.modules.ts:
    import { MatSliderModule } from '@angular/material/slider';
    @NgModule ({....
        imports: [...,
        MatSliderModule,
    …]
    })
Ir app.component.html
<mat-slider min="1" max="100" step="1" value="1"></mat-slider>

# Pantalla Login
Crear componente Login
>ng g c components/login
Ir app.component.html -> <app-login></app-login>
Ir app.login.html
Crear assets/img -> ir https://www.flaticon.es/ -> buscar: user -> download png

## Componente de Angular Material
Ir https://material.angular.io/components/form-field/overview
### form-field + input
Agregar Modulo en app.modules.ts:!!! form-field -> Ir arriba donde dice API -> 
    import {MatFormFieldModule} from '@angular/material/form-field'; 

Importar todos los tags !!! form-field y input-> Ir arriba donde dice API -> 
    import {MatInputModule} from '@angular/material/input'; 
### button
Boton -> Ir arriba donde dice API -> 
    import {MatButtonModule} from '@angular/material/button'; 

Configurar tema colores: Deep Purple/Ambar -> ir angular.json
    "styles": ["./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",]
Ir https://material.angular.io/guide/getting-started -> prebuilt material design themes -> copiar indigo-pink.css y cambiar por deeppurple-amber.css
>ng serve
### snackbar
Mostrar error (Aviso) - Snackbar 
    -> Ir arriba donde dice API -> 
    import {MatSnackBarModule} from '@angular/material/snack-bar';  
    
    -> Ir arriba donde dice Example -> <> -> TS
    constructor(private _snackBar: MatSnackBar) {} en login.ts

    openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    }
    }
### progress spiner
    -> Ir arriba donde dice API -> 
    import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
    -> Ir Overview - <>
    <mat-spinner></mat-spinner>

## Todos los modulos de Angular Material y compartidos a un modulo propio = Refactorizar Codigo
>ng g m components/shared

## Formulario reactivo
Ir app.modules.ts -> importar ReactiveFormsModule

# Pantalla Dashboard
>ng g m components/dashboard --routing
>ng g c components/dashboard

# Configurar rutas
Ir a app-routing.module
Ir a dashboard-routing.module
## Lazy-Load de componentes por modulos
Ir a app-routing.module -> loadChildren

# Componentes dentro del dashboard
>ng g c components/dashboard/inicio
>ng g c components/dashboard/navbar
>ng g c components/dashboard/usuarios
>ng g c components/dashboard/reportes

# Componente navbar
### toolbar
    -> Ir arriba donde dice API -> 
    import {MatToolbarModule} from '@angular/material/toolbar';
    -> Ir Overview - <> - HTML copiar tag - CSS copiar example-spacer
    -> Para alinear botones <span class="example-spacer"></span>
#### Dentro de toolbar -> buttons
Importar modulo de mat-icon (icono)
    import {MatIconModule} from '@angular/material/icon'; 
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon"><mat-icon>favorite</mat-icon></button>
Icono https://fonts.google.com/icons

## Rutas Children dentro de dasboard.routing
Ir a dashboard.html
Ir a dashboard-routing.module

# navbar dinamico -> nombres como si fuera desde backend -> Observable
Renderiza los nombres del menu de forma dinamica
Crear app/services
Crear app/interfaces/menu.ts
Crear assets/data/menu.json -> backend fake
>ng g s services/menu --skipTest
Ir a shared.module importar y exportar HttpClientModule
Ir navbar.ts e injectar MenuService
## toolbar
Ir inicio.html, reportes.html y usuario.html -> pegar toolbar de Angular Material

# Componente Usuarios  
### tablas [table]
  -> Ir arriba donde dice API -> 
  import {MatTableModule} from '@angular/material/table'; 
  -> Overview HTML -> pegar en usuarios.html
  -> Overview TS -> pegar en usuarios.ts
  -> Overview CSS -> pegar en usuarios.css
Crear interfaces/usuario.ts
### tooltip - al pasar sobre icono
  -> Ir arriba donde dice API -> 
  import {MatTooltipModule} from '@angular/material/tooltip'; 
  -> Overview HTML -> pegar en usuarios.html en <a>
### table -> filtros
  -> Ir arriba donde dice EXAMPLES -> Table with filtering -> HTML
  -> Overview TS -> pegar metodo applyFilter() en usuarios.ts
  -> Overview CSS -> pegar en usuarios.css
### paginator -> paginacion 
  -> Ir arriba donde dice API -> 
    import {MatPaginatorModule} from '@angular/material/paginator'; 
Ir a table:
  -> Ir arriba donde dice EXAMPLES -> Table with pagination -> HTML
  -> Overview TS -> pegar en usuarios.ts
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
### short header -> alineamiento [sorting]
  -> Ir arriba donde dice API -> 
    import {MatSortModule} from '@angular/material/sort'; 
Ir a table:
  -> Ir arriba donde dice EXAMPLES -> Data table with sorting, pagination, and filtering. -> HTML -> agregar a la <table> directiva matSort y <th> de usuario mat-sort-header
  -> Overview TS -> pegar en usuarios.ts
    @ViewChild(MatSort) sort: MatSort;
    En metodo ngAfterViewInit() -> this.dataSource.sort = this.sort;

# Comunicacion = datos de servicio al componente
Crear services/usuario
>ng g s services/usuario --skipTests
Me creo LIST_USUARIOS en servicio [sendUsuarios()]
Ir usuarios.ts y traerme usuarios [getUsuarios()]
## operador ! = not  null assertion

# Componente para editar y agregar usuario
Ir usuarios.html - nuevo boton
>ng g c components/dashboard/usuarios/crear-usuario
Ir dashboard routing.module
Ir crear-usuario.html
## card 
  -> Ir arriba donde dice API -> 
    import {MatCardModule} from '@angular/material/card'; 
  -> Overview HTML -> pegar en crear-usuario.html
## grid list 
  -> Ir arriba donde dice API -> 
    import {MatGridListModule} from '@angular/material/grid-list';  
  -> Overview HTML -> pegar en crear-usuario.html
## form field
  -> Overview HTML -> pegar en crear-usuario.html
## select
  -> Ir arriba donde dice API -> 
    import {MatSelectModule} from '@angular/material/select';  
  -> Overview HTML -> pegar en crear-usuario.html
  -> Overview TS -> pegar array en usuarios.ts
# Comunicacion = datos de componente al servicio
Ir a usuario.service
Ir a crear-usuario.ts

# Editar usuario
Instalar uuid para crear id a cada usuario:
>npm install uuid
Crear id en usuarios.service.ts y en form de crear-usuario.ts
Ir a usuarios.html -> routerLink como property bindig porque le voy a pasar datos (id) o con evento click| index para eliminar por indice de array o id.
Ir a dashboard-routing -> crear ruta
Ir a usuario.service crear metodo getUsuario()
Ir a crear-usuario.ts -> creo variable id, inyecto private activatedRoute: ActivatedRoute y creo metodo editUsuario()
Ir a usuario.service