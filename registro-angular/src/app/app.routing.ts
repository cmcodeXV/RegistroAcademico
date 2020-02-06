//Inports Necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//Inportar Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { DocenteNewComponent} from './components/docente/docente-new/docente-new.component';
import { DocenteListComponent} from './components/docente/docente-list/docente-list.component';
import { DocenteEditComponent} from './components/docente/docente-edit/docente-edit.component';
import { EstudianteNewComponent} from './components/estudiante/estudiante-new/estudiante-new.component';
import { EstudianteListComponent} from './components/estudiante/estudiante-list/estudiante-list.component';
import { EstudianteEditComponent} from './components/estudiante/estudiante-edit/estudiante-edit.component';
import { MateriaNewComponent} from './components/materia/materia-new/materia-new.component';
import { MateriaListComponent} from './components/materia/materia-list/materia-list.component';
import { MateriaEditComponent} from './components/materia/materia-edit/materia-edit.component';

import { MatriculaListComponent} from './components/matricula/matricula-list/matricula-list.component';
import { MatriculaNewComponent} from './components/matricula/matricula-new/matricula-new.component';
import { MatriculaEditComponent} from './components/matricula/matricula-edit/matricula-edit.component';

//Definir Rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'crear-user', component: RegisterComponent},
    {path: 'list-users', component: UserListComponent},
    {path: 'ajustes', component: UserEditComponent},
    {path: 'crear-docente', component: DocenteNewComponent},
    {path: 'list-docentes', component: DocenteListComponent},
    {path: 'edit-docente/:id', component: DocenteEditComponent},
    {path: 'crear-estudiante', component: EstudianteNewComponent},
    {path: 'list-estudiantes', component: EstudianteListComponent},
    {path: 'edit-estudiante/:id', component: EstudianteEditComponent},
    {path: 'crear-materia', component: MateriaNewComponent},
    {path: 'list-materias', component: MateriaListComponent},
    {path: 'edit-materia/:id', component: MateriaEditComponent},
    {path: 'list-matriculas', component: MatriculaListComponent},
    {path: 'crear-matricula', component: MatriculaNewComponent},
    {path: 'edit-matricula/:id', component: MatriculaEditComponent},
    {path: '**', component:ErrorComponent}
];

//Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);