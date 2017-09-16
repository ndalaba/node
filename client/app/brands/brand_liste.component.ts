import {Component} from "@angular/core";
import {Brand} from "./../_models/index";
import {BrandService, Helper} from "../_services/index";
import {NotificationsService} from 'angular2-notifications';
import {Config} from "../_modules/app.config";


@Component({
    selector: "brand-list",
    templateUrl: "./brand_liste.component.html"
})

export class Brand_listeComponent {
    private brands: Array<Brand>;
    private brandCount: number;
    public options = Config.NOTIFICATION_OPTIONS;
    private textFilter: string;
    private filtredBrands: Array<Brand>;

    constructor(private brandService: BrandService, private helper: Helper, private _notificationsService: NotificationsService) {
        this.helper.setPageInfo("Liste marques de véhicules", "Liste des marques de véhicules");
        this.helper.currentMenu("a_collapse_brands");
        this.getList();
    }

    filterBrands() {
        this.filtredBrands = this.brands.filter(brand => {
            return brand.name.toLocaleLowerCase().indexOf(this.textFilter.toLocaleLowerCase()) !== -1;
        });
        this.brandCount = this.filtredBrands.length;
    }

    private getList() {
        this.brandService.getListe().subscribe(response => {
            if (response.success) {
                this.brands = response.brands;
                this.filtredBrands = this.brands;
                this.brandCount = this.brands.length;
            } else
                this._notificationsService.error('Erreur', response.message);
        });
    }

    removeBrand(event: Event, brand: Brand) {
        event.preventDefault();
        if (confirm("Supprimer la marque")) {
            this.brandService.removeBrand(brand.id).subscribe(response => {
                if (response.success) {
                    this.getList();
                    this._notificationsService.success('Succès', response.message);
                }

                else
                    this._notificationsService.error('Erreur', response.message);
            });
        }
    }

}