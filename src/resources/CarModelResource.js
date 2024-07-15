const Resource = require("resources.js");

class CarModelResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      companyId: this.companyId,
      company: this.Company
        ? {
            id: this.Company.id,
            name: this.Company.name,
            createdAt: this.Company.createdAt,
            updatedAt: this.Company.updatedAt,
          }
        : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = CarModelResource;
