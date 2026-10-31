import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Anuncio } from './anuncio/anuncio';
import { Asiento } from './asiento/asiento';
import { Examen } from './examen/examen';
import { Usuario } from './usuario/usuario';
import { Genero } from './genero/genero';
import { Clasificacion } from './clasificacion/clasificacion';
import { Sala } from './sala/sala';
import { Pelicula   } from './pelicula/pelicula';
import { Funcion } from './funcion/funcion';



export const routes: Routes = [
    {path:'',component:Login},
    {path:'bienvenida',component:Bienvenida},
    {path:'anuncio',component:Anuncio},
    {path:'asiento/:idSala',component:Asiento},
    {path:'examen',component:Examen},
    {path:'usuario',component:Usuario},
    {path:'genero',component:Genero},
    {path:'clasificacion',component:Clasificacion},
    {path:'sala',component:Sala},
    {path:'pelicula',component:Pelicula},
    {path:'funcion',component:Funcion},
    
];