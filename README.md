# Flashcarts

This is a website that helps you learn by showing you flashcards. It's a work in progress, but it's already pretty useful.

## How to use
right now, you can only add cards by putting them in a json file. The format is as follows:

```json
{
    "cards": [
        {
            "title": "title1",
            "description": "description1",
            "rightGuessesInSuccession": 0
        },
        {
            "title": "title2",
            "description": "description2",
            "rightGuessesInSuccession": 0
        },
        {
            "title": "title3",
            "description": "description3",
            "rightGuessesInSuccession": 0
        }
    ]
}
```

the `rightGuessesInSuccession` field is used to determine how many times you have to get the card right in a row before it is removed from the deck. If you get it wrong, it is reset to 0.

these are saved in the file to keep track of your progress.

this is very much a work in progress, i want to latter add an interface to add cards, and decks, and to save and load decks.