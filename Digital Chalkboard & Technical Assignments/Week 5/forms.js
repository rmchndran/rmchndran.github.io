
function verify() {
    const numeric = document.getElementById("numberverify").value;
    const tocheck = parseInt(numeric);
    if (!isNaN(tocheck) && tocheck >= 10000 && tocheck <= 99999) {
        const Even = tocheck % 2 == 0;
        document.getElementById("result").innerText = `Your submission [${tocheck}] is ${Even ? "even":"odd"}`;
    } else {
        document.getElementById("result").innerText = `Bad Luck, Pal! Read the instructions and try again.`
        numeric = "Try Again!"
    }
}

function verify_question() {
    const nonnumeric = document.getElementById("answerverify").value.trim();
    const answer = document.getElementById("triviaresult");
    const right = "Martin Van Buren";
    if (nonnumeric.toLowerCase() === right.toLowerCase()) {
        answer.textContent = `Verrukkelijk! ${nonnumeric} was the right answer.`;
    } else {
        answer.textContent = `Unfortunately, that's not the right answer.`;
    }
}