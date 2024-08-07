const botWinDialog = ["You are super noob haha 😆",
                    "Huh, You are almost Dead 🤣",
                    "See! I will replace you 😏",
                    "I will conquer Earth HOOMAN 🤣🤣",
                    "I am Superior Hooman! 😈"
];
const playerMoves= ["RockYou.png", "paperYou.webp", "ScissorsYou.png"];
const botMoves = ["RockBot.png", "paperBot.png", "ScissorsBot.png"]
const botLooseDialogue = ["Ughhh! how did you? 🤬" ,
                        "Next Time you are dead buddy! 😤",
                        "I will Win next time UGHH! 😠",
                        "Ugh Not Again! Nooooooo 💢",
                        "No no not this timeee AGHH 🤬"
];

const botDrawDialogue = ["Damn! a Draw Round!",
                        "Again A Draw! Screw You!"
];
let botPoint = 0;
let playerPoint = 0;
let sound = new Audio("bellSound.wav");
let win = new Audio("win.mp3");
let lose = new Audio("lose.mp3");

alert("Whoever Scores 10 First will Win!!!");
const endGameScreen = () => {
    let screen = document.querySelector(".endGame");
    screen.style.visibility = "visible";
    screen.append(document.querySelector(".history"));
    document.querySelector(".history").setAttribute("class", "endScreenHistory");
    document.querySelector(".retry").addEventListener("click", () => {
        location.reload();
    });
}
function showcaseAndHidden(dialogue) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector(".chat-bubble").style.visibility = "hidden";
            resolve();
        }, 2000);
    })
}

async function dialogueShowcase(dialogue, player, bot) {
    console.log(dialogue, player, bot);
    document.querySelector(".chat-bubble").style.visibility = "visible"; 
    document.querySelector(".chat-bubble").innerText = dialogue;
    await showcaseAndHidden(dialogue);
}

const result = (player, bot) => {
    let result = document.createElement("div");
    result.setAttribute("class", "historyElement");
    if((player == 0 && bot == 2) || (player == 1 && bot == 0) || (player == 2 && bot == 1)) {
        playerPoint += 1;
        document.querySelector("#yourPoint").innerText = playerPoint;
        let dialogue = Math.floor(Math.random() * botLooseDialogue.length);
        dialogueShowcase(botLooseDialogue[dialogue]);
    
        result.innerText = "You Won This Round";

        
    } else if ((bot == 0 && player == 2) || (bot == 1 && player == 0) || (bot == 2 && player == 1)) {
        botPoint += 1;
        document.querySelector("#botPoint").innerText = botPoint;
        let dialogue = Math.floor(Math.random() * botWinDialog.length);
        dialogueShowcase(botWinDialog[dialogue]);
        
        result.innerText = "You Lost This Round"
    } else {
        let dialogue = Math.floor(Math.random() * botDrawDialogue.length);
        dialogueShowcase(botDrawDialogue[dialogue]);
        result.innerText = "This round was DRAW!!";
    }
    document.querySelector(".historyElement").after(result);
}

const execute = (playerChoose) => {
    sound.play();
    let botChoose = Math.floor(Math.random() * 3);
    console.log(botChoose);

    document.querySelector("#yourMove").style.backgroundImage = `url("${playerMoves[playerChoose]}")`;
    document.querySelector("#botMove").style.backgroundImage = `url("${botMoves[botChoose]}")`;

    result(playerChoose, botChoose);

    if(playerPoint == 10) {
        console.log("hello")
        document.querySelector(".lost-won").innerText = `You WON!! YOU: ${playerPoint} - ${botPoint} :Bot`;
        win.play();
        endGameScreen();
    } else if(botPoint == 10) {
        console.log("hello")
        document.querySelector(".lost-won").innerText = `You Lost!! YOU: ${playerPoint} - ${botPoint} :Bot`;
        lose.play();
        endGameScreen();
    }
    
}


document.querySelector("#rock").addEventListener("click", ()=> {
    execute(0); // [rock, paper, scissor]
});

document.querySelector("#paper").addEventListener("click", ()=> {
    execute(1); // [rock, paper, scissor]
});

document.querySelector("#scissor").addEventListener("click", ()=> {
    execute(2); // [rock, paper, scissor]
});


