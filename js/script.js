"use strict";
String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

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
            "Query-Type": "ajax/fetch"
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
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

function hideElems(){
    const start = document.querySelector('.start');
    const finish  = document.querySelector('.finish');
    let timerBlockFunc = document.querySelector(".timer[data-finish]");
    let elemControlsArray = [];
    elemControlsArray.push(finish, start);
    let step = document.querySelector('.step');
    let auth =  document.querySelector('.authorize');
    if (timerBlockFunc){
        if(!step){
            timerBlockFunc.classList.add('displayNone');
        }
        else {
            timerBlockFunc.classList.remove('displayNone');
        }
    }
    elemControlsArray.map(function (elem) {
        if(elem){
            if(auth){
                elem.classList.add('displayNone');
            }
            else {
                elem.classList.remove('displayNone');
            }
        }
    })
}


function init() {
    const timerBlock = document.querySelector(".timer[data-finish]");
    // window.onbeforeunload = function() {
    //     return "Вы действительно хотите уйти с сайта?";
    // };
    hideElems();
    function check(func) {
        let send = false;
        let checkInterval = setInterval(function () {
            if (timerBlock.dataset.finally) {
                send = true;
                clearInterval(checkInterval);
                if (send) {
                    func();
                }
            }
        }, 1000);
    }

    let authForm = document.querySelector(".form-authorize");
    if (authForm) {
        let schoolInput = authForm.querySelector("input[name='userSchool']");
        let schoolsURL = schoolInput.dataset.json;
        let schools = {};
        fetch(schoolsURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
            schools = data;
            let schoolsList = document.createElement("ul");
            schoolsList.classList.add("schools-list");
            schoolsList.hidden = true;
            let label = schoolInput.parentNode;
            label.appendChild(schoolsList);
            schoolInput.addEventListener("input", function (e) {
                let val = e.target.value;
                schoolsList.innerHTML = null;
                if (val.length > 0) {
                    for (let item in schools) {
                        if (typeof schools[item] === "string") {
                            let incVal = schools[item].includes(val);
                            let incCap = schools[item].includes(val.capitalize());
                            if (incVal || incCap) {
                                if (schoolsList.hidden) {
                                    schoolsList.hidden = false;
                                }
                                let li = document.createElement("li");
                                li.textContent = schools[item];
                                schoolsList.appendChild(li);
                                li.addEventListener("click", function (ev) {
                                    ev.stopPropagation();
                                    ev.stopImmediatePropagation();
                                    e.target.value = ev.target.textContent;
                                    schoolsList.innerHTML = null;
                                    schoolsList.hidden = true;
                                })
                            }
                        }
                    }
                }
            });
        })
            .catch(function (error) {
                console.log(error);
            });
        let inputs = authForm.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                let empty = Array.from(inputs).filter((input) => input.value.length < 1);
                this.classList.remove('error');
                if (!empty.length) {
                    formWarning.classList.remove('active');
                }
            })
        });
        let email = authForm.querySelector('input[name="userEmail"]');
        let emailWarning = authForm.querySelector('.email-warning');
        let formWarning = authForm.querySelector('.form-warning');
        let regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email.addEventListener('input', function () {
            if (!(email.value.match(regExpMail))) {
                this.classList.add('error');
                emailWarning.classList.add('active')
            }
            else {
                this.classList.remove('error');
                emailWarning.classList.remove('active')
            }
        });
        authForm.addEventListener("submit", function (e) {
            e.stopPropagation();
            e.preventDefault();
            let formData = new FormData();
            inputs = Array.from(inputs);
            let empty = inputs.filter((input) => input.value.length < 1);
            if (empty.length) {
                formWarning.classList.add('active');
                empty.map((empt) => empt.classList.add('error'));
            }
            if (!(email.value.match(regExpMail))) {
                email.classList.add('error');
                emailWarning.classList.add('active')
            }
            if (!empty.length && (email.value.match(regExpMail))) {
                inputs.forEach((input) => formData.append(input.name, input.value));
                sendAJAX("https://httpbin.org/post", formData);
            }

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
    if (progressIndexes) {
        progressIndexes.forEach(function (p) {
            let act = p.parentNode.className.includes("active");
            let done = p.parentNode.className.includes("done");
            let bool = act || done;
            p.addEventListener("click", (e) => bool ? true : e.preventDefault());
        });
    }


    (function timer(elem = timerBlock) {
        let timerCounterBlock = document.querySelector('.timer_settings.hidden');
        if (!elem || !timerCounterBlock) {
            return false;
        }
        let secEl = elem.querySelector(".timer__seconds");
        let minEl = elem.querySelector(".timer__minutes");
        let finish = parseInt(timerCounterBlock.dataset.timer);

        let minutes = Math.floor(finish / 60);
        let seconds = finish % 60;
        let minutesText = String(minutes >= 10 ? minutes : '0' + minutes);
        let secondsText = String(seconds >= 10 ? seconds : '0' + seconds);
        minEl.textContent = minutesText;
        secEl.textContent = secondsText;
        let timerInterval = setInterval(function () {
            seconds--;
            if ((seconds === 0 || seconds < 0) && minutes > 0) {
                seconds = 59;
                minutes--;
                secEl.innerText = seconds;
                if (minutes < 10) {
                    minEl.innerText = `0${minutes}`;
                }
                else {
                    minEl.innerText = minutes;
                }
            }
            else if (seconds < 10 && seconds !== 0) {
                secEl.innerText = `0${seconds}`;
            }
            else {
                secEl.innerText = seconds;
            }
            if (seconds <= 59 && minutes < 1) {
                elem.classList.add("timer_bad");
            }
            if (seconds < 1 && minutes < 1) {
                secEl.innerText = `0${seconds}`;
                timerBlock.dataset.finally = true;
                clearInterval(timerInterval);

            }
        }, 1000);

    })();

    const stepOne = document.querySelector(".step_one");

    (function stepOneActions(elem = stepOne) {
        if (!elem) {
            return false;
        }
        let list = elem.querySelector(".step_one-list");
        let items = list.querySelectorAll(".step_one-item");

        check(sendStepOne, elem);
        items.forEach(function (item) {
            let btns = item.querySelectorAll(".step_one-item__button");
            btns.forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    item.setAttribute("data-answer", e.target.dataset.answer);
                    btns.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                });
            });
        });
        let stepOneBtn = elem.querySelector(".step_one__button");

        function sendStepOne() {
            if (!elem.dataset.disabled) {
                items = Array.from(items);
                let data = new FormData();
                items.forEach(function (item) {
                    let bool = (item.dataset.answer === "yes" ? "y" : "n");
                    let textBlock = item.querySelector(".step_one-item__text");
                    let name = textBlock.dataset.name;
                    if (item.dataset.answer) {
                        data.append(name, bool);
                    }
                    else {
                        data.append(name, null);
                    }

                });
                sendAJAX("https://httpbin.org/post", data);
            }
            return true;

        }

        stepOneBtn.addEventListener('click', function () {
            if (timerBlock.dataset.finally) {
                console.log('Ваше время истекло');
                return false;
            }
            else {
                sendStepOne();
            }
        });
    })();

    const stepTwo = document.querySelector(".step_two");
    (function stepTwoActions(step = stepTwo) {
        if (!step) {
            return false;
        }
        check(sendStepTwo, step);
        const ranges = step.querySelector(".ranges");
        const rangeElems = step.querySelectorAll(".slider-range");
        const stepTwoBtn = step.querySelector(".step_two__button");
        let parentsRanges = step.querySelectorAll(".slider-range__wrap");
        rangeElems.forEach(function (range) {
            let thumbUser = range.querySelector(".thumb_user");
            let thumbMax = range.querySelector(".thumb_max");
            let parent = range.parentNode.parentNode;
            let max = parent.querySelector('.thumb_max');
            let dataset = parent.dataset;
            max.classList.add('active');
            let keys = Object.keys(dataset);
            keys.map(key => setValue(key));

            function setValue(val) {
                let data = parent.dataset[val];
                if (val !== 'name' && data) {
                    let thumb = parent.querySelector(`.thumb_${val}`);
                    let before = parent.querySelector(`.thumb-before_${val}`);
                    let count = thumb.querySelector('.thumb-count');
                    count.textContent = Number(data);
                    before.style.height = data * 0.93 + "%";
                    thumb.style.bottom = before.getBoundingClientRect().height + "px";
                }
            }

            thumbUser.addEventListener("mousedown", function (e) {
                if (getParents(thumbUser, 'step_two').dataset.disabled) {
                    return false
                }
                else {
                    customDrag(thumbUser, range, e);
                }

            });
            thumbMax.addEventListener("mousedown", function (e) {
                if (getParents(thumbUser, 'step_two').dataset.disabled) {
                    return false
                }
                else {
                    customDrag(thumbMax, range, e);
                }
            });
            thumbUser.ondragstart = function () {
                return false;
            };
            thumbMax.ondragstart = function () {
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
                    thumbBefore.style.height = `${sliderHeight - newTop - 12 }px`;
                }, 10);
                let perText = (sliderHeight - newTop + 10) / sliderHeight * 100;
                let percent = parseInt(perText);
                if (percent < 0) {
                    percent = 0;
                }
                if (percent > 100) {
                    percent = 100;
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
                document.onmousemove = null;
                parentsRanges = Array.from(parentsRanges);

                function selectedIf(e) {
                    return e.getAttribute("data-user") === null
                        || e.getAttribute("data-max") === null;
                }

                let noSelRan = parentsRanges.filter((r) => selectedIf(r));
                if (noSelRan.length < 1) {
                    stepTwoBtn.disabled = false;
                }
            };
            return false;
        }

        function sendStepTwo() {
            if (!step.dataset.disabled) {
                let resultArr = [];
                let data = new FormData();
                parentsRanges.forEach(function (pr) {
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
            }
            return true;
        }

        stepTwoBtn.addEventListener('click', function () {
            if (timerBlock.dataset.finally) {
                console.log('Ваше время истекло');
                return false
            }
            else {
                sendStepTwo()
            }
        });
    })();

    const stepFour = document.querySelector(".step_four");
    (function stepFourActions(elem = stepFour) {
        if (!elem) {
            return false;
        }
        const form = elem.querySelector('.step_four__form');
        check(sendStepFour, elem);

        function sendStepFour() {
            if (!elem.dataset.disabled) {
                let controls = form.querySelectorAll('input');
                let data = new FormData();
                controls.forEach((cont) => data.append(cont.name, cont.value));
                sendAJAX("https://httpbin.org/post", data);
            }
            return true;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (timerBlock.dataset.finally) {
                console.log('Ваше время истекло');
                return false;
            }
            else {
                sendStepFour();
            }
        });
    })();

    const stepFive = document.querySelector(".step_five");
    (function stepFiveActions(elem = stepFive) {
        if (!elem) {
            return false;
        }
        let wordsString = elem.querySelector('.words-string');
        let content = elem.querySelector('.step_five__content');
        let jsonURL = content.dataset.json;
        let userWords = elem.querySelector('.user-words__words');
        let wordsCount = elem.querySelector('.user-words__count span');
        let btn = elem.querySelector('.step_five__button');
        (async function getArray() {
            let response = await fetch(jsonURL);
            let data = await response.json();
            let words = data.words;
            let wordsArr = words.split(', ');
            let resultArray = [];
            let HTMLarray = [];
            let parser = new DOMParser();
            wordsString.addEventListener('mouseup', function (e) {
                let selection = window.getSelection().toString();
                if (wordsArr.includes(selection) && !resultArray.includes(selection)) {
                    resultArray.push(selection);
                    HTMLarray = resultArray.map(elem => `<span> ${ elem}</span>`);
                }
                userWords.setAttribute('data-find', String(resultArray));
                userWords.innerHTML = parser.parseFromString(HTMLarray, "text/html").body.innerHTML;
                wordsCount.textContent = resultArray.length;
                if (wordsArr.length === resultArray.length) {
                    console.log("Ура, все слова найдены!");
                }

            });
        })();

        check(sendStepFive, elem);

        function sendStepFive() {
            if (!elem.dataset.disabled) {
                let data = new FormData();
                if (userWords.dataset.find) {
                    let userArray = JSON.stringify(userWords.dataset.find.split(','));
                    data.append('userFind', userArray);
                }
                else {
                    data.append('userFind', []);
                }
                sendAJAX("https://httpbin.org/post", data);
            }
            return true;
        }

        btn.addEventListener('click', function () {
            if (timerBlock.dataset.finally) {
                console.log('Ваше время истекло');
                return false;
            }
            else {
                sendStepFive()
            }
        });
    })();



    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let coordsArray = [
      [360, 63], [308, 115], [360, 115], [412, 115], [464, 115], [256, 167], [308, 167], [360, 167], [412, 167]
    ];
    coordsArray.map(coord => {
        ctx.beginPath();
        ctx.lineWidth="10";
        ctx.strokeStyle="#B1CD43";
        ctx.rect(coord[0],coord[1],40,40);
        ctx.fillStyle = "#F6F5F5";
        ctx.stroke();
        ctx.stroke();
    });
    canvas.addEventListener('click', function (e) {
        const mousePos = {
            x: e.clientX - canvas.offsetTop,
            y: e.clientY - canvas.offsetLeft
        };
        console.log([e.clientX - canvas.offsetTop, e.clientY - canvas.offsetLeft])
    })



}

ready(init);