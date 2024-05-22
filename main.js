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

LoadDeck('cards/Periodensystem.json');

console.log(decks);

//references
let titleElement = document.getElementById("title");
let descriptionElement = document.getElementById("description");

let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let nextButton = document.getElementById("nextButton");
let oopsButton = document.getElementById("oopsButton");

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

initialDisplayStates = {
    yesButton: yesButton.style.display,
    noButton: noButton.style.display,
    nextButton: nextButton.style.display,
    oopsButton: oopsButton.style.display
}

nextButtonShowTime = 20000;

//initalize
//hide next button
nextButton.style.display = "none";
oopsButton.style.display = "none";

function LoadDeck(filePath) {
    json = readJSONFromFile(filePath);
    decks.push(new Deck(json.title, json.cards));
}

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
    oopsButton.style.display = "none";
    nextButton.style.display = "none";
}

function showCart(card) {
    titleElement.innerHTML = card.title;
    //clear description so the user can't see the answer
    descriptionElement.innerHTML = "";
    currentCard = card;
}

function falseYes() {
    oopsButton.style.display = "none";
    lastCard.rightGuessesInSuccession = 0;
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
    //show next button and hide yes and no button
    nextButton.style.display = initialDisplayStates.nextButton;
    yesButton.style.display = "none";
    noButton.style.display = "none";
    if (didKnow) {
        oopsButton.style.display = initialDisplayStates.oopsButton;
    }
    lastCardTime = Date.now() / 1000;
}

function next() {
    lastCardTime = 0
}


currentDeck = decks[0];

setInterval(update, 1000);
