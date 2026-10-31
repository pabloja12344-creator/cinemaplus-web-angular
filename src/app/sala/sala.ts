import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-sala',
  styleUrl: './sala.css',
  templateUrl: './sala.html',
})
export class Sala {

  private readonly htpp: HttpClient;
  formulario: FormGroup;
  salas: any = [];

  constructor(http:HttpClient,private fb: FormBuilder,
  private cdr:ChangeDetectorRef){

     this.htpp = http;
    this.formulario = this.fb.group(
  {
    nombre: ['', Validators.required],
    filas: ['', Validators.required],
    asientosPorFilas: ['', Validators.required]

  }
);

this.buscarSalas();

     }

buscarSalas(){
  this.htpp.get("http://localhost:8080/sala/buscar"
  ).subscribe(
    data => {
      this.salas = data;
      this.cdr.detectChanges();
    }
  )
}

  guardar(){
    if (this.formulario.valid) {
      let temp = { ... this.formulario.value };
      temp.fechaCreacion = new Date();
      this.htpp.post("http://localhost:8080/sala/guardar"
        , temp).subscribe(
          user => this.mostrar(user)
        )
    }
    else {
      alert("Completar campos");
    }
  }
  mostrar(user: any){
    if (user?.idSala) {
      alert("Sala credo exitosamente con ID: " + user.idSala);
      this.buscarSalas();
    }
    else {
      alert("Error en el servidor")
    }
  }

  verAsientos(sala:any){
    location.href= "/asiento/"+sala.idSala;

  }

}

