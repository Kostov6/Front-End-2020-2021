var dates = [];
var numDaysInMonth = [];
var saturdayOrSunday = [];
var merged = [];

var dateCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function printArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

function Task1() {
    console.log("Task 1:");
    let currDate = new Date(Date.now());
    dates.push(currDate);
    console.log(currDate);
}

function Task2() {
    console.log("Task 2:");
    let newDate = new Date(2018, 11, 8, 21, 0, 0);
    dates.push(newDate);
    console.log(newDate);
}

function Task3() {
    numDaysInMonth = dates.map(function (item) {
        return dateCount[item.getMonth()];
    });
    saturdayOrSunday = dates.map(function (item) {
        return item.getDay();
    });
}

function convert(date) {
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

function Task4() {
    console.log("Task 4");
    for (let i = 0; i < dates.length; i++) {
        let date = convert(dates[i]); //.toLocaleDateString();
        let hour = dates[i].toLocaleString().split(" ")[1];
        let numDays = numDaysInMonth[i];
        let day = saturdayOrSunday[i] == 0 ? "неделя" : "събота";
        let string = `Дата: ${date}, час: ${hour}, ${day}, ${numDays} дни`;
        merged.push(string);
    }
    printArray(merged);
}

Task1();
Task2();
Task3();
Task4();