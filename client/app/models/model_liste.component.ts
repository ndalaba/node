import {Component, OnInit} from "@angular/core";
import {Model, Brand} from "./../_models/index";
import {ModelService, Helper, BrandService} from "../_services/index";
import {NotificationsService} from 'angular2-notifications';
import {Config} from "../_modules/app.config";


@Component({
    selector: "model-list",
    templateUrl: "./model_liste.component.html"
})

export class Model_listeComponent implements OnInit {
    private models: Array<Model>;
    private modelCount: number;
    public options = Config.NOTIFICATION_OPTIONS;
    private textFilter: string;
    private filtredModels: Array<Model>;
    private brands: Array<Brand>;
    private currentBrand: Brand;

    constructor(private modelService: ModelService, private brandService: BrandService, private helper: Helper, private _notificationsService: NotificationsService) {
        this.helper.setPageInfo("Liste models", "Liste des models");
        this.helper.currentMenu("a_collapse_brands");
        this.currentBrand = new Brand({id: 0, name: ''});
        this.getListe();
    }

    filterModels() {
        this.filtredModels = this.models.filter(model => {
            return model.name.toLocaleLowerCase().indexOf(this.textFilter.toLocaleLowerCase()) !== -1;
        });
        this.modelCount = this.filtredModels.length;
    }

    ngOnInit() {
        this.brandService.getListe().subscribe(response => {
            if (response.success) {
                this.brands = response.brands;
            } else
                this._notificationsService.error('Erreur', response.message);
        });

    }

    private getListe() {
        this.modelService.getListe().subscribe(response => {
            if (response.success) {
                this.models = response.models;
                this.filtredModels = this.models;
                this.modelCount = this.models.length;
            } else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    byBrand(event: Event) {
        event.preventDefault();
        this.modelService.byBrand(this.currentBrand.id).subscribe(response => {
            if (response.success) {
                this.models = response.models;
                this.filtredModels = this.models;
                this.modelCount = this.models.length;
            }
            else this._notificationsService.error('Erreur', response.message);
        });
    }

    removeModel(event: Event, model: Model) {
        event.preventDefault();
        if (confirm("Supprimer le model")) {
            this.modelService.removeModel(model.id).subscribe(response => {
                if (response.success) {
                    this.getListe();
                    this._notificationsService.success('Succès', response.message);
                }

                else
                    this._notificationsService.error('Erreur', response.message);
            });
        }
    }

}