class Item {
    constructor(name, discount) {
        this.name = name;
        this.discount = discount;
        this.value = 1000;
    }
    getBaseValue() {
        return this.value;
    }

    getValue() {
        return this.value * (1 - (this.discount / 100));
    }
}
const item1 = new Item("ball", 40);
console.log(item1.getValue());