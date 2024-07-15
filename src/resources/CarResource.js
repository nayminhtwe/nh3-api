const Resource = require("resources.js");

class CarResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      companyId: this.companyId,
      seriesId: this.seriesId,
      modelId: this.modelId,
      yearId: this.yearId,
      engineId: this.engineId,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      company: this.Company
        ? {
            id: this.Company.id,
            name: this.Company.name,
            createdAt: this.Company.createdAt,
            updatedAt: this.Company.updatedAt,
          }
        : null,
      serie: this.Series
        ? {
            id: this.Series.id,
            name: this.Series.name,
            createdAt: this.Series.createdAt,
            updatedAt: this.Series.updatedAt,
          }
        : null,
      model: this.CarModel
        ? {
            id: this.CarModel.id,
            name: this.CarModel.name,
            createdAt: this.CarModel.createdAt,
            updatedAt: this.CarModel.updatedAt,
          }
        : null,
      year: this.Year
        ? {
            id: this.Year.id,
            year: this.Year.year,
            createdAt: this.Year.createdAt,
            updatedAt: this.Year.updatedAt,
          }
        : null,
      engine: this.Engine
        ? {
            id: this.Engine.id,
            enginepower: this.Engine.enginepower,
            createdAt: this.Engine.createdAt,
            updatedAt: this.Engine.updatedAt,
          }
        : null,
    };
  }
}

module.exports = CarResource;
