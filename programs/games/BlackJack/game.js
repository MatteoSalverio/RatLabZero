var deck = [
    "Ace", "Ace", "Ace", "Ace",
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
    "Queen", "Queen", "Queen", "Queen",
    "King", "King", "King", "King",
    "Jack", "Jack", "Jack", "Jack"
];

var size = window.innerWidth / 13;

class Card {
    constructor(cardNum) {
        var num = deck[Math.floor(Math.random() * deck.length)];
        this.cardNum = num;
        deck.splice(num, 1);
        this.drawCard(num);
        this.displayCard(num);
        this.addCount(num, false);
    }
    drawCard(num) {
        cards.push(num);
    }
    displayCard(card) {
        if (card == "Ace")
            document.getElementById("cards").innerHTML += "<img class='ace' title='" + card + "' src='cards/ace" + ace + ".png' width='" + size + "px' onclick='swapAce()'> </img>";
        else
            document.getElementById("cards").innerHTML += "<img title='" + card + "' src='cards/" + card + ".png' width='" + size + "px'> </img>";
    }
    addCount(card) {
        if (card == "Queen" || card == "King" || card == "Jack")
            card = 10;
        else if (card == "Ace")
            card = ace;
        count += card;
        output.innerHTML = "Count: " + count;
        if (count > 21)
            bust();
    }
}
class DealerCard extends Card {
    constructor() {
        super();
    }
    drawCard(num) {
        dealerCards.push(num);
    }
    displayCard(card) {
        if (dealerCards.length <= 1)
            document.getElementById("dealerCards").innerHTML += "<img id='hidden' title='Hidden' src='cards/" + "back" + ".png' width='" + size + "px'> </img>"
        else
            document.getElementById("dealerCards").innerHTML += "<img title='" + card + "' src='cards/" + card + ".png' width='" + size + "px'> </img>"
    }
    addCount(card, play) {
        if (card == "Queen" || card == "King" || card == "Jack")
            card = 10;
        else if (card == "Ace")
            card = dealerAce;
        dealerCount += card;
        if (dealerCount > 21)
            dealerBust();
        else if (play)
            dealerTurn();
    }
}

var cards = [];
var dealerCards = [];
var cardObjs = [];
var dealerCardObjs = [];
count = 0;
dealerCount = 0;
var output = document.getElementById("output");
var gameOver = false;
var ace = 1;
var dealerAce = 1;

cardObjs[0] = new Card();
cardObjs[1] = new Card();
dealerCardObjs[0] = new DealerCard();
dealerCardObjs[1] = new DealerCard();

function hit() {
    if (!gameOver)
        cardObjs[cardObjs.length] = new Card();
}
function stand() {
    if (!gameOver) {
        output.innerHTML = "You stood with a score of " + count;
        dealerTurn();
    }
}
function bust() {
    output.innerHTML += ", you bust!";
    showHiddenCard();
    document.getElementById("dealerCount").innerHTML = "Dealer wins with a total of " + dealerCount;
    endRound();
    //dealerTurn();
}
function swapAce() {
    if (ace == 1)
        ace = 11;
    else
        ace = 1;
    console.log("Player Ace is now worth " + ace);
    count = 0;
    var temp = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i] == "Queen" || cards[i] == "King" || cards[i] == "Jack")
            temp = 10;
        else if (cards[i] == "Ace")
            temp = ace;
        else
            temp = cards[i];
        count += temp;
        if (count > 21)
            bust();
    }
    document.getElementById("cards").innerHTML = "";
    for (var i = 0; i < cardObjs.length; i++) {
        cardObjs[i].displayCard(cardObjs[i].cardNum);
    }
    output.innerHTML = "Count: " + count;
}

//Dealer:
function dealerTurn() {
    sleep(200);
    if (dealerCount <= 16) {
        if (dealerAce == 1 && dealerCount + 11 < 21)
            swapDealerAce();
        dealerHit();
    }
    else if (dealerCount > 21) {
        if (dealerAce == 11)
            swapDealerAce();
        if (dealerCount > 21)
            dealerBust();
    }
    else
        dealerStand();
}
function dealerHit() {
    dealerCardObjs[dealerCardObjs.length] = new DealerCard();
    dealerTurn();
}
function dealerStand() {
    document.getElementById("dealerCount").innerHTML = "The dealer stood with a count of " + dealerCount;
    endRound();
}
function dealerBust() {
    document.getElementById("dealerCount").innerHTML = "The dealer bust with a total of " + dealerCount;
    endRound();
}
function swapDealerAce() {
    if (dealerAce == 1)
        dealerAce = 11;
    else
        dealerAce = 1;
    console.log("Dealer Ace is now worth " + dealerAce);
    dealerCount = 0;
    var temp = 0;
    for (var i = 0; i < dealerCards.length; i++) {
        if (dealerCards[i] == "Queen" || dealerCards[i] == "King" || dealerCards[i] == "Jack")
            temp = 10;
        else if (dealerCards[i] == "Ace")
            temp = dealerAce;
        else
            temp = dealerCards[i];
        dealerCount += temp;
        if (dealerCount > 21)
            dealerBust();
    }
}
function showHiddenCard() {
    document.getElementById("hidden").setAttribute("src", "cards/" + dealerCardObjs[0].cardNum + ".png");
}
function endRound() {
    showHiddenCard();
    gameOver = true;
    document.getElementById("buttonLocation").parentNode.removeChild(document.getElementById("buttonLocation"));
    document.getElementById("buttonDiv").innerHTML += "<button type='button' id='refresh' onclick='refresh()' style='width: 180px; height: 50px; font-size: 20px; background-color: Red;'>New Game</button>";
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function refresh() {
    window.location.reload();
}
