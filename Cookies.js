class Cookies {
    constructor(id, name, price, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
    }
}

class Chocolate extends Cookies {
    constructor(id, name, price, type, isSweet) {
        super(id, name, price, type);
        this.isSweet = isSweet || false;
    }
}

class Sweet extends Cookies {
    constructor(id, name, price, type, isSweet) {
        super(id, name, price, type);
        this.isSweet = isSweet || false;
    }
}

class Strawberry extends Cookies {
    constructor(id, name, price, type, isSweet) {
        super(id, name, price, type);
        this.isSweet = isSweet || false;
    }
}

module.exports = {
    Chocolate, Sweet, Strawberry
}