import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-clasificacion',
  styleUrl: './clasificacion.css',
  templateUrl: './clasificacion.html',
})
export class Clasificacion {

  private readonly htpp: HttpClient;
  formulario: FormGroup;
  clasificaciones: any = [];

  constructor(http: HttpClient, private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {

    this.htpp = http;
    this.formulario = this.fb.group(
      {

        nombre: ['', Validators.required],

      }
    );

    this.buscarClasificaciones();

  }
  buscarClasificaciones() {
    this.htpp.get("http://localhost:8080/clasificacion/buscar"
    ).subscribe(
      data => {
        this.clasificaciones = data;
        this.cdr.detectChanges();
      }
    )

  }
  guardar() {
    if (this.formulario.valid) {
      let temp = { ... this.formulario.value };
      temp.fechaCreacion = new Date();
      this.htpp.post("http://localhost:8080/clasificacion/guardar"
        , temp).subscribe(
          user => this.mostrar(user)
        )
    }
    else {
      alert("Completar campos");
    }

  }
  mostrar(user: any) {
    if (user?.idClasificacion) {
      alert("Clasificacion credo exitosamente con ID: " + user.idClasificacion);
      this.buscarClasificaciones();
    }
    else {
      alert("Error en el servidor")
    }
  }

}