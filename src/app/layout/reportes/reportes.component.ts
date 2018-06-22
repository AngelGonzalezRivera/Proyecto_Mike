import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaService } from '../../shared/services/Asistencia.service';
import { MaestroService } from '../../shared/services/Maestro.service';

@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
    asistencia:any;
    maestros:any;
    constructor(public AsS:AsistenciaService,public MS:MaestroService){
        this.refreshDT();
    }
    refreshDT(){
        this.MS.getMaestros().subscribe(maestros => {
            this.maestros=maestros;
        this.AsS.getAsistencias().subscribe(data1 => {
            data1.forEach(function(element) {
                let fecha:String=element.fecha;
                element.fecha=fecha.substr(0,10);
                if(element.status=='A'){element.status=true}else element.status=false;               
                });
                 this.asistencia=data1;
                 this.maestros.forEach(function(element1) {
                    data1.forEach(function(element2) {
                      if(element1.id==element2.id_maestro){
                        element2.id_maestro=element1.nombre;
                      }
                  });});
            });  
        });
           
    }
 }
