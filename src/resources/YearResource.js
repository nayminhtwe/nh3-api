const Resource = require("resources.js");

class YearResource extends Resource {
  toArray() {
    return {
      id: this.id,
      company_id: this.company_id,
      year: this.year,
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
    };
  }
}

module.exports = YearResource;
