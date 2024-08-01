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
            created_at: this.company.created_at,
            updated_at: this.company.updated_at,
          }
        : null,
      serie: this.serie
        ? {
            id: this.serie.id,
            name: this.serie.name,
            created_at: this.serie.created_at,
            updated_at: this.serie.updated_at,
          }
        : null,
      model: this.car_model
        ? {
            id: this.car_model.id,
            name: this.car_model.name,
            created_at: this.car_model.created_at,
            updated_at: this.car_model.updated_at,
          }
        : null,
      year: this.year
        ? {
            id: this.year.id,
            serie_id: this.year.series_id,
            year: this.year.year,
            created_at: this.year.created_at,
            updated_at: this.year.updated_at,
          }
        : null,
      engine: this.engine_power
        ? {
            id: this.engine_power.id,
            engine_power: this.engine_power.enginepower,
            created_at: this.engine_power.created_at,
            updated_at: this.engine_power.updated_at,
          }
        : null,
    };
  }
}

module.exports = CarResource;
