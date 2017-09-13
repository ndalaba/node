export class Model {
    id: number;
    brand_id: number;
    name: string;

    constructor(data: any) {
        this.id = data.id;
        this.brand_id = data.brand_id;
        this.name = data.name;
    }
}