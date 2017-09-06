import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';

@Injectable()
export class Helper {
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private getRandomNum(lbound: number, ubound: number) {
        return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
    }

    public getPassword(charNumber: number = 12): string {
        let charSet: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[{]}";
        let password: string = "";
        for (var i = 0; i < charNumber; i++) {
            password = password + charSet.charAt(this.getRandomNum(0, charSet.length));
        }
        return password;
    }

    public setPageInfo(title: string, description: string) {
        document.querySelector("#page_title").innerHTML = title;
        document.querySelector("#page_description").setAttribute('content', description);
    }

    public toggleLoadding(show: boolean) {
        if (show)
            document.getElementById("animationload").style.display = "block";
        else
            document.getElementById("animationload").style.display = "none";
    }
}  