const Resource = require("resources.js");

class YearResource extends Resource {
  toArray() {
    return {
      id: this.id,
      seriesId: this.seriesId,
      year: this.year,
      serie: this.Series
        ? {
            id: this.Series.id,
            name: this.Series.name,
            createdAt: this.Series.createdAt,
            updatedAt: this.Series.updatedAt,
          }
        : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = YearResource;
