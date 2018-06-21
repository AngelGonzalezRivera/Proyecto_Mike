import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import{ AuthenticationService} from './shared/services/authentication.service';
import{ CarreraService} from './shared/services/Carrera.service';
import{ CursoService} from './shared/services/Curso.service';
import{ SemestreService} from './shared/services/semestre.service';
import{ UserService} from './shared/services/user.service';
import{ MaestroService} from './shared/services/Maestro.service';
import{ GrupoService} from './shared/services/grupo.service';
import{ JefeService} from './shared/services/jefe.service';
import{ MateriaService} from './shared/services/materia.service';

import{ PrpropiosService} from './shared/services/prpropios.service';
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [MateriaService,JefeService,GrupoService,SemestreService,CursoService,CarreraService,AuthGuard,AuthenticationService,UserService,PrpropiosService,MaestroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
