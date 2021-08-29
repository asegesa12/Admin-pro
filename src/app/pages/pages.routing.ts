import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



const routes: Routes = [

    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [AuthGuard],
        children: [

            // Rutas Hijas
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
            { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promise' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Profile' } },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Users' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medics' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitals' } }
        ]

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
