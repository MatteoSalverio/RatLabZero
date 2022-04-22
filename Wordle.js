var wordI = ""
var wordBank = ["Tencza", "Ness", "fight", "coder", "flows", 
                "class", "seven", "apple", "among", "craft",
                "crime", "depth", "cycle", "fault", "input"]
wordI = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase()
var label = document.getElementById("label");
label.innerHTML = "Enter a " + wordI.length + " letter word"
var tries = 5
function writeln(text) {
    var out = document.getElementById("out");
    var outT = out.textContent + text + "."
    outT = outT.replace(".", " | ")
    out.innerHTML = outT
    console.log(outT)
}
function writeInp(text) {
    var out = document.getElementById("inp");
    var outT = out.textContent + text + "."
    outT = outT.replace(".", " | ")
    out.innerHTML = outT
}
var inputVal = ""
function getInputValue() {
    inputVal = document.getElementById("myInput").value;
    writeInp(inputVal.toUpperCase())
    return inputVal
}
function Game(word) {
    word = wordI
    var won = false
    if (tries > 0) {
        var answer = ""
        tries -= 1
        var triesDisplay = document.getElementById("tries")
        triesDisplay.innerHTML = tries + " tries left"
        answer = getInputValue().toUpperCase()
        if (answer == word) {
            writeln(answer)
            won = true
            tries = 0
        }
        else {
            var output = ""
            for (var i = 0; i < answer.length; i++) {
                if (answer[i] == word[i])
                    output += answer[i]
                else {
                    var found = false
                    for (var j = 0; j < answer.length; j++) {
                        if (answer[i] == word[j]) {
                            if (!found) {
                                output += "*"
                                found = true
                            }
                        }
                    }
                    if (!found)
                        output += "#"
                }
            }
            writeln(output)
        }
    }//if (tries > 0)
    if (won)
        alert("You won!")
    else if (tries == 0) {
        var finish = document.getElementById("finish");
        finish.innerHTML = "The word was " + word
        alert("Better luck next time!")
    }
}//Game
