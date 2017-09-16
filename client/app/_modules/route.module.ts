import {Routes} from '@angular/router';

import {HomeComponent} from './../home/home.component';
import {RegistrationComponent, ProfilComponent, LoginComponent, UserListComponent,EditComponent} from '../users/index';
import {Brand_listeComponent,Brand_editComponent} from "../brands/index";
import {Model_listeComponent,Model_editComponent} from "../models/index";
import {ContactComponent} from '../contact/contact.component';

import {AuthGuard} from "../_guard/auth.guard";
import {AdminGuard} from "../_guard/admin.guard";

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},

    {path: 'accueil', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'utilisateurs/ajouter', component: RegistrationComponent, canActivate: [AdminGuard]},
    {path: 'utilisateurs/modifier/:id', component: EditComponent, canActivate: [AdminGuard]},
    {path: 'utilisateurs/liste', component: UserListComponent, canActivate: [AdminGuard]},

    {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
    {path: 'utilisateur/profil', component: ProfilComponent, canActivate: [AuthGuard]},

    {path: 'marques/liste', component: Brand_listeComponent, canActivate: [AuthGuard]},
    {path: 'marques/enregistrer/:id', component: Brand_editComponent, canActivate: [AuthGuard]},
    {path: 'marques/modifier/:id', component: Brand_editComponent, canActivate: [AuthGuard]},

    {path: 'models/liste', component: Model_listeComponent, canActivate: [AuthGuard]},
    {path: 'models/enregistrer/:id', component: Model_editComponent, canActivate: [AuthGuard]},
    {path: 'models/modifier/:id', component: Model_editComponent, canActivate: [AuthGuard]},

    {path: 'auth/login', component: LoginComponent},
];
