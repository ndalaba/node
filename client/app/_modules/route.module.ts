import {Routes} from '@angular/router';

import {HomeComponent} from './../home/home.component';
import {RegistrationComponent, ProfilComponent, LoginComponent, UserListComponent,EditComponent} from '../users/index';
import {BrandListComponent,EditComponent as EditBrand} from "../brands/index"
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

    {path: 'marques/liste', component: BrandListComponent, canActivate: [AuthGuard]},
    {path: 'marques/enregistrer/:id', component: EditBrand, canActivate: [AuthGuard]},
    {path: 'marques/modifier/:id', component: EditBrand, canActivate: [AuthGuard]},


    {path: 'auth/login', component: LoginComponent},
];
