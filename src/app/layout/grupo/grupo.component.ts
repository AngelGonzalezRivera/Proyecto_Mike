import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../shared/services/grupo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SemestreService } from '../../shared/services/semestre.service';

@Component({
    selector: 'app-grupo',
    templateUrl: './grupo.component.html',
    styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

semestres:any;
    agregargrupos(){
      this.grupo=this.savegrupo();
      this.grupo.status='A';
      this.CS.postGrupo(this.grupo).subscribe(newpres => {
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
        this.grupo=[];
      });    }
    grupo:any;
    grupos:any;
    gruposForm:FormGroup;
    closeResult:any;
    constructor(public SS:SemestreService,public CS:GrupoService, private pf: FormBuilder,private modalService: NgbModal,private router:Router) { 
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
        this.CS.getGrupos().subscribe(data1 => {
            data1.forEach(function(element) {
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.grupos=data1;
            });    
            this.SS.getSemestres().subscribe(data1 => {
              data1.forEach(function(element) {
                  if(element.status=='A'){element.status=true}else element.status=false;               
                  });
                   this.semestres=data1;
              }); 
    }
    open(accion,id$,content) {
        //this.clear();
        if(accion=='editar'){
        console.log(id$);
              this.CS.getGrupo(id$).subscribe(grupos => {
                
                //console.log(grupos.User[0].generation);
                this.gruposForm.controls['grupo'].setValue(grupos[0].grupo);
                this.gruposForm.controls['generation'].setValue(grupos[0].generation);
                this.gruposForm.controls['id_semestre'].setValue(grupos[0].id_semestre);
              });}
        //console.log(accion,id$);
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `${result}`;
              if(accion=='registrar'){
              if(this.closeResult=='Aceptar'){
                  this.agregargrupos();}
          }else if(accion=='editar'){
            if(this.closeResult=='Aceptar'){
            //console.log("eliminaaaaaa");
              this.editargrupos(id$);
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
        this.gruposForm= this.pf.group({
          grupo: ['', Validators.required],
          generation: ['', Validators.required],
          id_semestre: ['', Validators.required ],
          });  
    }
    savegrupo() {
      const savegrupo = {
        grupo: this.gruposForm.get('grupo').value,
        generation: this.gruposForm.get('generation').value,
        id_semestre: this.gruposForm.get('id_semestre').value,
      };
      return savegrupo;
}
editargrupos(id$) {
  this.grupo = this.savegrupo();
  this.CS.getGrupo(id$).subscribe(val=>{
    this.grupo.status=val[0].status;


  console.log(this.grupo);
  this.CS.putGrupo(id$,this.grupo).subscribe(newpre => { 
  this.refreshDT();
  this.grupo=[];

//this.router.navigate(['/clientes'])
//alert('Datos Cliente ->  ' + this.id + ' Actualizados');
})  // call the rest of the code and have it execute after 3 seconds
})

setTimeout(null, 1500);

}
}
