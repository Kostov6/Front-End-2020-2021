class Person {
    constructor(name) {
        this.name = name;
    }
    print() {
        console.log(`Здравей ${this.name} от планетата ${Person.planet}`)
    }
}
Person.planet = "Земя";

const first = new Person("Pesho");
const second = new Person("Gosho");
const third = new Person("Gincho");
first.print();
second.print();
third.print();