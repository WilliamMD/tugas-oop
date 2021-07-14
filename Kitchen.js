const fs = require('fs');
const { Chocolate, Sweet, Strawberry } = require('./Cookies');

class Kitchen {
    constructor(cookies) {
        this.cookies = cookies || [];
    }

    bake(...cookie) {
        let cookies = this.getCookies();
        let id = cookies[cookies.length - 1].id + 1;
        let [name, price, type, isSweet] = cookie;
        switch (type) {
            case 'Chocolate':
                cookies.push(new Chocolate(id, name, price, type, isSweet));
                break;
            case 'Sweet':
                cookies.push(new Sweet(id, name, price, type, isSweet));
                break;
            case 'Strawberry':
                cookies.push(new Strawberry(id, name, price, type, isSweet));
                break;
        }

        this.saveToCSV(cookies);
        console.log(`${name} has been added..`);
    }

    eat(cookieName) {
        let cookies = this.getCookies();

        for (let i = 1; i <= cookies.length; i++) {
            if (cookies[i].name === cookieName) {
                cookies.splice(i, 1);
            }
        }

        this.saveToCSV(cookies);
        console.log(`${cookieName} has been eaten..`);
    }

    addSugar(cookieName) {
        let cookies = this.getCookies();

        cookies.forEach(cookie => {
            if (cookie.name === cookieName) {
                cookie.isSweet = true;
            }
        })

        this.saveToCSV(cookies);
        console.log(`Sugar is added to ${cookieName}`);
    }

    showCookies() {
        let cookies = this.getCookies();
        console.log("Cookie List : ");
        cookies.forEach((cookie) => {
            let { id, name, price, type, isSweet} = cookie;
            console.log(`${id}. ${name}, price: ${price}, type: ${type}, sweet: ${isSweet}`);
        })
    }

    getCookies() {
        let data = fs.readFileSync('./cookies.csv', "utf8");
        let splitData = data.split('\r\n');

        let cookiesArray = [];
        for (let i = 1; i < splitData.length; i++) {
            cookiesArray.push(splitData[i].split(','));
        }

        let cookies = cookiesArray.map(cookie => {
            let [ id, name, price, type, isSweet ] = cookie;

            switch(type) {
                case 'Chocolate':
                    return new Chocolate(+id, name, +price, type, Boolean(isSweet));
                case 'Sweet':
                    return new Sweet(+id, name, +price, type, Boolean(isSweet));
                case 'Strawberry':
                    return new Strawberry(+id, name, +price, type, Boolean(isSweet));                  
            }
        })
        return cookies;
    }

    saveToCSV(cookies) {
        let tempArray = [];
        cookies.forEach(cookie => {
            let {id, name, price, type, isSweet} = cookie;
            tempArray.push([id, name, price, type, isSweet]);
        });

        let data = ['id,name,price,type,isSweet'];
        tempArray.forEach(temp => {
            data.push(temp.join());
        });

        let dataFixed = data.join('\r\n');

        fs.writeFileSync('./cookies.csv', dataFixed);
    }
}

module.exports = Kitchen;