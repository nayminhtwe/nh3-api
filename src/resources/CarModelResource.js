const Resource = require("resources.js");

class CarModelResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      company_id: this.company_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      company: this.company
        ? {
            id: this.company.id,
            name: this.company.name,
          }
        : null,
    };
  }
}

module.exports = CarModelResource;
