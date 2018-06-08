import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../shared/services/Carrera.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carrera',
    templateUrl: './carrera.component.html',
    styleUrls: ['./carrera.component.scss']
})
export class CarreraComponent implements OnInit {


    agregarcarreras(){
      this.carrera=this.savecarrera();
      this.CS.postCarrera(this.carrera).subscribe(newpres => {
        console.log(newpres);
        if(newpres.status==200){
          alert("Registro Realizado Correctamente");
        }else{
          alert("El Registro No se pudo Realizar, vuelva a intentarlo");
        }
        //console.log(newpres.status)
        //console.log(newpres);
        //console.log("ok"); 
        //window.location.reload()
        this.refreshDT();
        this.carrera=[];
      });    }
    carrera:any;
    carreras:any;
    carrerasForm:FormGroup;
    closeResult:any;
    constructor(public CS:CarreraService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
        this.refreshDT();
    }
    change(id$,status){
        var stat;
        console.log(id$,status);
        if(status==true){
          stat='A'
        }else stat='B';
        this.CS.changeStatus(id$,stat).subscribe(newpre => { 
          this.refreshDT();
          //this.router.navigate(['/clientes'])
          //alert('Datos Cliente ->  ' + this.id + ' Actualizados');
        })  // call the rest of the code and have it execute after 3 seconds
        setTimeout(null, 1500);
    
      }
    refreshDT(){
        this.CS.getCarreras().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.carreras=data1;
            });    
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$);
              this.CS.getCarrera(id$).subscribe(carreras => {
                console.log(carreras);
                //console.log(carreras.User[0].nombre);
                this.carrerasForm.controls['nombre'].setValue(carreras[0].nombre);
                this.carrerasForm.controls['status'].setValue(carreras[0].status);
              });}
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregarcarreras();}
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editarcarreras(id$);
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



    ngOnInit() {
        this.carrerasForm= this.pf.group({
            nombre: ['', Validators.required],
            status: ['', Validators.required ],
          });  
    }
    savecarrera() {
      const savecarrera = {
        nombre: this.carrerasForm.get('nombre').value,
        status: this.carrerasForm.get('status').value
      };
      return savecarrera;
}
editarcarreras(id$) {
  this.carrera = this.savecarrera();
  console.log(this.carrera);
  this.CS.putCarrera(id$,this.carrera).subscribe(newpre => { 
  this.refreshDT();
  this.carrera=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
setTimeout(null, 1500);

}
}
