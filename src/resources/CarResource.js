const Resource = require("resources.js");

class CarResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      company_id: this.company_id,
      series_id: this.series_id,
      model_id: this.model_id,
      year_id: this.year_id,
      engine_id: this.engine_id,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
      company: this.company
        ? {
            id: this.company.id,
            name: this.company.name,
          }
        : null,
      model: this.car_model
        ? {
            id: this.car_model.id,
            name: this.car_model.name,
          }
        : null,
      engine: this.engine_power
        ? {
            id: this.engine_power.id,
            engine_power: this.engine_power.enginepower,
          }
        : null,
    };
  }
}

module.exports = CarResource;
