import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-funcion',
  styleUrl: './funcion.css',
  templateUrl: './funcion.html',
})
export class Funcion {

  private readonly htpp: HttpClient;
  formulario: FormGroup;
  funciones: any = [];

  constructor(
    http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.htpp = http;
    this.formulario = this.fb.group({
      idPelicula: ['', Validators.required],
      idSala: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      precioEntrada: ['', Validators.required]
    });

    this.buscarFunciones();
  }

  buscarFunciones() {
    this.htpp.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.cdr.detectChanges();
      }
    );
  }

  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fechaCreacion = new Date();

      this.htpp.post("http://localhost:8080/funcion/guardar", temp).subscribe(
        user => this.mostrar(user)
      );
    } else {
      alert("Completar campos");
    }
  }

  mostrar(user: any) {
    if (user?.idFuncion) {
      alert("Función creada exitosamente con ID: " + user.idFuncion);
      this.formulario.reset();
      this.buscarFunciones();
    } else {
      alert("Error en el servidor");
    }
  }

}