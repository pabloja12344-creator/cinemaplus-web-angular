import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento {

  private readonly htpp: HttpClient;
  private route = inject(ActivatedRoute);

  formulario: FormGroup;
  asientos: any = [];

  constructor(
    http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.htpp = http;

    // Obtener el ID de la sala si viene en la URL
    const idSalaUrl = this.route.snapshot.paramMap.get('idSala');

    this.formulario = this.fb.group({
      idSala: [idSalaUrl ? idSalaUrl : '', Validators.required],
      fila: ['', Validators.required],
      numero: ['', Validators.required]
    });

    if (idSalaUrl) {
      this.buscarAsientos(idSalaUrl);
    }
  }

  buscarAsientos(idSala: any) {
    if (!idSala) return;
    this.htpp.get("http://localhost:8080/asiento/buscar/" + idSala).subscribe(
      data => {
        this.asientos = data;
        this.cdr.detectChanges();
      }
    );
  }

  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fechaCreacion = new Date();

      this.htpp.post("http://localhost:8080/asiento/guardar", temp).subscribe(
        user => this.mostrar(user)
      );
    } else {
      alert("Completar campos");
    }
  }

  mostrar(user: any) {
    if (user?.idAsiento) {
      alert("Asiento creado exitosamente con ID: " + user.idAsiento);
      // Refresca la tabla usando el idSala que se acaba de guardar
      this.buscarAsientos(this.formulario.value.idSala);
      // Limpia fila y numero, dejando idSala listo para ingresar el siguiente asiento
      const idActual = this.formulario.value.idSala;
      this.formulario.reset({ idSala: idActual, fila: '', numero: '' });
    } else {
      alert("Error en el servidor");
    }
  }

}