class Cart {
  constructor() {
    this.items = {};
    this.totalQty = 0;
    this.totalPrice = 0;
    this.instructions = "";
  }

  addInstructions = function (inst) {
    this.instructions = inst;
  };

  reduceByOne = function (id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };

  removeItem = function (id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
}

export default Cart;
