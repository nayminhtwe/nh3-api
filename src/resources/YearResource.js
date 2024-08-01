const Resource = require("resources.js");

class YearResource extends Resource {
  toArray() {
    return {
      id: this.id,
      series_id: this.series_id,
      year: this.year,
      created_at: this.created_at,
      updated_at: this.updated_at,
      serie: this.serie
        ? {
            id: this.serie.id,
            name: this.serie.name,
            created_at: this.serie.created_at,
            updated_at: this.serie.updated_at,
          }
        : null,
    };
  }
}

module.exports = YearResource;
