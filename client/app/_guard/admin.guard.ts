import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser && (loggedUser.roles==="ROLE_ADMIN")) {
            return true;
        }
        return false;
    }
}