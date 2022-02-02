'use strict';

var pValues = [];
var dValues = [];
var dTotal = 0;
var pTotal = 0;
var cards = [];
var dealer, player, draw, hold;
var pHold = false;

// prettier-ignore
const CARDS = [ {title: 'herz2', value: 2}, {title: 'karo2', value: 2}, {title: 'kreuz2', value: 2}, {title: 'pik2', value: 2}, 
                {title: 'herz3', value: 3}, {title: 'karo3', value: 3}, {title: 'kreuz3', value: 3}, {title: 'pik3', value: 3}, 
                {title: 'herz4', value: 4}, {title: 'karo4', value: 4}, {title: 'kreuz4', value: 4}, {title: 'pik4', value: 4}, 
                {title: 'herz5', value: 5}, {title: 'karo5', value: 5}, {title: 'kreuz5', value: 5}, {title: 'pik5', value: 5}, 
                {title: 'herz6', value: 6}, {title: 'karo6', value: 6}, {title: 'kreuz6', value: 6}, {title: 'pik6', value: 6}, 
                {title: 'herz7', value: 7}, {title: 'karo7', value: 7}, {title: 'kreuz7', value: 7}, {title: 'pik7', value: 7}, 
                {title: 'herz8', value: 8}, {title: 'karo8', value: 8}, {title: 'kreuz8', value: 8}, {title: 'pik8', value: 8}, 
                {title: 'herz9', value: 9}, {title: 'karo9', value: 9}, {title: 'kreuz9', value: 9}, {title: 'pik9', value: 9}, 
                {title: 'herz10', value: 10}, {title: 'karo10', value: 10}, {title: 'kreuz10', value: 10}, {title: 'pik10', value: 10}, 
                {title: 'herzBube', value: 10}, {title: 'karoBube', value: 10}, {title: 'kreuzBube', value: 10}, {title: 'pikBube', value: 10}, 
                {title: 'herzDame', value: 10}, {title: 'karoDame', value: 10}, {title: 'kreuzDame', value: 10}, {title: 'pikDame', value: 10}, 
                {title: 'herzKönig', value: 10}, {title: 'karoKönig', value: 10}, {title: 'kreuzKönig', value: 10}, {title: 'pikKönig', value: 10}, 
                {title: 'herzAss', value: 11}, {title: 'karoAss', value: 11}, {title: 'kreuzAss', value: 11}, {title: 'pikAss', value: 11}
            ]

window.addEventListener('load', (e) => {
    document.getElementById('start').addEventListener('click', startGame);
    dealer = document.getElementById('dealer_img');
    player = document.getElementById('player_img');
    draw = document.getElementById('draw');
    hold = document.getElementById('hold');
    cards = mix(CARDS);
    draw.addEventListener('click', drawCard);
    hold.addEventListener('click', playerHold);
    window.requestAnimationFrame(refresh);
});

function refresh() {
    console.log('test');
    window.requestAnimationFrame(refresh);
}

function startGame() {
    draw.classList.toggle('show');
    hold.classList.toggle('show');
    document.getElementById('start').classList.toggle('hide');

    cards = drawTwo(cards, dealer, player);

    // while (dTotal <= 16) {
    //     dealerDraw(cards, dealer);
    //     addUpValues();
    // }

    console.log('Dealer: ' + dValues);
    console.log('Player ' + pValues);
}

function mix(list) {
    let mixed = [];
    while (list.length > 0) {
        let random = Math.floor(Math.random() * list.length);
        let write = list.splice(random, 1)[0];
        mixed.push(write);
    }
    // console.log(mixed);
    return mixed;
}

