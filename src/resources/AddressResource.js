const Resoucre = require("resources.js");

class AddressResource extends Resoucre {
  toArray() {
    return {
      id: this.id,
      user_id: this.user_id,
      buildingNo: this.buildingNo,
      floor: this.floor,
      isSave: this.isSave,
      unit: this.unit,
      addressTitle: this.addressTitle,
      street: this.street,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user: this.user
        ? {
            id: this.user.id,
            name: this.user.name,
          }
        : null,
    };
  }
}

module.exports = AddressResource;
