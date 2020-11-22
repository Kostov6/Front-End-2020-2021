function recreateTable() {
    let table = document.createElement("table");
    table.setAttribute("style", "width: 100%;");

    let caption = createElCont("caption", "Table captions");

    let tr1 = document.createElement("tr");
    let th1 = createElCont("th", "Evidence <br/> Rating");
    let th2 = createElCont("th", "Effect");
    let th3 = createElCont("th", "Efficiency");
    let th4 = createElCont("th", "Consensus");
    let th5 = createElCont("th", "Comments");
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    tr1.appendChild(th4);
    tr1.appendChild(th5);

    let tr2 = constructTr("A", "Power <br/>Output", "3 Star", "80% <br/>18 students", "Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam! 1");

    let tr3 = constructTr("B", "Weight", "4 Star", "100% <br/>65 students", "Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam! 2");

    table.appendChild(caption);
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);

    document.getElementsByTagName("body")[0].appendChild(table);
}

function createElCont(tag, content) {
    let el = document.createElement(tag);
    el.innerHTML = content;
    return el;
}

function constructTr(evRat, effect, efficiency, consensus, comments) {
    let tr = document.createElement("tr");
    let td1 = createElCont("td", evRat);
    let td2 = createElCont("td", effect);
    let td3 = createElCont("td", efficiency);
    let td4 = createElCont("td", consensus);
    let td5 = createElCont("td", comments);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    return tr;
}

window.addEventListener("load", recreateTable);