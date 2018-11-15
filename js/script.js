"use strict";

function ready(fn) {
    let bool = (document.attachEvent
        ? document.readyState === "complete"
        : document.readyState !== "loading");
    if (bool) {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function sendAJAX(url, data) {
    fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Query-Type": 'ajax/fetch'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.log(error);
    });
}

function getParents(elem, clName) {
    let parents = [];
    while (elem && elem !== document) {
        elem = elem.parentNode;
        let bool = (elem.className && elem.className.includes(clName));
        if (bool) {
            parents.push(elem);
        }
    }
    return (parents.length
        ? parents[0]
        : false);
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function init() {
    let authForm = document.querySelector(".form-authorize");
    if (authForm) {
        authForm.addEventListener("submit", function (e) {
            e.stopPropagation();
            e.preventDefault();
            let formData = new FormData();
            let inputs = e.target.querySelectorAll("input");
            inputs.forEach((input) => formData.append(input.name, input.value));
            sendAJAX("/diagnostika/index.php", formData);
        });
    }

    function setDoneWidth() {
        let doneSteps = document.querySelectorAll(".progress-step_done");
        let doneLine = document.querySelector(".progress-done__line");
        if (doneSteps && doneLine) {
            let width = 0;
            doneSteps.forEach((ds) => width += ds.clientWidth);
            doneLine.style.width = width + "px";
        }
    }

    setDoneWidth();
    window.addEventListener("resize", setDoneWidth);
    let progressIndexes = document.querySelectorAll(".progress-step__index");
    if (progressIndexes){
        progressIndexes.forEach(function(p) {
            let act = p.parentNode.className.includes("active");
            let done = p.parentNode.className.includes("done");
            let bool = act || done;
            p.addEventListener("click", (e)=> bool ? true : e.preventDefault());
        });
    }
    function timer(elem)  {
        if (elem){
            let counter = 0;
            let finish = parseInt(elem.dataset.finish);
            let secEl = elem.querySelector(".timer__seconds");
            let minEl = elem.querySelector(".timer__minutes");
            let sec = parseInt(secEl.textContent);
            let min = parseInt(minEl.textContent);
            setInterval(function () {
                if (finish <= counter){
                    elem.classList.add("timer_bad");}
                sec < 10 ? secEl.innerText = `0${sec}` : secEl.innerText = sec;
                sec++;
                counter++;
                if (sec === 59) {
                    min++;
                    min < 10 ?minEl.innerText = `0${min}` :minEl.innerText =min;
                    sec = 0;
                }
            }, 1000);
        }
    }
    timer(document.querySelector(".timer[data-finish]"));


    let stepOne = document.querySelector(".step_one");

    function stepOneActions(elem) {
        if (!elem)
            return false;
        let list = elem.querySelector(".step_one-list");
        let items = list.querySelectorAll(".step_one-item");
        items.forEach(item => {
            let btns = item.querySelectorAll(".step_one-item__button");
            btns.forEach(btn => {
                btn.addEventListener("click", function () {
                    item.setAttribute("data-answer", this.dataset.answer);
                    btns.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                })
            })
        });
        let stepOneBtn = elem.querySelector(".step_one__button");
        stepOneBtn.addEventListener("click", function () {
            let unChecked = [...items].filter(item => !item.dataset.answer);
            if (unChecked.length < 1) {
                let data = new FormData();
                items.forEach(item => {
                    let bool;
                    item.dataset.answer === "yes" ? bool = "y" : bool = "n";
                    let textBlock = item.querySelector(".step_one-item__text");
                    let name = textBlock.dataset.name;
                    data.append(name, bool);
                });
                sendAJAX("https://httpbin.org/post", data);
            }
            else {
                let top = unChecked[0].getBoundingClientRect().y;
                let coord;
                top > 0
                    ? (coord = top)
                    : (coord = top * (-1));
                let scrollAnimate = setInterval(() => {
                    if (coord > 0) {
                        top -= 10;
                        document.documentElement.scrollTop = top;
                    } else {
                        clearInterval(scrollAnimate)
                    }
                }, 1)
            }
        })
    }

    stepOneActions(stepOne);


    const stepTwo = document.querySelector(".step_two");

    function stepTwoActions(step) {
        if (!step)
            return false;
        const ranges = step.querySelector(".ranges");
        const rangeElems = step.querySelectorAll(".slider-range");
        const stepTwoBtn = step.querySelector(".step_two__button");
        let parentsRanges = step.querySelectorAll(".slider-range__wrap");
        rangeElems.forEach(range => {
            let thumbUser = range.querySelector(".thumb_user");
            let thumbMax = range.querySelector(".thumb_max");
            thumbUser.addEventListener("mousedown", e => {
                customDrag(thumbUser, range, e)
            });
            thumbMax.addEventListener("mousedown", e => {
                customDrag(thumbMax, range, e)
            });
            thumbUser.ondragstart = () => {
                return false;
            };
            thumbMax.ondragstart = () => {
                return false;
            };
        });

        function customDrag(elem, parent, e) {
            let thumbCoords = getCoords(elem);
            let shiftY = e.pageY - thumbCoords.top;
            let self = elem;
            let percentElem = elem.querySelector(".thumb-count");
            let sliderCoords = getCoords(parent);
            let sliderHeight = parent.clientHeight;
            let thumbData = self.dataset.thumb;
            let thumbBefore =
                parent
                    .querySelector(`.thumb-before[data-thumb="${thumbData}"]`);
            document.onmousemove = function (e) {
                document.documentElement.style.cursor = "grabbing";
                let parentRange = getParents(elem, "slider-range__wrap");
                let elemName = elem.dataset.thumb;
                elem.style.cursor = "grabbing";
                let maxThumb = elem.parentNode.querySelector(".thumb_max");
                maxThumb.classList.add("active");
                let newTop = e.pageY - shiftY - sliderCoords.top;
                if (newTop < 7) {
                    newTop = 7;
                }
                setTimeout(function () {
                    let height = `${sliderHeight - newTop - 12 }px`;
                    thumbBefore.style.height = height;
                }, 10);
                let perText =(sliderHeight - newTop + 10) / sliderHeight * 100;
                let percent = parseInt(perText);
                if (percent < 0) {
                    percent = 0
                }
                if (percent > 100) {
                    percent = 100
                }
                percentElem.textContent = percent.toFixed();
                parentRange.setAttribute(`data-${elemName}`, percent.toFixed());
                if (newTop > sliderHeight - self.clientHeight - 10) {
                    newTop = sliderHeight - self.clientHeight - 5;
                }
                self.style.top = newTop + "px";
                elem.classList.add("animated");
            };
            document.onmouseup = function () {
                document.documentElement.style.cursor = "default";
                elem.style.cursor = "pointer";
                elem.classList.remove("animated");
                document.onmousemove = document.onmouseup = null;

                parentsRanges = [...parentsRanges];

                function selectedIf(e) {
                    return e.getAttribute("data-user") === null
                        || e.getAttribute("data-max") === null
                }

                let noSelRan = parentsRanges.filter(r => selectedIf(r));
                if (noSelRan.length < 1) {
                    stepTwoBtn.disabled = false;
                }
            };
            return false;
        }

        stepTwoBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            let resultArr = [];
            let data = new FormData();
            parentsRanges.forEach(pr => {
                let name = pr.dataset.name;
                let obj = {};
                obj[name] = {
                    user: pr.dataset.user,
                    max: pr.dataset.max
                };
                resultArr.push(obj)
            });
            data.append("resultsArr", JSON.stringify(resultArr));
            data.append("FORMNAME", ranges.dataset.name);
            sendAJAX("https://httpbin.org/post", data);
        })
    }

    stepTwoActions(stepTwo)

}

ready(init);