const Resource = require("resources.js");

class ItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      brandName: this.brandName,
      quantity: this.quantity,
      main_category_id: this.main_category_id,
      isFeature: this.is_feature,
      isUniversal: this.is_universal,
      OE_NO: this.OE_NO,
      price: this.price != -1 ? this.price : "****",
      description: this.description,
      main_category: this.main_category && {
        id: this.main_category.id,
        name: this.main_category.name,
      },
      item_images:
        this.item_images &&
        this.item_images.map((image) => ({
          id: image.id,
          item_id: image.item_id,
          path: image.path,
        })),
      cars:
        this.cars &&
        this.cars.map((car) => ({
          id: car.id,
          company: car.company ? car.company.name : null,
          model: car.car_model ? car.car_model.name : null,
          year: car.year,
          eningepower: car.engine_power ? car.engine_power.enginepower : null,
        })),
      discounts:
        this.discounts &&
        this.discounts.map((discount) => ({
          id: discount.id,
          type: discount.discount_type,
          discountValue: discount.discountValue,
          discountAmount: this.price != -1 ? discount.discountAmount : "****",
          discountPrice: this.price != -1 ? discount.discountPrice : "****",
        })),
    };
  }
}

module.exports = ItemResource;
