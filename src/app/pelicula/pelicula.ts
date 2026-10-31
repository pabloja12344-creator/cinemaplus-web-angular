import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-pelicula',
  styleUrl: './pelicula.css',
  templateUrl: './pelicula.html',
})
export class Pelicula {

  private readonly htpp: HttpClient;
  formulario: FormGroup;
  peliculas: any = [];

  constructor(
    http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.htpp = http;
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      sinopsis: ['', Validators.required],
      duracionMinutos: ['', Validators.required],
      idGenero: ['', Validators.required],
      idClasificacion: ['', Validators.required],
      imagenPromocional: ['', Validators.required]
    });

    this.buscarPeliculas();
  }

  buscarPeliculas() {
    this.htpp.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.cdr.detectChanges();
      }
    );
  }

  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fechaCreacion = new Date();

      this.htpp.post("http://localhost:8080/pelicula/guardar", temp).subscribe(
        user => this.mostrar(user)
      );
    } else {
      alert("Completar campos");
    }
  }

  mostrar(user: any) {
    if (user?.idPelicula) {
      alert("Película creada exitosamente con ID: " + user.idPelicula);
      this.formulario.reset();
      this.buscarPeliculas();
    } else {
      alert("Error en el servidor");
    }
  }

}