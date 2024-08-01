const Resource = require("resources.js");

class OrderResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      cart_id: this.cart_id,
      address_id: this.address_id,
      order_status_id: this.order_status_id,
      promotion_id: this.promotion_id,
      item_id: this.item_id,
      user_id: this.user_id,
      quantity: this.quantity,
      deliveryfees: this.deliveryfees,
      totalprice: this.totalprice,
      created_at: this.created_at,
      updated_at: this.updated_at,
      cart: this.cart
        ? {
            id: this.cart.id,
            itemId: this.cart.item_id,
            OE_NO: this.cart.OE_NO,
            quantity: this.cart.quantity,
          }
        : null,
      address: this.address
        ? {
            id: this.address.id,
            userId: this.address.user_id,
            buildingNo: this.address.buildingNo,
            floor: this.address.floor,
            isSave: this.address.isSave,
            unit: this.address.unit,
            addressTitle: this.address.addressTitle,
            street: this.address.street,
          }
        : null,
      order_status: this.order_status
        ? {
            id: this.order_status.id,
            status: this.order_status.status,
            userId: this.order_status.userId,
          }
        : null,
      promotion: this.promotion
        ? {
            id: this.promotion.id,
            OE_NO: this.promotion.OE_NO,
            type: this.promotion.type,
          }
        : null,
      item: this.item
        ? {
            id: this.item.id,
            name: this.item.name,
            brandName: this.item.brandName,
            second_category_id: this.item.second_category_id,
            main_category_id: this.item.main_category_id,
            is_feature: this.item.is_feature,
            is_universal: this.item.is_universal,
            OE_NO: this.item.OE_NO,
            price: this.item.price,
          }
        : null,
      user: this.user
        ? {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            status: this.user.status,
          }
        : null,
    };
  }
}

module.exports = OrderResource;
