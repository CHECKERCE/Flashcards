function readJSONFromFile(path) {
    //this is javascript in html
    var request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

let decks = [];

json = readJSONFromFile('cards/Strukturmodelle.json');
decks.push(new Deck(json.title, json.cards));

console.log(decks);

//references
let titleElement = document.getElementById("title");
let descriptionElement = document.getElementById("description");

let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let undoButton = document.getElementById("undoButton");

let notiFicationSound = new Audio("sounds/notification.wav");

//variables
let currentDeck = null;
let currentCard = null;

let lastCard = null;
lastCardRightGuessesInSuccession = null;

let timeBetweenCards = {min: 60, max: 300};
let lastCardTime = 0;

let answered = true;
let lastAnswer = null;

let timeOutsToClear = [];
initialDisplayStates = {
    yesButton: yesButton.style.display,
    noButton: noButton.style.display,
    undoButton: undoButton.style.display
}

undoButtonShowTime = 20000;

//initalize
//hide undo button
undoButton.style.display = "none";

function update() {
    if (currentDeck === null) {
        //no deck selected
        console.log("no deck selected");
        return;
    }
    if (!answered)
        return;

    if (lastCardTime + timeBetweenCards.min < Date.now() / 1000) {
        //show next card
        showNextCard();
        notiFicationSound.play();
        answered = false;
        lastCardTime = Date.now() / 1000;
    }
}

function showNextCard() {
    //get random card from all cards with the lowest rightGuessesInSuccession
    let cards = currentDeck.cards;
    let lowestCount = 0;
    let lowestCountCards = [];
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].rightGuessesInSuccession < lowestCount) {
            lowestCount = cards[i].rightGuessesInSuccession;
            lowestCountCards = [];
            lowestCountCards.push(cards[i]);
        } else if (cards[i].rightGuessesInSuccession === lowestCount) {
            lowestCountCards.push(cards[i]);
        }
    }
    let randomCard = lowestCountCards[Math.floor(Math.random() * lowestCountCards.length)];
    //show card
    showCart(randomCard);
    //show yes and no button
    yesButton.style.display = initialDisplayStates.yesButton;
    noButton.style.display = initialDisplayStates.noButton;
    clearTimeouts();
}

function clearTimeouts() {
    for (let i = 0; i < timeOutsToClear.length; i++) {
        clearTimeout(timeOutsToClear[i]);
    }
    timeOutsToClear = [];
    undoButton.style.display = "none";
}

function showCart(card) {
    titleElement.innerHTML = card.title;
    //clear description so the user can't see the answer
    descriptionElement.innerHTML = "";
    currentCard = card;
}

function answer(didKnow) {
    if (currentCard === null) {
        //no card selected
        console.log("no card selected");
        return;
    }
    if (didKnow) {
        currentCard.rightGuessesInSuccession++;
    } else {
        currentCard.rightGuessesInSuccession = 0;
    }
    //show description
    descriptionElement.innerHTML = currentCard.description;
    answered = true;
    lastAnswer = didKnow;
    lastCardRightGuessesInSuccession = currentCard.rightGuessesInSuccession;
    lastCard = currentCard;
    currentCard = null;
    //show undo button for 10 seconds and hide yes and no button
    undoButton.style.display = initialDisplayStates.undoButton;
    yesButton.style.display = "none";
    noButton.style.display = "none";
    timeOutsToClear.push(setTimeout(function () {
        undoButton.style.display = "none";
    }, undoButtonShowTime));
}

function undo() {
    if (lastCard === null) {
        //no card selected
        console.log("no card selected");
        return;
    }
    //undo count update to last card
    if (lastAnswer) {
        lastCard.rightGuessesInSuccession--;
    } else {
        lastCard.rightGuessesInSuccession = lastCardRightGuessesInSuccession;
    }
}

currentDeck = decks[0];

setInterval(update, 1000);