import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-genero',
  styleUrl: './genero.css',
  templateUrl: './genero.html',
})
export class Genero {

  private readonly htpp:HttpClient;
  formulario:FormGroup;
  generos:any = [];

  constructor(http:HttpClient,private fb: FormBuilder,
  private cdr:ChangeDetectorRef){

    this.htpp= http;
    this.formulario = this.fb.group(
      {
       
        nombre:['',Validators.required]
        
      }
      );

      this.buscarGeneros();
       }
  buscarGeneros(){
     this.htpp.get("http://localhost:8080/genero/buscar"
      ).subscribe(
      data =>{
        this.generos=data;
        this.cdr.detectChanges();
      }
    )
  }

 guardar (){
  if(this.formulario.valid){
      let temp = {... this.formulario.value};
      temp.fechaCreacion = new Date();
       this.htpp.post("http://localhost:8080/genero/guardar"
      ,temp).subscribe(
      user => this.mostrar(user)
    )
    }
    else{
      alert("Completar campos");
    }

    }
  mostrar(user:any){
    if(user?.idGenero){
      alert("Genero credo exitosamente con ID: "+user.idGenero);
      this.buscarGeneros();
    }
    else{
      alert("Error en el servidor")
    }
  }
  
}
