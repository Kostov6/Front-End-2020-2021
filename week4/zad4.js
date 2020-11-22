class Person {
    constructor(salary) {
        this.getSalary = function () {
            return salary;
        }
    }
}

const p1 = new Person(100);
console.log(p1.salary);
console.log(p1.getSalary());