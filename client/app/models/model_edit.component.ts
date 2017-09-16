import {Component, OnInit} from '@angular/core';

import {Model, Brand} from '../_models/index';
import {ModelService, Helper, BrandService} from '../_services/index';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Config} from '../_modules/app.config';


@Component({
    selector: 'edit-model',
    templateUrl: './model_edit.component.html'
})

export class Model_editComponent implements OnInit {

    private currentModel: Model;

    private loading: string;
    public options = Config.NOTIFICATION_OPTIONS;
    private app_name: string = Config.APP_NAME;
    private app_icon: string = this.app_name.charAt(0);
    private brands: Array<Brand>;


    constructor(private modelService: ModelService, private brandService: BrandService, private helper: Helper, private _notificationsService: NotificationsService, private route: ActivatedRoute) {
        this.loading = Config.API_ROUTE.loading;
        this.helper.setPageInfo("Enregister un model de véhicule", "Enregister un model de véhicule");
        this.helper.currentMenu("a_collapse_brands");
        this.resetCurrentModel();

    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.helper.toggleLoadding(true);
            this.modelService.findOne(params.get('id')).subscribe(response => {
                if (response.success)
                    this.currentModel = (response.model != null) ? response.model : this.currentModel;
                else this._notificationsService.error('Erreur', response.message);
                this.helper.toggleLoadding(false);
            });

        });

        this.brandService.getListe().subscribe(response => {
            if (response.success) {
                this.brands = response.brands;
            } else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    resetCurrentModel() {
        this.currentModel = new Model({
            id: 0,
            name: '',
            brand_id: 0
        });

    }

    handleSubmit(event: Event) {
        event.preventDefault();
        this.helper.toggleLoadding(true);
        console.log(this.currentModel);
        this.modelService.saveModel(this.currentModel).subscribe(response => {
            this.helper.toggleLoadding(false);
            if (response.success)
                this._notificationsService.success('Succès', response.message);
            else
                this._notificationsService.error('Erreur', response.message);
        });
    }
}