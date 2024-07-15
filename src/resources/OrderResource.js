const Resource = require("resources.js");

class OrderResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      cartId: this.cartId,
      addressId: this.addressId,
      orderStatusId: this.orderStatusId,
      promotionId: this.promotionId,
      itemId: this.itemId,
      userId: this.userId,
      quantity: this.quantity,
      deliveryfees: this.deliveryfees,
      totalPrice: this.totalPrice,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      cart: this.Cart
        ? {
            id: this.Cart.id,
            itemId: this.Cart.itemId,
            OE_NO: this.Cart.OE_NO,
            quantity: this.Cart.quantity,
          }
        : null,
      address: this.Address
        ? {
            id: this.Address.id,
            userId: this.Address.userId,
            buildingNo: this.Address.buildingNo,
            floor: this.Address.floor,
            isSave: this.Address.isSave,
            unit: this.Address.unit,
            addressTitle: this.Address.addressTitle,
            street: this.Address.street,
          }
        : null,
      orderStatus: this.OrderStatus
        ? {
            id: this.OrderStatus.id,
            status: this.OrderStatus.status,
            userId: this.OrderStatus.userId,
            user: this.OrderStatus.User
              ? {
                  id: this.OrderStatus.User.id,
                  name: this.OrderStatus.User.name,
                  email: this.OrderStatus.User.email,
                }
              : null,
          }
        : null,
      promotion: this.Promotion
        ? {
            id: this.Promotion.id,
            OE_NO: this.Promotion.OE_NO,
            type: this.Promotion.type,
          }
        : null,
      item: this.Item
        ? {
            id: this.Item.id,
            name: this.Item.name,
            brandName: this.Item.brandName,
            secondCategoryId: this.Item.secondCategoryId,
            mainCategoryId: this.Item.mainCategoryId,
            isFeature: this.Item.isFeature,
            isUniversal: this.Item.isUniversal,
            OE_NO: this.Item.OE_NO,
            price: this.Item.price,
          }
        : null,
      user: this.User
        ? {
            id: this.User.id,
            phone: this.User.phone,
            email: this.User.email,
            status: this.User.status,
            roleId: this.User.roleId,
            role: this.User.Role
              ? {
                  id: this.User.Role.id,
                  name: this.User.Role.name,
                }
              : null,
          }
        : null,
    };
  }
}

module.exports = OrderResource;
