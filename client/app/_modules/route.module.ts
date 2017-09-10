import {Routes} from '@angular/router';

import {HomeComponent} from './../home/home.component';
import {RegistrationComponent, ProfilComponent, LoginComponent, UserListComponent,EditComponent} from '../users/index';
import {ContactComponent} from '../contact/contact.component';

import {AuthGuard} from "../_guard/auth.guard";

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'accueil', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'utilisateurs/ajouter', component: RegistrationComponent, canActivate: [AuthGuard]},
    {path: 'utilisateurs/modifier/:id', component: EditComponent, canActivate: [AuthGuard]},
    {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
    {path: 'utilisateur/profil', component: ProfilComponent, canActivate: [AuthGuard]},
    {path: 'utilisateurs/liste', component: UserListComponent, canActivate: [AuthGuard]},
    {path: 'auth/login', component: LoginComponent},
];
