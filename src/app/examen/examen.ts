import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-examen',
  styleUrl: './examen.css',
  templateUrl: './examen.html',
})
export class Examen {

   private readonly htpp:HttpClient;
  formulario:FormGroup;
  examenes:any = [];

constructor(http:HttpClient,private fb: FormBuilder,
  private cdr:ChangeDetectorRef) {
  
this.htpp= http;
    this.formulario = this.fb.group(
      {
        
        fechaExamen:['',Validators.required],
        carnet:['',Validators.required],
        nota:['',Validators.required]
      
      }
 );
      this.buscarExamen();
}
buscarExamen(){
     this.htpp.get("http://localhost:8080/examen/buscar"
      ).subscribe(
      data =>{
        this.examenes=data,
        this.cdr.detectChanges();
      }
    )
    }

 guardar (){
  if(this.formulario.valid){
      let temp = {... this.formulario.value};
      temp.fechaCreacion = new Date();
       this.htpp.post("http://localhost:8080/examen/guardar"
      ,temp).subscribe(
      user => this.mostrar(user)
    )
    }
    else{
      alert("Completar campos");
    }
   
  }
  mostrar(user:any){
    if(user?.idexamen){
      alert("Examen credo exitosamente con ID: "+user.idexamen);
      this.buscarExamen();
    }
    else{
      alert("Error en el servidor")
    }
  }

}
