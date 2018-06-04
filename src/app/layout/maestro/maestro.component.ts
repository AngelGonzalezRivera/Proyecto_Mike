import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../../shared/services/Maestro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-maestro',
    templateUrl: './maestro.component.html',
    styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {


    agregarmaestros(){
      this.maestro=this.savemaestro();
      this.MS.postMaestro(this.maestro).subscribe(newpres => {
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
        this.maestro=[];
      });    }
    maestro:any;
    maestros:any;
    maestrosForm:FormGroup;
    closeResult:any;
    constructor(public MS:MaestroService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
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
        this.MS.getMaestros().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.maestros=data1;
            });    
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$);
              this.MS.getMaestro(id$).subscribe(maestros => {
                console.log(maestros);
                //console.log(maestros.User[0].nombre);
                this.maestrosForm.controls['nombre'].setValue(maestros[0].nombre);
                this.maestrosForm.controls['apellido'].setValue(maestros[0].apellido);
                this.maestrosForm.controls['status'].setValue(maestros[0].status);
              });}
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregarmaestros();}
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editarmaestros(id$);
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
        this.maestrosForm= this.pf.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required ],
            status: ['', Validators.required ],
          });  
    }
    savemaestro() {
      const savemaestro = {
        nombre: this.maestrosForm.get('nombre').value,
        apellido: this.maestrosForm.get('apellido').value,
        status: this.maestrosForm.get('status').value
      };
      return savemaestro;
}
editarmaestros(id$) {
  this.maestro = this.savemaestro();
  console.log(this.maestro);
  this.MS.putMaestro(id$,this.maestro).subscribe(newpre => { 
  this.refreshDT();
  this.maestro=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
setTimeout(null, 1500);

}
}
