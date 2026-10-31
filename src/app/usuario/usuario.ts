import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-usuario',
  styleUrl: './usuario.css',
  templateUrl: './usuario.html',
})
export class Usuario {

  private readonly htpp:HttpClient;
  formulario:FormGroup;
  usuarios:any = [];

  constructor(http:HttpClient,private fb: FormBuilder,
  private cdr:ChangeDetectorRef){

    this.htpp= http;
    this.formulario = this.fb.group(
      {
        correo:['',[Validators.required, Validators.email]],
        contrasena:['',Validators.required],
        nombres:['',Validators.required],
        apellidos:['',Validators.required],
        telefono:['',Validators.required],
        nombreUsuario:['',Validators.required]
      }
    );

    this.buscarUsuarios();

     }
  buscarUsuarios(){
     this.htpp.get("http://localhost:8080/usuario/buscar"
      ).subscribe(
      data =>{
        this.usuarios=data;
        this.cdr.detectChanges();
      }
    )
  }

  guardar (){
  if(this.formulario.valid){
      let temp = {... this.formulario.value};
      temp.fechaCreacion = new Date();
       this.htpp.post("http://localhost:8080/usuario/guardar"
      ,temp).subscribe(
      user => this.mostrar(user)
    )
    }
    else{
      alert("Completar campos");
    }
   
  }
  mostrar(user:any){
    if(user?.idUsuario){
      alert("Usuario credo exitosamente con ID: "+user.idUsuario);
      this.buscarUsuarios();
    }
    else{
      alert("Error en el servidor")
    }
  }

}