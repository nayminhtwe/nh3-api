const Resource = require("resources.js");

class CarItemResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      itemId: this.itemId,
      carId: this.carId,
      created_at: this.created_at,
      updated_at: this.updated_at,
      item: this.item
        ? {
            id: this.item.id,
            name: this.item.name,
            created_at: this.item.created_at,
            updated_at: this.item.updated_at,
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
            created_at: this.car.created_at,
            updated_at: this.car.updated_at,
          }
        : null,
    };
  }
}

module.exports = CarItemResource;
