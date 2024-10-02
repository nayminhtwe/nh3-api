const Resoucre = require("resources.js");

class AddressResource extends Resoucre {
  toArray() {
    return {
      id: this.id,
      app_user_id: this.app_user_id,
      buildingNo: this.buildingNo,
      floor: this.floor,
      isSave: this.isSave,
      unit: this.unit,
      addressTitle: this.addressTitle,
      street: this.street,
      created_at: this.created_at,
      updated_at: this.updated_at,
      app_user: this.app_user
        ? {
            id: this.app_user.id,
            name: this.app_user.name,
          }
        : null,
    };
  }
}

module.exports = AddressResource;
