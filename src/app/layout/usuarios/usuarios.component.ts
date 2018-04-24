import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {NgForm, FormControl, FormGroup, FormBuilder, Validators, FormsModule, AbstractControl} from '@angular/forms'
import {UserService } from '../../shared/services/user.service';
import {Router, ActivatedRoute,NavigationEnd} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { User } from '../../modelos/user.modelo';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class UsuariosComponent implements OnInit {
  onResize(event){
    //console.log(window.innerWidth);
    if (window.innerWidth <= 992) {
      this.stacked = true;
        }
        else{
          this.stacked = false;
        }
  }
    //dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
     //dtTrigger: Subject<any> = new Subject();
    permisos:any;
    cars: User[];
    checked1: boolean = true;
    checked2: boolean = false;
    stacked:boolean;
    param: any;
    busquedaForm: FormGroup;
    closeResult: string;
    cargando = false;
    resultados= false;
    noresultados= false;
    campoBusqueda: FormControl;  
    busqueda: string; 
    display: boolean = false;
    public usuarios: any;
    usuarioForm: FormGroup;
    usuario: any;
    public myVariable="No hay registros para su busqueda...";
  
    constructor(private usuarioService: UserService,
        private pf: FormBuilder,private modalService: NgbModal,private router:Router) {
          this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
              this.stacked = true;
                }else {
                  this.stacked = false;}
        }); 
    }
    saveUsuario() {
        const saveUsuario = {
          Nombre: this.usuarioForm.get('Nombre').value,
          Apellido: this.usuarioForm.get('Apellido').value,
          Telefono: this.usuarioForm.get('Telefono').value,
          Correo: this.usuarioForm.get('Correo').value,
          Contra: this.usuarioForm.get('Contra').value,
          idPermiso: this.usuarioForm.get('idPermiso').value,
        };
        return saveUsuario;
      }
      refreshDT(){
        this.usuarioService.getUsers().subscribe(usuarios => {
          usuarios.forEach(function(element) {
          if(element.Status=='A'){element.Status=true}else element.Status=false;               
          });
          this.cars=(usuarios);
          console.log(this.cars)
            });
      }
    agregarUsuario(){
      this.usuario=this.saveUsuario();
      this.usuarioService.postUser(this.usuario).subscribe(newpres => {
        if(newpres.status==201){
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
    eliminarUsuario(id$) {
      console.log(this.closeResult);
      if (this.closeResult === 'Aceptar') {
      console.log('eliminando');
      this.usuario = [];
      this.usuarioService.delUser(id$).subscribe(res => {
          alert('Usuario # ' +id$+' ha sido Eliminado');
          this.refreshDT();
      });
  }
      else{
          console.log('no elimino');
      }
  }
  change(id$,Status){
    var stat;
    console.log(id$,Status);
    if(Status==true){
      stat='A'
    }else stat='B';
    this.usuarioService.changeStatus(id$,stat).subscribe(newpre => { 
      this.refreshDT();
      //this.router.navigate(['/clientes'])
      //alert('Datos Cliente ->  ' + this.id + ' Actualizados');
    })  // call the rest of the code and have it execute after 3 seconds
    setTimeout(null, 1500);

  }
  editarUsuario(id$){
    this.usuario = this.saveUsuario();
    console.log(this.usuario);
    this.usuarioService.putUsuario(id$,this.usuario,).subscribe(newpre => { 
      this.refreshDT();
      this.usuario=[];

      //this.router.navigate(['/clientes'])
      //alert('Datos Cliente ->  ' + this.id + ' Actualizados');
    })  // call the rest of the code and have it execute after 3 seconds
    setTimeout(null, 1500);
  }
  clear(){
    this.usuarioForm.controls['Nombre'].setValue("");
    this.usuarioForm.controls['Apellido'].setValue("");
    this.usuarioForm.controls['Telefono'].setValue("");
    this.usuarioForm.controls['Correo'].setValue("");
    this.usuarioForm.controls['Contra'].setValue("");
    this.usuarioForm.controls['Contra2'].setValue("");
    this.usuarioForm.controls['idPermiso'].setValue("");
  }
    open(accion,id$,content) {
      this.clear();

      if(accion=='editar'){
      //console.log(id$);
            this.usuarioService.getUser(id$).subscribe(usuario => {
              //console.log(usuario);
              //console.log(usuario.User[0].Nombre);
              this.usuario=usuario.User;
              this.usuarioForm.controls['Nombre'].setValue(usuario.User[0].Nombre);
              this.usuarioForm.controls['Apellido'].setValue(usuario.User[0].Apellido);
              this.usuarioForm.controls['Telefono'].setValue(usuario.User[0].Telefono);
              this.usuarioForm.controls['Correo'].setValue(usuario.User[0].Correo);
              this.usuarioForm.controls['Contra'].setValue(usuario.User[0].Contra);
              this.usuarioForm.controls['Contra2'].setValue(usuario.User[0].Contra);
              this.usuarioForm.controls['idPermiso'].setValue(usuario.User[0].idPermiso);
            });}
      //console.log(accion,id$);
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `${result}`;
            if(accion=='registrar'){
            if(this.closeResult=='Aceptar'){
                this.agregarUsuario();}
        }else if(accion=='eliminar'){
          if(this.closeResult=='Aceptar'){
          //console.log("eliminaaaaaa");
            this.eliminarUsuario(id$);
          }
        }else if(accion=='editar'){
          if(this.closeResult=='Aceptar'){
          //console.log("eliminaaaaaa");
            this.editarUsuario(id$);
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
    showDialog() {
        this.display = true;
    } 
    onSubmit() {
        this.usuario=this.saveUsuario();
        this.usuarioService.postUser(this.usuario).subscribe(newpres => {
          console.log(newpres);
          console.log("ok"); 
          this.router.navigate(['/usuarios'])});
    }
    passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('Contra').value !== c.get('Contra2').value) {
        console.log(c.get('Contra').value);
            return {invalid: true};
            //this.usuarioForm.controls['Contra2'].markAsTouched();

      }
    }
    ngOnInit() {

        this.usuarioService.getPermisos().subscribe(usuarios => {
            console.log(usuarios);
            this.permisos=usuarios;
            console.log(this.permisos);
           });

        this.usuarioForm = this.pf.group({
            Nombre: ['', Validators.required],
            Apellido: ['', Validators.required ],
            Telefono: ['', Validators.required],
            Correo: ['', Validators.email],
            Contra: ['', [Validators.required, Validators.minLength(6)] ],
            Contra2: ['', [Validators.required, Validators.minLength(6)] ],
            idPermiso: ['', Validators.required]
          },{validator: this.passwordConfirming});  
        //console.log(this.busqueda);   
        this.usuarioService.getUsers().subscribe(usuarios => {
                usuarios.forEach(function(element) {
                if(element.Status=='A'){element.Status=true}else element.Status=false;               
                });
                this.cars=(usuarios);
                console.log(this.cars)
                  });
                
            }
}
