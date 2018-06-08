import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../shared/services/Curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {


    agregarcursos(){
      this.curso=this.savecurso();
      this.curso.status='A';
      this.CS.postCurso(this.curso).subscribe(newpres => {
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
        this.curso=[];
      });    }
    curso:any;
    cursos:any;
    cursosForm:FormGroup;
    closeResult:any;
    constructor(public CS:CursoService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
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
        this.CS.getCursos().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.cursos=data1;
            });    
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$);
              this.CS.getCurso(id$).subscribe(cursos => {
                console.log(cursos);
                //console.log(cursos.User[0].inicio);
                this.cursosForm.controls['inicio'].setValue(cursos[0].inicio);
                this.cursosForm.controls['fin'].setValue(cursos[0].fin);
              });}
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregarcursos();}
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editarcursos(id$);
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
        this.cursosForm= this.pf.group({
            inicio: ['', Validators.required],
            fin: ['', Validators.required ],
          });  
    }
    savecurso() {
      const savecurso = {
        inicio: this.cursosForm.get('inicio').value,
        fin: this.cursosForm.get('fin').value,
      };
      return savecurso;
}
editarcursos(id$) {
  this.curso = this.savecurso();
  this.CS.getCurso(id$).subscribe(val=>{
    this.curso.status=val[0].status;


  console.log(this.curso);
  this.CS.putCurso(id$,this.curso).subscribe(newpre => { 
  this.refreshDT();
  this.curso=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
})

setTimeout(null, 1500);

}
}
