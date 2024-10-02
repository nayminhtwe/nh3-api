const Resource = require("resources.js");

class CarItemResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      item_id: this.item_id,
      car_id: this.car_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      item: this.item
        ? {
            id: this.item.id,
            name: this.item.name,
          }
        : null,
      car: this.car
        ? {
            id: this.car.id,
            company_id: this.car.company_id,
            series_id: this.car.series_id,
            model_id: this.car.model_id,
            year_id: this.car.year_id,
            engine_id: this.car.engine_id,
            description: this.car.description,
          }
        : null,
    };
  }
}

module.exports = CarItemResource;
