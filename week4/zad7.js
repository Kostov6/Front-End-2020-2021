function addButton() {
    const button = document.createElement("button");
    button.innerHTML = "Swap rows"
    button.addEventListener("click", function () {
        let rows = document.getElementsByTagName("tr");
        let row1 = rows[1];
        let row2 = rows[2];
        row1.remove();
        row2.remove();

        let table = document.getElementsByTagName("table")[0];
        table.appendChild(row2);
        table.appendChild(row1);
    });

    document.getElementsByTagName("body")[0].appendChild(button);
}

window.addEventListener("load", addButton);