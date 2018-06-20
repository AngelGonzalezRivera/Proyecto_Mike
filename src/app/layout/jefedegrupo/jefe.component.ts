import { Component, OnInit } from '@angular/core';
import { JefeService } from '../../shared/services/jefe.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { GrupoService } from '../../shared/services/grupo.service';

@Component({
    selector: 'app-jefe',
    templateUrl: './jefe.component.html',
    styleUrls: ['./jefe.component.scss']
})
export class JefeComponent implements OnInit {
    agregarjefes(id$){
      this.jefe=this.savejefe(id$);
      this.MS.postJefe(this.jefe).subscribe(newpres => {
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
        this.jefe=[];
      });    }
    jefe:any;
    jefes:any;
    jefesForm:FormGroup;
    jefeForm:FormGroup;
    closeResult:any;
    usuarioForm: FormGroup;
    usuario: any;
    usuarios: any;
    grupos:any;
    constructor(public usuarioService:UserService,public MS:JefeService,public GS:GrupoService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
        this.refreshDT();
        
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
        this.MS.getJefes().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.jefes=data1;
            });  
            this.usuarioService.getUsers().subscribe(usuarios => {
              usuarios.forEach(function(element) {
              if(element.Status=='A'){element.Status=true}else element.Status=false;               
              });
              this.usuarios=(usuarios);
              console.log(this.usuarios);
                });  
          this.GS.getGrupos().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.grupos=data1;
            }); 
    }
    agregarUsuario(){
      this.usuario=this.saveUsuario();
      this.usuarioService.postUser(this.usuario).subscribe(newpres => {
        console.log(newpres);
        if(newpres.status==201){
          console.log(newpres.insertId);
          this.agregarjefes(newpres.insertId);
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
              this.MS.getJefe(id$.id).subscribe(jefes => {
                console.log(jefes);
                //console.log(jefes.User[0].nombre);
                this.jefeForm.controls['nombre'].setValue(jefes[0].nombre);
                this.jefeForm.controls['apellido'].setValue(jefes[0].apellido);
                this.jefeForm.controls['id_user'].setValue(jefes[0].id_user);
                this.jefeForm.controls['id_grupo'].setValue(jefes[0].id_grupo);
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
              this.editarjefes(id$.id);
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
          this.jefesForm = this.pf.group({
            Nombre: ['', Validators.required],
            Apellido: ['', Validators.required ],
            Telefono: ['', Validators.required],
            Correo: ['', Validators.email],
            Contra: ['', [Validators.required, Validators.minLength(6)] ],
            Contra2: ['', [Validators.required, Validators.minLength(6)] ],
            id_grupo:['', Validators.required],
          },{validator: this.passwordConfirming});  
        //console.log(this.busqueda);   
        this.usuarioService.getUsers().subscribe(usuarios => {
                usuarios.forEach(function(element) {
                if(element.Status=='A'){element.Status=true}else element.Status=false;               
                });
                this.usuarios=(usuarios);
                console.log(this.usuarios)
                  });
          
                  this.jefeForm = this.pf.group({
                    nombre: ['', Validators.required],
                    apellido: ['', Validators.required ],
                    id_user: ['', Validators.required],
                    id_grupo:['', Validators.required],
                  }); 
    }
    savejefe(id$) {
      let grupo:number=this.jefesForm.get('id_grupo').value;
      console.log(grupo);
      const savejefe = {
        nombre: this.jefesForm.get('Nombre').value,
        apellido: this.jefesForm.get('Apellido').value,
        id_user: id$,
        id_grupo: grupo,
        //id_user: this.jefesForm.get('id_user').value,
      };
      return savejefe;
}
savejefe2(id$) {
  const savejefe = {
    nombre: this.jefeForm.get('nombre').value,
    apellido: this.jefeForm.get('apellido').value,
    id_user: id$,
    id_grupo: this.jefeForm.get('id_grupo').value,
    //id_user: this.jefesForm.get('id_user').value,
  };
  return savejefe;
}

saveUsuario() {
  const saveUsuario = {
    Nombre: this.jefesForm.get('Nombre').value,
    Apellido: this.jefesForm.get('Apellido').value,
    Telefono: this.jefesForm.get('Telefono').value,
    Correo: this.jefesForm.get('Correo').value,
    Contra: this.jefesForm.get('Contra').value,
    idPermiso: 'Jefe de Grupo',
    grupo: this.jefesForm.get('id_grupo').value,
  };
  return saveUsuario;
}
editarjefes(id$) {
  this.jefe = this.savejefe2(id$);
  console.log(this.jefe);
  this.MS.putJefe(id$,this.jefe).subscribe(newpre => { 
  this.refreshDT();
  this.jefe=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
setTimeout(null, 1500);
}
}
