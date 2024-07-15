const Resource = require("resources.js");

class CarItemResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      itemId: this.itemId,
      carId: this.carId,
      item: this.Item
        ? {
            id: this.Item.id,
            name: this.Item.name,
            createdAt: this.Item.createdAt,
            updatedAt: this.Item.updatedAt,
          }
        : null,
      car: this.Car
        ? {
            id: this.Car.id,
            name: this.Car.name,
            createdAt: this.Car.createdAt,
            updatedAt: this.Car.updatedAt,
          }
        : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = CarItemResource;
