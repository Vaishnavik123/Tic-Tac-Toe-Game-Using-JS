let xname = prompt("Enter the first player's name");
let yname = prompt("Enter the second player's name");

boxes = document.querySelectorAll(".button");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#winner-msg");
let reset = document.querySelector("#reset");
let new_game = document.querySelector("#new-game");
let tie = document.querySelector(".tie-msg");
let turnX = true;
let win = false;

let win_patterns = [
    [0, 1, 2],
    [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const disable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enable = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    msg_container.classList.add("hide");
    tie.classList.add("hide");
    win = false;
}

const showwinner = (pos1) => {
    msg_container.classList.remove("hide");
    if (pos1 == "X") {
        msg.innerText = `Congratulations! \n Winner is ${xname}`;
    } else {
        msg.innerText = `Congratulations! \n Winner is ${yname}`;
    }

    disable();
}

const checkwinner = () => {
    for (let p of win_patterns) {
        let pos1 = boxes[p[0]].innerText;
        let pos2 = boxes[p[1]].innerText;
        let pos3 = boxes[p[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showwinner(pos1);
            return true;
        }
    }
    return false;
}

const showtie = () => {
    tie.classList.remove("hide");
    console.log("Game is a tie!");
}

const checktie = () => {
    if(win===false)
    {
        for(let box of boxes)
        {
            if(box.disabled===false)
            {
                return;
            }
        }
        showtie();
    }
}


for (let box of boxes) {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        win = checkwinner(); 
        checktie(); 
    });
}

reset.addEventListener("click", enable);
new_game.addEventListener("click", enable);
