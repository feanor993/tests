let sec = parseInt(secEl.textContent);
let min = parseInt(minEl.textContent);
setInterval(function () {
    if (finish <= counter) {
        elem.classList.add("timer_bad");
    }
    if (sec < 10) {
        secEl.innerText = `0${sec}`;
    }
    else {
        secEl.innerText = sec;
    }
    sec++;
    counter++;
    if (sec === 59) {
        min++;
        if (min < 10) {
            minEl.innerText = `0${min}`;
        }
        else {
            minEl.innerText = min;
        }
        sec = 0;
    }
}, 1000);