function drawTwo(cards, dealer, player) {
    for (let i = 0; i < 2; i++) {
        let img = document.createElement('img');
        img.src = './img/cards/' + cards[0].title + '.png';
        img.id = 'dImg';
        img.alt = cards[0].title;
        img.width = 150;
        dValues.push(cards[0].value);
        cards.shift();
        dealer.appendChild(img);
    }
    for (let i = 0; i < 2; i++) {
        let img = document.createElement('img');
        img.src = './img/cards/' + cards[0].title + '.png';
        img.alt = cards[0].title;
        img.width = 150;
        pValues.push(cards[0].value);
        cards.shift();
        player.appendChild(img);
    }
    addUpValues();
    return cards;
}

function addUpValues() {
    dTotal = 0;
    pTotal = 0;
    for (let i = 0; i < dValues.length; i++) {
        dTotal += dValues[i];
        document.getElementById('dValue').innerText = dTotal;
    }
    for (let i = 0; i < pValues.length; i++) {
        pTotal += pValues[i];
        document.getElementById('pValue').innerText = pTotal;
    }
    checkValues();
}

function dealerDraw(cards, dealer) {
    let img = document.createElement('img');
    img.src = './img/cards/' + cards[0].title + '.png';
    img.alt = cards[0].title;
    img.width = 150;
    dValues.push(cards[0].value);
    cards.shift();
    dealer.appendChild(img);
}

function drawCard() {
    let img = document.createElement('img');
    img.src = './img/cards/' + cards[0].title + '.png';
    img.alt = cards[0].title;
    img.width = 150;
    pValues.push(cards[0].value);
    cards.shift();
    player.appendChild(img);
    addUpValues();

    if (dTotal <= 16) {
        dealerDraw();
    }
}

function playerHold() {
    pHold = true;
    if (dTotal <= 16) {
        while (dTotal <= 16) {
            dealerDraw(cards, dealer);
            addUpValues();
        }
    } else {
        checkValues();
    }
}

function checkValues() {
    let overlay = document.getElementById('overlay');
    // more then 21
    if (pTotal > 21) {
        overlay.style.display = 'flex';
        let h1 = document.createElement('h1');
        h1.textContent = 'You Lost';
        h1.id = 'loseh1';
        let p = document.createElement('p');
        p.textContent =
            'You Lost, because your total card value was more then 21';
        p.id = 'loseP';
        overlay.appendChild(h1);
        overlay.appendChild(p);
    } // exactly 21
    else if (pTotal == 21) {
        overlay.style.display = 'flex';
        let h1 = document.createElement('h1');
        h1.textContent = 'VICTORY';
        h1.id = 'winh1';
        let p = document.createElement('p');
        p.textContent = 'You got the 21, great Job';
        p.id = 'winP';
        overlay.appendChild(h1);
        overlay.appendChild(p);
    } // closer to 21 then the Dealer
    else if (pTotal > dTotal && pTotal < 21 && dTotal > 16 && dTotal < 21) {
        overlay.style.display = 'flex';
        let h1 = document.createElement('h1');
        h1.textContent = 'Victory';
        h1.id = 'winh1';
        let p = document.createElement('p');
        p.textContent = 'You got closer to 21 then the Dealer, great Job!';
        p.id = 'winP';
        overlay.appendChild(h1);
        overlay.appendChild(p);
    } // Dealer more then 21
    else if (dTotal > 21) {
        overlay.style.display = 'flex';
        let h1 = document.createElement('h1');
        h1.textContent = 'Victory';
        h1.id = 'winh1';
        let p = document.createElement('p');
        p.textContent = 'The Dealer got more then 21';
        p.id = 'winP';
        overlay.appendChild(h1);
        overlay.appendChild(p);
    } // Dealer closer to 21
    else if (dTotal > pTotal && dTotal <= 21 && pHold) {
        overlay.style.display = 'flex';
        let h1 = document.createElement('h1');
        h1.textContent = 'DEFEAT';
        h1.id = 'loseh1';
        let p = document.createElement('p');
        p.textContent = 'The Dealer got closer to 21 then you.';
        p.id = 'loseP';
        overlay.appendChild(h1);
        overlay.appendChild(p);
    }
}
