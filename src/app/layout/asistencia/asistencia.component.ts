import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../../shared/services/Maestro.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service'
import { UserService } from '../../shared/services/user.service';
import { AsistenciaService } from '../../shared/services/Asistencia.service';
@Component({
    selector: 'app-asistencia',
    templateUrl: './asistencia.component.html',
    styleUrls: ['./asistencia.component.scss']
})


export class AsistenciaComponent implements OnInit {
    agregarmaestros(id$){
      this.maestro=this.savemaestro(id$);
      this.MS.postMaestro(this.maestro).subscribe(newpres => {
        console.log(newpres);
        if(newpres.status==200){
          //alert("Registro Realizado Correctamente");
        }else{
          alert("El Registro No se pudo Realizar, vuelva a intentarlo");
        }
        //console.log(newpres.status)
        //console.log(newpres);
        //console.log("ok"); 
        //window.location.reload()
        this.refreshDT();
        this.maestro=[];
      });    }
    maestro:any;
    maestros:any;
    maestrosForm:FormGroup;
    maestroForm:FormGroup;
    closeResult:any;
    usuarioForm: FormGroup;
    usuario: any;
    usuarios: any;
    us:any;
    fecha:any;
    constructor(public AS:AuthenticationService,public usuarioService:UserService,public AsS:AsistenciaService,public MS:MaestroService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
        this.refreshDT();
        this.us=this.AS.getUser();
  }

    change(id$,status){
        var stat;
        console.log(id$,status);
        if(status==true){
          stat='A'
        }else stat='B';
        this.MS.changeStatus(id$,stat).subscribe(newpre => { 
          this.refreshDT();
          //this.router.navigate(['/clientes'])
          //alert('Datos Cliente ->  ' + this.id + ' Actualizados');
        })  // call the rest of the code and have it execute after 3 seconds
        setTimeout(null, 1500);
    
      }
    refreshDT(){
        this.MS.getMaestros().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.maestros=data1;
            });  
            this.usuarioService.getUsers().subscribe(usuarios => {
              usuarios.forEach(function(element) {
              if(element.Status=='A'){element.Status=true}else element.Status=false;               
              });
              this.usuarios=(usuarios);
              console.log(this.usuarios);
                });  
    }
    agregarUsuario(){
      this.usuario=this.saveUsuario();
      this.usuarioService.postUser(this.usuario).subscribe(newpres => {
        console.log(newpres);
        if(newpres.status==201){
          console.log(newpres.insertId);
          this.agregarmaestros(newpres.insertId);
          alert("Registro Realizado Correctamente");
        }else{
          alert("El Registro No se pudo Realizar, vuelva a intentarlo");
        }
        //console.log(newpres.status)
        //console.log(newpres);
        //console.log("ok"); 
        //window.location.reload()
        this.refreshDT();
        this.usuario=[];
      });
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$.id);
              this.MS.getMaestro(id$.id).subscribe(maestros => {
                console.log(maestros);
                //console.log(maestros.User[0].nombre);
                this.maestroForm.controls['nombre'].setValue(maestros[0].nombre);
                this.maestroForm.controls['apellido'].setValue(maestros[0].apellido);
              });
            }
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregarUsuario();
                }
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editarmaestros(id$.id);
            }}
          }, (reason) => {
              console.log(reason);
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
        private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
      }

      passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('Contra').value !== c.get('Contra2').value) {
          console.log(c.get('Contra').value);
              return {invalid: true};
              //this.usuarioForm.controls['Contra2'].markAsTouched();
  
        }
      }

    ngOnInit() { 
          this.maestrosForm = this.pf.group({
            Nombre: ['', Validators.required],
            Apellido: ['', Validators.required ],
            Telefono: ['', Validators.required],
            Correo: ['', Validators.email],
            Contra: ['', [Validators.required, Validators.minLength(6)] ],
            Contra2: ['', [Validators.required, Validators.minLength(6)] ],
          },{validator: this.passwordConfirming});  
        //console.log(this.busqueda);   
        this.usuarioService.getUsers().subscribe(usuarios => {
                usuarios.forEach(function(element) {
                if(element.Status=='A'){element.Status=true}else element.Status=false;               
                });
                this.usuarios=(usuarios);
                console.log(this.usuarios)
                  });
          
                  this.maestroForm = this.pf.group({
                    nombre: ['', Validators.required],
                    apellido: ['', Validators.required ],
                    fecha:['', Validators.required ],
                  }); 
    }
    savemaestro(id$) {
      const savemaestro = {
        nombre: this.maestrosForm.get('Nombre').value,
        apellido: this.maestrosForm.get('Apellido').value,
        id_user: id$,
        //id_user: this.maestrosForm.get('id_user').value,
      };
      return savemaestro;
}
savemaestro2(id$) {
  const savemaestro = {
    id_maestro:id$,
    nombre: this.maestroForm.get('nombre').value,
    apellido: this.maestroForm.get('apellido').value,
    fecha: this.maestroForm.get('fecha').value,
    //id_user: this.maestrosForm.get('id_user').value,
  };
  return savemaestro;
}

saveUsuario() {
  const saveUsuario = {
    Nombre: this.maestrosForm.get('Nombre').value,
    Apellido: this.maestrosForm.get('Apellido').value,
    Telefono: this.maestrosForm.get('Telefono').value,
    Correo: this.maestrosForm.get('Correo').value,
    Contra: this.maestrosForm.get('Contra').value,
    idPermiso: 'Maestro',
  };
  return saveUsuario;
}
editarmaestros(id$) {
  this.maestro = this.savemaestro2(id$);
  console.log(this.maestro);
  this.AsS.postAsistencia(this.maestro).subscribe(newpre => { 
  this.refreshDT();
  alert('asistencia registrada');
  this.maestro=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
setTimeout(null, 1500);

}
}
