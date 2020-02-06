import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { routing , appRoutingProviders } from './app.routing';
import { FroalaEditorModule , FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { SearchPipe} from './pipes/search.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { DocenteNewComponent } from './components/docente/docente-new/docente-new.component';
import { EstudianteNewComponent } from './components/estudiante/estudiante-new/estudiante-new.component';
import { MateriaNewComponent } from './components/materia/materia-new/materia-new.component';
import { DocenteListComponent } from './components/docente/docente-list/docente-list.component';
import { DocenteEditComponent } from './components/docente/docente-edit/docente-edit.component';
import { EstudianteListComponent } from './components/estudiante/estudiante-list/estudiante-list.component';
import { EstudianteEditComponent } from './components/estudiante/estudiante-edit/estudiante-edit.component';
import { MateriaListComponent } from './components/materia/materia-list/materia-list.component';
import { MateriaEditComponent } from './components/materia/materia-edit/materia-edit.component';
import { MatriculaListComponent } from './components/matricula/matricula-list/matricula-list.component';
import { MatriculaNewComponent } from './components/matricula/matricula-new/matricula-new.component';
import { MatriculaEditComponent } from './components/matricula/matricula-edit/matricula-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    DocenteNewComponent,
    EstudianteNewComponent,
    MateriaNewComponent,
    DocenteListComponent,
    DocenteEditComponent,
    EstudianteListComponent,
    EstudianteEditComponent,
    MateriaListComponent,
    MateriaEditComponent,
    MatriculaListComponent,
    MatriculaNewComponent,
    MatriculaEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
     appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
