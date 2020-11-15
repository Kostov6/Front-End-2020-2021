var A = [10, 5, 13, 18, 51];
var B = [];

function printArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

function Task1() {
    console.log("Task 1:");
    printArray(A)
}

function Task2() {
    console.log("Task 2:");
    for (let i = 0; i < A.length; i++) {
        B.push(A[i] * 2);
    }
    printArray(B);
    return B;
}

function Task3() {
    console.log("Task 3:");
    let B = A.filter(function (item) {
        if (item % 2 == 0)
            return true;
        return false;
    });
    printArray(B);
}

function Task4(arr) {
    console.log("Task 4:");
    let condition = arr.filter(function (item) {
        if (item < 10)
            return true;
        return false;
    });
    return condition.length > 0;

}

function Task5() {
    console.log("Task 5:");
    let condition = A.filter(function (item) {
        if (item % 3 == 0)
            return true;
        return false;
    });
    printArray(condition);
    return condition;
}

function Task6() {
    console.log("Task 6:");
    let condition = A.reduce(function (acc, item) {
        acc += item;
        return acc;
    }, 0);
    console.log(condition);
    return condition;
}

function Task7() {
    console.log("Task 7:");
    B = A.slice(A.length - 2);
    printArray(B);

}


Task1();
Task2();
Task3();
console.log(Task4(A));
console.log(Task4(B));
Task5();
Task6();
Task7();