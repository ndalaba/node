import {Component} from '@angular/core';
import {User} from "../_models/index";
import {AuthService} from "../_services/index";
import {AdminGuard} from "../_guard/index";
import { Config } from "../_modules/app.config";
import { Router } from "@angular/router";



@Component({
    selector: 'navigation',
    template:`
        <aside id="aside" class="aside aside-left" data-fuse-bar="aside" data-fuse-bar-media-step="md" data-fuse-bar-position="left">
            <div class="aside-content-wrapper">
                <div class="aside-content">
                    <div class="aside-toolbar">
                        <!--<div class="logo">
                            <span class="logo-icon">{{ loggedUserIcon | uppercase}}</span><span class="logo-text">{{loggedUser.name}}</span>
                        </div>-->
                        <div class="logo">
                            <span class="logo-icon">{{app_icon}}</span><span class="logo-text">{{app_name}}</span>
                        </div>
                        <button id="toggle-fold-aside-button" type="button" class="btn btn-icon d-none d-lg-block" data-fuse-aside-toggle-fold="">
                            <i class="icon icon-backburger" style="color:#fff"></i>
                        </button>
                    </div>
                    <ul class="nav flex-column custom-scrollbar" id="sidenav" data-children=".nav-item">
                        <li class="subheader">
                            <span>APPS</span>
                        </li>

                        <li class="nav-item" role="tab" id="heading-dashboards">
                            <a class="nav-link ripple with-arrow " data-toggle="collapse" data-target="#collapse-dashboards" href="#" aria-expanded="true" aria-controls="collapse-dashboards">
                                <i class="icon s-4 icon-tile-four"></i>
                                <span>Tableau de bord</span>
                            </a>
                            <ul id="collapse-dashboards" class="collapse show" role="tabpanel" aria-labelledby="heading-dashboards" data-children=".nav-item">
                                <li class="nav-item">
                                    <a class="nav-link ripple" [routerLink]="['/']">
                                        <span>Project Dashboard</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item" role="tab" id="heading-ecommerce">
                            <a class="nav-link ripple with-arrow collapsed" data-toggle="collapse" data-target="#collapse-ecommerce" href="#" aria-expanded="false" aria-controls="collapse-ecommerce">
                                <i class="icon s-4 icon-cart"></i>
                                <span>Ecommerce</span>
                            </a>
                            <ul id="collapse-ecommerce" class="collapse" role="tabpanel" aria-labelledby="heading-ecommerce" data-children=".nav-item">
                                <li class="nav-item">
                                    <a class="nav-link ripple ">
                                        <span>Orders</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ripple ">
                                <i class="icon s-4 icon-email"></i>
                                <span>Mail</span>
                            </a>
                        </li>
                        <li class="subheader">
                            <span>PAGES</span>
                        </li>
                        <li class="nav-item" role="tab" id="heading-authentication" *ngIf="adminGuard.canActivate()">
                            <a class="nav-link ripple with-arrow collapsed" data-toggle="collapse" data-target="#collapse-authentication" href="#" aria-expanded="false" aria-controls="collapse-authentication">
                                <i class="icon s-4 icon-account-box"></i>
                                <span>Utilisateurs</span>
                            </a>
                            <ul id="collapse-authentication" class="collapse" role="tabpanel" aria-labelledby="heading-authentication" data-children=".nav-item">
                                <li class="nav-item">
                                    <a class="nav-link ripple" routerLinkActive="active" [routerLink]="['/utilisateurs/liste']">
                                        <i class="icon s-4 icon-account"></i>
                                        <span>Liste utilisateurs</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link ripple" routerLinkActive="active" [routerLink]="['/utilisateurs/ajouter']">
                                        <i class="icon s-4 icon-pencil-circle"></i>
                                        <span>Ajouter un utilisateur</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="btn-group dropup">
                        <button style="background-color:#0747a6;margin-top: 20px;" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <div class="avatar-wrapper">
                                <img class="avatar" [src]="upload_folder+loggedUser.photo"/>
                            </div> 
                        </button>
                        <div class="dropdown-menu">
                            <p style="padding:0 10px">{{loggedUser.name | uppercase}}</p>                    
                            <a class="dropdown-item" href="#">Mon profil</a>                    
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" (click)="logout($event)">Se deconnecter</a>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    `
})

export class NavigationComponent {
    private loggedUser:User;
    private app_name: string = Config.APP_NAME;
    private app_icon: string = this.app_name.charAt(0);
    private upload_folder: string = Config.UPLOAD_FOLDER;

    constructor(private authService: AuthService, private adminGuard: AdminGuard, private router: Router) {
        this.loggedUser = authService.loggedUser;
    }
    logout(event: Event) {
        event.preventDefault();
        this.authService.logout().subscribe(() => {
            localStorage.removeItem('loggedUser');
            this.authService.onAuth();
            this.router.navigate(['/auth/login']);
        });
    }
}