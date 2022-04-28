var word = ""
var table;
var keys;
var wordBank = ["fight", "coder", "flows",
    "class", "seven", "apple", "among", "craft",
    "crime", "depth", "cycle", "fault", "input",
    "pivot", "train", "acute", "zesty", "basic",
    "white", "board", "bored", "broad", "rythm",
    "bowed"]
word = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase()
//document.write(word)
var tries = 6
document.addEventListener('keypress', (event) => {
    var name = event.key.toUpperCase();
    //alert(name)
    ProcessButtons(name)
}, false);
function createTable() {
    var toWrite = ""
    toWrite += ("<table border='1px' id='table'>")
    for (var i = 0; i < 6; i++) {
        toWrite += ("<tr>")
        for (var j = 0; j < 5; j++) {
            toWrite += ("<th id='[" + i + "," + j + "]'> </th>")
        }
        toWrite += ("</tr>")
    }
    toWrite += ("</table>")
    table = document.getElementById("tableDiv")
    table.innerHTML = toWrite;
}
var btns;
function createKeys() {
    var alphabet = "QWERTYUIOPASDFGHJKL3ZXCVBNM4"
    var aCount = 0
    var toWrite = ""
    var w = 10;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < w; j++) {
            var key = alphabet[aCount]
            if (key == "3")
                key = "ENTER"
            else if (key == "4")
                key = "BKSP"
            toWrite += "<button id='" + key + "' class='kb' style='height: 60px; width: 45px'>" + key + "</button>"
            aCount++
        }
        toWrite += "<br>"
        w--
        if (w == 8)
            w++
    }
    keys = document.getElementById("keysDiv")
    keys.innerHTML = toWrite;
    document.getElementById("ENTER").style = "height: 60px; width: 68px"
    document.getElementById("BKSP").style = "height: 60px; width: 68px"
    btns = document.getElementsByClassName("kb")
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var clicked = this.innerHTML
            ProcessButtons(clicked)
        });
    }
}
var guess = ""
var r = 0, c = 0
function ProcessButtons(k) {
    if (guess.length < 5 && k != "ENTER" && k != "BKSP") {
        guess += k
        var placeKey = document.getElementById("[" + r + "," + c + "]")
        placeKey.innerHTML = k
        c++
    }
    else if (k == "BKSP" && c > 0) {
        c--
        guess = guess.substring(0, guess.length - 1)
        var placeKey = document.getElementById("[" + r + "," + c + "]")
        placeKey.innerHTML = ""
    }
    else if (k == "ENTER") {
        ProcessGuess(guess)
        r++
        c = 0
        guess = ""
    }
}
function ProcessGuess(g) {
    SetColors()
    if (g == word)
        alert("You won!")

}
function SetColors() {
    var check
    var count = 0
    var guessWord = ""
    for (var i = 0; i < word.length; i++) {
        check = document.getElementById("[" + r + "," + i + "]")
        guessWord += check.innerHTML
    }
    for (var i = 0; i < word.length; i++) {
        check = document.getElementById("[" + r + "," + i + "]")
        keyCheck = document.getElementById(check.innerHTML)
        if (check.innerHTML == word[i]) {
            check.style = "background-color: green"
            keyCheck.style = "background-color: green; height: 60px; width: 45px;"
            count++
        }
        else if (word.indexOf(check.innerHTML) > -1) {
            check.style = "background-color: darkgoldenrod"
            keyCheck.style = "background-color: darkgoldenrod; height: 60px; width: 45px;"
            count++
        }
        else {
            check.style = "background-color: gray"
            keyCheck.style = "background-color: gray; height: 60px; width: 45px;"
        }
    }
}

createTable()
createKeys()
