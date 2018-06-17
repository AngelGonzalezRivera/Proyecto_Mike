import { Component, OnInit } from '@angular/core';
import { SemestreService } from '../../shared/services/semestre.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-semestre',
    templateUrl: './semestre.component.html',
    styleUrls: ['./semestre.component.scss']
})
export class SemestreComponent implements OnInit {


    agregarsemestres(){
      this.semestre=this.savesemestre();
      this.semestre.status='A';
      this.CS.postSemestre(this.semestre).subscribe(newpres => {
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
        this.semestre=[];
      });    }
    semestre:any;
    semestres:any;
    semestresForm:FormGroup;
    closeResult:any;
    constructor(public CS:SemestreService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
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
        this.CS.getSemestres().subscribe(data1 => {
            data1.forEach(function(element) {
                let date:String;
                date=element.inicio;
                element.inicio=date.substr(0,10);
                date=element.fin;
                element.fin=date.substr(0,10);
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.semestres=data1;
            });    
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$);
              this.CS.getSemestre(id$).subscribe(semestres => {
                let date:String;
                date=semestres[0].inicio;
                semestres[0].inicio=date.substr(0,10);
                date=semestres[0].fin;
                semestres[0].fin=date.substr(0,10);
                console.log(semestres[0]);
                //console.log(semestres.User[0].inicio);
                this.semestresForm.controls['semestre'].setValue(semestres[0].semestre);
                this.semestresForm.controls['inicio'].setValue(semestres[0].inicio);
                this.semestresForm.controls['fin'].setValue(semestres[0].fin);
              });}
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregarsemestres();}
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editarsemestres(id$);
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
        this.semestresForm= this.pf.group({
          semestre: ['', Validators.required],
            inicio: ['', Validators.required],
            fin: ['', Validators.required ],
          });  
    }
    savesemestre() {
      const savesemestre = {
        semestre: this.semestresForm.get('semestre').value,
        inicio: this.semestresForm.get('inicio').value,
        fin: this.semestresForm.get('fin').value,
      };
      return savesemestre;
}
editarsemestres(id$) {
  this.semestre = this.savesemestre();
  this.CS.getSemestre(id$).subscribe(val=>{
    this.semestre.status=val[0].status;


  console.log(this.semestre);
  this.CS.putSemestre(id$,this.semestre).subscribe(newpre => { 
  this.refreshDT();
  this.semestre=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
})

setTimeout(null, 1500);

}
}
