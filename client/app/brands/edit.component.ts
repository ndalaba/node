import {Component, OnInit} from '@angular/core';

import {Brand} from '../_models/index';
import {BrandService, Helper} from '../_services/index';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Config} from '../_modules/app.config';


@Component({
    selector: 'edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {

    private currentBrand: Brand;

    private loading: string;
    public options = Config.NOTIFICATION_OPTIONS;
    private app_name: string = Config.APP_NAME;
    private app_icon: string = this.app_name.charAt(0);


    constructor(private brandService: BrandService, private helper: Helper, private _notificationsService: NotificationsService, private route: ActivatedRoute) {
        this.loading = Config.API_ROUTE.loading;
        this.helper.currentMenu("a_collapse_brands");
        this.resetCurrentBrand();

    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.helper.toggleLoadding(true);
            this.brandService.findOne(params.get('id')).subscribe(response => {
                if (response !== null)
                    this.currentBrand = response;
                this.helper.toggleLoadding(false);
            });

        });
    }

    resetCurrentBrand() {
        this.currentBrand = new Brand({
            id: 0,
            name: '',
        });

    }

    handleSubmit(event: Event) {
        event.preventDefault();
        this.helper.toggleLoadding(true);
        this.brandService.saveBrand(this.currentBrand).subscribe(response => {
            this.helper.toggleLoadding(false);
            if (response.success)
                this._notificationsService.success('Succès', response.message);
            else
                this._notificationsService.error('Erreur', response.message);
        });
    }
}