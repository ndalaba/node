import {Component} from '@angular/core';
import {User} from "../_models/index";
import {AuthService} from "../_services/index";
import {AdminGuard} from "../_guard/index";


@Component({
    selector: 'navigation',
    template:`
        <aside id="aside" class="aside aside-left" data-fuse-bar="aside" data-fuse-bar-media-step="md" data-fuse-bar-position="left">
            <div class="aside-content-wrapper">
                <div class="aside-content">
                    <div class="aside-toolbar">
                        <div class="logo">
                            <span class="logo-icon">{{ loggedUserIcon | uppercase}}</span><span class="logo-text">{{loggedUser.name}}</span>
                        </div>
                        <button id="toggle-fold-aside-button" type="button" class="btn btn-icon d-none d-lg-block" data-fuse-aside-toggle-fold="">
                            <i class="icon icon-backburger"></i>
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
                </div>
            </div>
        </aside>
    `
})

export class NavigationComponent {
    private loggedUser:User;
    private loggedUserIcon:string;

    constructor(private authService:AuthService,private adminGuard: AdminGuard) {
        this.loggedUser = authService.loggedUser;
        this.loggedUserIcon = this.loggedUser.name.charAt(0);
    }
}