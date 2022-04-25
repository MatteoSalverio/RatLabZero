var wordI = ""
var table;
var wordBank = ["fight", "coder", "flows",
    "class", "seven", "apple", "among", "craft",
    "crime", "depth", "cycle", "fault", "input"]
wordI = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase()
//document.write(wordI)
var label = document.getElementById("label");
label.innerHTML = "Enter a " + wordI.length + " letter word"
textBox = document.getElementById("myInput")
var tries = 6
function writeInp(text) {
    for (var i = 0; i < 6; i++) {
        if (document.getElementById("[" + i + ",0]").innerHTML != " ")
            continue;
        for (var j = 0; j < text.length; j++) {
            var loc = document.getElementById("[" + i + "," + j + "]");
            loc.innerHTML = text[j];
            if (text[j] == wordI[j]) {
                loc.style = "background-color: greenyellow;"
            }
            else if (wordI.indexOf(text[j]) > -1) {
                loc.style = "background-color: orange;"
            }
            else {
                loc.style = "background-color: red;"
            }
        }
        break;
    }
}
var inputVal = ""
function getInputValue() {
    inputVal = document.getElementById("myInput").value;
    writeInp(inputVal.toUpperCase())
    textBox.value = ""
    return inputVal
}
document.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        Game()
    }
});
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
function Game(word) {
    word = wordI
    var won = false
    if (tries > 0) {
        var answer = ""
        tries -= 1
        answer = getInputValue().toUpperCase()
        if (answer == word) {
            won = true
            tries = 0
        }
    }//if (tries > 0)
    if (won) {
        //alert("You won!")
        console.log("You won!")
    }
    else if (tries == 0) {
        var finish = document.getElementById("finish");
        finish.innerHTML = "The word was " + word
        alert("Better luck next time!")
    }
}//Game

createTable()
