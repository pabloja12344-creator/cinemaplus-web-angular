import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-anuncio',
  styleUrl: './anuncio.css',
  templateUrl: './anuncio.html',
})
export class Anuncio {

     private readonly htpp:HttpClient;
  formulario:FormGroup;
  anuncios:any = [];

 constructor(http:HttpClient,private fb: FormBuilder,
  private cdr:ChangeDetectorRef){

    this.htpp= http;
    this.formulario = this.fb.group(
      {
        titulo:['',Validators.required],
        descripcion:['',Validators.required],
        fechaPublicacion:['',Validators.required],
        hashtag:['',Validators.required]
      
      });
      
      this.buscarAnuncio();
    }
    buscarAnuncio(){
     this.htpp.get("http://localhost:8080/anuncio/buscar"
      ).subscribe(
      data => {
        this.anuncios=data;
        this.cdr.detectChanges();
      }
    )
    }

  guardar (){
  if(this.formulario.valid){
      let temp = {... this.formulario.value};
      temp.fechaCreacion = new Date();
       this.htpp.post("http://localhost:8080/anuncio/guardar"
      ,temp).subscribe(
      user => this.mostrar(user)
    )
    }
    else{
      alert("Completar campos");
    }
   
  }
  mostrar(user:any){
    if(user?.idAnuncio){
      alert("Anuncio credo exitosamente con ID: "+user.idAnuncio);
      this.buscarAnuncio();
    }
    else{
      alert("Error en el servidor")
    }
  }

}
  

