function process(sColor1, sColor2) {
    let paragraphs = document.getElementsByTagName("p");
    let headerTitles = document.getElementsByClassName("headertitle");

    for (p of paragraphs) {
        p.style.backgroundColor = sColor1;
    }
    for (h of headerTitles) {
        h.style.backgroundColor = sColor2;
    }
    document.title = `${paragraphs.length} параграфа, ${headerTitles.length}
        елемента с клас < headertitle > `;

}

function processWithPar() {
    process("red", "green");
}

window.onload = processWithPar;