"use strict";
String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};
function activateCanvas() {
    localStorage.removeItem('canvasHTML');
}
function which(click, buttons) {
    for (let i in buttons) {
        let button = buttons[i];
        let bl = button[0];
        let tr = button[1];

        if ((click[0] >= bl[0] && click[0] <= tr[0]) &&
            (click[1] >= bl[1] && click[1] <= tr[1])) {
            return i;
        }
    }

    let distances = Array();

    for (let i in buttons) {
        let button = buttons[i];
        let bl = button[0];
        let tr = button[1];
        if ((click[0] >= bl[0] && click[0] <= tr[0])) {
            distances[i] = Math.min(Math.abs(click[1] - bl[1]), Math.abs(click[1] - tr[1]));
        }
        else if ((click[1] >= bl[1] && click[1] <= tr[1])) {
            distances[i] = Math.min(Math.abs(click[0] - bl[0]), Math.abs(click[0] - tr[0]));
        }
        else {
            distances[i] = Math.sqrt(
                (Math.pow(Math.min(Math.abs(click[0] - bl), Math.abs(click[0] - tr)), 2)) +
                (Math.pow(Math.min(Math.abs(click[1] - bl), Math.abs(click[1] - tr)), 2))
            );

        }
    }

    let min_id = 0;
    for (let j in distances) {
        if (distances[j] < distances[min_id]) {
            min_id = j;
        }
    }

    return min_id;
}
function isCorrectFIO(fio) {
    if (!fio) {
        return false;
    }
    let fioA = fio.split(' ');
    if (fioA.length !== 3) {
        return false;
    }
    for (let i = 0; i < 3; i++) {
        if (/[^-А-Я\x27а-я]/.test(fioA[i])) {
            return false;
        }
    }
    return true;
}

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
    // тут добавил полифилл для более старых браузеров

    function ajaxActions(resp) {
        console.log(resp);
        if(resp.indexOf('<main class="main') > -1){
            console.log(resp);
            let main = document.querySelector('.wrapper');
            main.removeChild(document.querySelector('.main'));
            main.innerHTML += resp;
            let script = document.querySelector('.current_script');
            eval(script.textContent);
            eval(timer());
            eval(setDoneWidth());
            script = '';
        }
        else{
            let objResp = JSON.parse(resp);
            let formErrorsArray = ['userName', 'userSchool', 'userSchoolClass', 'userEmail'];
            let errorsArray = {};
            formErrorsArray.forEach(err => {
                if(objResp[err]){
                    errorsArray[err] = objResp[err];
                }
            });
            for(let item in errorsArray){
                let input = document.querySelector(`input[name=${item}]`);
                if(input){
                    input.classList.add('error');
                    let span = input.parentNode.querySelector('.label-warning');
                    if(span){
                        span.textContent = errorsArray[item];
                        span.classList.add('active');
                    }
                }
            }
        }

    }
    if(window.fetch){
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Query-Type": "ajax/fetch"
            }
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            ajaxActions(data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    else{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Query-Type", "ajax/fetch");
        xhr.onload = function (e) {
            ajaxActions(e.target.response);
        };
        xhr.onerror = error => {
            console.log('произошла ошибка' + error.code)
        };
        xhr.send(data);
    }

}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

function hideElems() {
    const start = document.querySelector('.start');
    const finish = document.querySelector('.finish');
    const final = document.querySelector('.hello-test_final');
    let timerBlockFunc = document.querySelector(".timer[data-finish]");
    let elemControlsArray = [];
    elemControlsArray.push(finish, start);
    let step = document.querySelector('.step');
    let auth = document.querySelector('.authorize');
    let timerSettings = document.querySelector('.hidden.timer_settings');

    if (timerBlockFunc) {
        timerBlockFunc.removeAttribute('data-finally');
        if (!step || !timerSettings) {
            timerBlockFunc.classList.add('displayNone');
        }
        else {
            timerBlockFunc.classList.remove('displayNone');
        }
    }
    elemControlsArray.map(function (elem) {
        if (elem) {
            if (auth || final) {
                elem.classList.add('displayNone');
            }
            else {
                elem.classList.remove('displayNone');
            }
        }
    })
}

function disableSend(elem) {
    elem.dataset.disabled = true;
    let finallyWarning = elem.querySelector('.time-finish');
    if (finallyWarning) {
        finallyWarning.classList.add('active')
    }
}

function check(func, elem) {
    let send = false;
    let checkInterval = setInterval(function () {
        if (document.querySelector(".timer[data-finish]").dataset.finally) {
            send = true;
            clearInterval(checkInterval);
            if (send) {
                func(elem);
            }
        }
    }, 1000);
}

function timer(elem = document.querySelector(".timer[data-finish]")) {
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
            elem.dataset.finally = true;
            clearInterval(timerInterval);
        }
    }, 1000);

}

timer();

function setDoneWidth() {
    let doneSteps = document.querySelectorAll(".progress-step_done");
    let doneLine = document.querySelector(".progress-done__line");
    let slicedDone = [...doneSteps].splice(0, doneSteps.length - 1);
    if (doneSteps && doneLine) {
        let width = 0;
        let minWidth = 0;
        slicedDone.map((ds) => minWidth += ds.clientWidth);
        doneSteps.forEach((ds) => width += ds.clientWidth);
        doneLine.style.minWidth = minWidth + "px";
        doneLine.style.width = width + "px";
    }
}

setDoneWidth();

function init() {
    hideElems();
    timer();
    setDoneWidth();
    let authForm = document.querySelector(".form-authorize");
    if (authForm) {
        let schoolInput = authForm.querySelector("input[name='userSchool']");

        let schoolsURL = schoolInput.dataset.json;
        let schools = {};
        let email = authForm.querySelector('input[name="userEmail"]');
        let emailWarning = authForm.querySelector('.email-warning');
        let formWarning = authForm.querySelector('.form-warning');
        let schoolWarning = authForm.querySelector('.school-warning');
        let fioInput = authForm.querySelector('input[name="userName"]');
        let fioWarning = authForm.querySelector('.fio-warning');
        function schoolsListFunc(datas) {
            schools = datas;
            localStorage.setItem('schoolsTest', JSON.stringify(datas));
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
                                    ev.stopImmediatePropagation();
                                    schoolWarning.classList.remove('active');
                                    e.target.value = ev.target.textContent;
                                    schoolsList.innerHTML = null;
                                    schoolsList.hidden = true;
                                })
                            }
                        }
                    }
                }
            });
        }
        if (window.fetch) {
            fetch(schoolsURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    schoolsListFunc(data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            var request = new XMLHttpRequest();
            request.open('POST', schoolsURL);
            request.responseType = 'json';
            request.onload = function() {
                schoolsListFunc(request.response);
            };
            request.send();
        }



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
            let schoolsTest = JSON.parse(localStorage.getItem('schoolsTest'));
            let schoolsTestArray = [];
            for (let school in schoolsTest) {
                schoolsTestArray.push(schoolsTest[school]);
            }
            let emailCheck = email.value.match(regExpMail);
            let empty = inputs.filter((input) => input.value.length < 1);
            if (empty.length) {
                formWarning.classList.add('active');
                empty.map((empt) => empt.classList.add('error'));
            }
            if (!emailCheck) {
                email.classList.add('error');
                emailWarning.classList.add('active');
            }
            if (!isCorrectFIO(fioInput.value)) {
                fioInput.classList.add('error');
                fioWarning.classList.add('active');
            }
            if (!schoolsTestArray.includes(schoolInput.value)) {
                schoolInput.classList.add('error');
                schoolWarning.classList.add('active');

            }
            if (!empty.length && (emailCheck && isCorrectFIO(fioInput.value) && schoolsTestArray.includes(schoolInput.value))) {
                inputs.forEach((input) => formData.append(input.name, input.value));
                formData.append('action', 'welcome');
                sendAJAX("/diagnostika/index.php", formData);
            }

        });

        document.addEventListener('click', function (e) {
            let closest = e.target.closest('.form-authorize__label') === schoolInput.parentNode;
            let list = document.querySelector('.schools-list');
            if (list && !closest) {
                list.innerHTML = null;
                list.hidden = true;
            }
        })
    }
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


    const stepOne = document.querySelector(".step_one");

    (function stepOneActions(elem = stepOne) {
        if (!elem) {
            return false;
        }
        let list = elem.querySelector(".step_one-list");
        let items = list.querySelectorAll(".step_one-item");
        check(disableSend, elem);
        items.forEach(function (item) {
            let btns = item.querySelectorAll(".step_one-item__button");
            btns.forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    if (elem.dataset.disabled) {
                        return false
                    }
                    item.setAttribute("data-answer", e.target.dataset.answer);
                    btns.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                });
            });
        });

        let stepOneBtn = elem.querySelector(".step_one__button");

        function sendStepOne() {
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

            return true;

        }

        stepOneBtn.addEventListener('click', sendStepOne);
    })();

    const stepTwo = document.querySelector(".step_two");
    (function stepTwoActions(step = stepTwo) {
        if (!step) {
            return false;
        }


        check(disableSend, step);
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
                if (e.target.closest('.step_two').dataset.disabled) {
                    return false
                }
                else {
                    customDrag(thumbUser, range, e);
                }

            });
            thumbMax.addEventListener("mousedown", function (e) {
                if (e.target.closest('.step_two').dataset.disabled) {
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
                let parentRange = e.target.closest('.slider-range__wrap');
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

        stepTwoBtn.addEventListener('click', sendStepTwo);
    })();

    const stepFour = document.querySelector(".step_four");
    (function stepFourActions(elem = stepFour) {
        if (!elem) {
            return false;
        }

        const form = elem.querySelector('.step_four__form');
        let inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.addEventListener('input', function (e) {
            if (elem.dataset.disabled) {
                inputs.forEach(input => input.disabled = true)
            }
        }));
        check(disableSend, elem);

        function sendStepFour() {
            let controls = form.querySelectorAll('input');
            let data = new FormData();
            controls.forEach((cont) => data.append(cont.name, cont.value));
            sendAJAX("https://httpbin.org/post", data);
            return true;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            sendStepFour();
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
        check(disableSend, elem);
        (async function getArray() {
            let response = await fetch(jsonURL);
            let data = await response.json();
            let words = data.words;
            let wordsArr = words.split(', ');
            let resultArray = [];
            let HTMLarray = [];
            let parser = new DOMParser();
            wordsString.addEventListener('mouseup', function (e) {
                if (!elem.dataset.disabled) {
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
                }
            });
        })();

        function sendStepFive() {
            let data = new FormData();
            if (userWords.dataset.find) {
                let userArray = JSON.stringify(userWords.dataset.find.split(','));
                data.append('userFind', userArray);
            }
            else {
                data.append('userFind', []);
            }
            sendAJAX("https://httpbin.org/post", data);
            return true;
        }

        btn.addEventListener('click', sendStepFive);
    })();


    const stepThree = document.querySelector('.step_three');
    (function stepThreeActions(elem = stepThree) {
        if (!elem) {
            return false;
        }
        let controls = elem.querySelectorAll('input');
        controls.forEach(function (input) {
            if (elem.dataset.disabled) {
                input.disabled = true;
            }
            input.addEventListener('input', function () {
                if (elem.dataset.disabled) {
                    controls.forEach(inp => inp.disabled = true)
                }
            })
        });
        check(disableSend, elem);
        let questions = elem.querySelectorAll('.question-wrap');
        let numberInputs = elem.querySelectorAll('.number-input');
        const btn = elem.querySelector('.step_three__button');
        numberInputs.forEach(function (number) {
            number.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').substr(0, 4);
            })
        });
        questions.forEach(function (question) {
            let radios = question.querySelectorAll('input[type="radio"]');
            radios.forEach(function (radio) {
                let label = radio.parentNode;
                label.addEventListener('click', function (e) {
                    let self = this;
                    if (!self.querySelector('input[type="radio"]').disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        radios = [...radios];
                        let noThis = radios.filter(rd => rd.parentNode !== self);
                        noThis.forEach((rad) => rad.checked = false);
                        self.querySelector('input[type="radio"]').checked = !self.querySelector('input[type="radio"]').checked;
                    }
                })
            });
        });

        /// canvas start
        function checkLine(lnM, point, c = 0) {

            if (c < 0 || localStorage.getItem('finishCanvas')) {
                return false
            }
            else {
                lnM.classList.add('active');
                if (point.dataset.outer === "outer") {
                    c++;
                    localStorage.setItem('finishCanvas', true)
                }
                return true;
            }
        }

        let canvasAnswer = elem.querySelector('.question-wrap[data-type="canvas"]');
        let userObj = [];
        let rects = elem.querySelectorAll('.canvas-block');
        let points = elem.querySelectorAll('.canvas-point');
        localStorage.removeItem('finishCanvas');
        let coordsArray = [
            [360, 63], [298, 125], [360, 125], [422, 125], [484, 125], [236, 187], [298, 187], [360, 187], [422, 187]
        ];
        let resT = [
            {x: 360, y: 125, outer: true}, {x: 422, y: 125, outer: true}, {x: 298, y: 187, outer: true},
            {x: 360, y: 187, outer: false}, {x: 422, y: 187, outer: false}, {x: 484, y: 187, outer: true},
            {x: 298, y: 249, outer: true}, {x: 360, y: 249, outer: true}, {x: 422, y: 249, outer: true},
            {x: 298, y: 125, outer: true}, {x: 484, y: 125, outer: true}, {x: 484, y: 249, outer: true}
        ];

        let horizontalArr = [
            [360, 125], [298, 187], [360, 187], [422, 187], [298, 125], [422, 125]
        ];
        let verticalArr = [
            [360, 125], [422, 125], [298, 187], [360, 187], [422, 187], [298, 125], [484, 125]
        ];
        rects.forEach((rect, index) => {
            rect.style.left = coordsArray[index][0] + "px";
            rect.style.top = coordsArray[index][1] + "px";
        });
        points.forEach((point, index) => {
            point.style.left = resT[index].x + "px";
            point.style.top = resT[index].y + "px";
            point.dataset.index = index + 1;
            if (resT[index].outer === true) {
                point.dataset.outer = "outer";
                point.dataset.hover = "true";
            }
            if (resT[index].outer === false) {
                point.dataset.outer = "inner"
            }

        });
        let horizontals = elem.querySelectorAll('.horizont');
        horizontals.forEach((horizont, index) => {
            horizont.style.top = horizontalArr[index][1] + 'px';
            horizont.style.left = horizontalArr[index][0] + 'px';
        });


        let verticals = elem.querySelectorAll('.vertical');
        verticals.forEach((vertical, index) => {
            vertical.style.top = verticalArr[index][1] + 'px';
            vertical.style.left = verticalArr[index][0] + 'px';
        });
        let hovered = elem.querySelectorAll('.canvas-point[data-hover]');
        let pointsElems = elem.querySelectorAll('.canvas-point');
        let clickCounter = 0;
        let finishCounter = 0;

        let lines = elem.querySelectorAll('.canvas-row');
        let objCoord = {
            currentClick: [],
            prevClick: []
        };
        if(localStorage.getItem('canvasHTML')){
            let question  = canvasAnswer.querySelector('.question');
            console.log(question);
            question.removeChild(question.querySelector('.answers'));
            question.innerHTML +=  localStorage.getItem('canvasHTML');
        }
        else {
            pointsElems.forEach(point => {
                if (localStorage.getItem('finishCanvas')) {
                    points.forEach(point => point.removeAttribute('data-hover'))
                }
                point.addEventListener('click', function (e) {
                    clickCounter++;
                    if (!localStorage.getItem('finishCanvas')) {
                        if (point.dataset.hover && clickCounter) {
                            this.classList.add('active');
                            pointsElems.forEach(pi => pi.classList.remove('selected'));
                            this.classList.add('selected');
                            let selected = elem.querySelector('.selected');
                            hovered.forEach(h => h.removeAttribute('data-hover'));
                            let self = this;
                            let osPoints = [];
                            let yPoint = [...pointsElems].filter(pi => (pi.style.left === self.style.left) && (Math.abs(parseInt(pi.style.top) - parseInt(self.style.top))) < 70).filter(pointN => pointN !== self);
                            let xPoint = [...pointsElems].filter(pi => (pi.style.top === self.style.top) && ((Math.abs(parseInt(pi.style.left) - parseInt(self.style.left)) < 70))).filter(pointN => pointN !== self);
                            osPoints = Array(...yPoint, ...xPoint);
                            osPoints.map(op => op.dataset.hover = "true");
                            let top = parseInt(elem.querySelector('.selected').style.top);
                            let left = parseInt(elem.querySelector('.selected').style.left);
                            if (clickCounter === 1) {
                                objCoord.currentClick = [top, left];
                            } else {
                                objCoord.prevClick = [...objCoord.currentClick];
                                objCoord.currentClick = [top, left];
                            }

                            if (objCoord.prevClick.length) {

                                let draw = [...lines].forEach(line => {
                                    if (Math.abs(objCoord.currentClick[0] - objCoord.prevClick[0]) > 1) {
                                        if (objCoord.prevClick[0] - objCoord.currentClick[0] > 0) {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && (parseInt(line.style.left) === objCoord.currentClick[1]) && line.className.includes('vertical')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        }
                                        else {
                                            if (parseInt(line.style.top) === objCoord.prevClick[0] && (parseInt(line.style.left) === objCoord.currentClick[1]) && line.className.includes('vertical')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }

                                            }
                                        }

                                    }
                                    else if (Math.abs(objCoord.currentClick[1] - objCoord.prevClick[1]) > 1) {
                                        if (objCoord.prevClick[1] - objCoord.currentClick[1] < 0) {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && (parseInt(line.style.left) === objCoord.prevClick[1]) && line.className.includes('horizont')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        }
                                        else {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && (parseInt(line.style.left) === objCoord.currentClick[1]) && line.className.includes('horizont')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        }

                                    }
                                });
                            }

                        }
                    }

                })
            });
        }

        //// canvas end
        function sendStepThree() {
            let data = new FormData();
            let jsonData = {};

            let radiosQuestions = elem.querySelectorAll('.question-wrap[data-type="radio"]');
            radiosQuestions.forEach(function (radio) {
                let name = radio.dataset.index;
                let checkedElem = [...radio.querySelectorAll('input[type="radio"]')].filter(r => r.checked);
                if (checkedElem.length) {
                    jsonData[name] = [checkedElem[0].dataset.name];
                }
                else {
                    jsonData[name] = [null];
                }
            });
            let inputQuestions = elem.querySelectorAll('.question-wrap[data-type="input"]');
            inputQuestions.forEach(function (inputQuestion) {
                let name = inputQuestion.dataset.index;
                let input = inputQuestion.querySelector('input[type="text"]');
                if (input.value) {
                    jsonData[name] = [input.value];
                }
                else {
                    jsonData[name] = [null];
                }
            });

            let checkboxQuestions = elem.querySelectorAll('.question-wrap[data-type="checkbox"]');
            checkboxQuestions.forEach(function (check) {
                let name = check.dataset.index;
                let checkedElems = [...check.querySelectorAll('input[type="checkbox"]')].filter(cb => cb.checked);
                if (checkedElems.length) {
                    let ckdArr = [];
                    checkedElems.map(ckd => ckdArr.push(ckd.dataset.name));
                    jsonData[name] = ckdArr;
                }
                else {
                    jsonData[name] = [null];
                }
            });

            let canvas = canvasAnswer.querySelector('.canvas-wrapper');
            let dataTrue = canvas.dataset.true;
            let canvasName = canvasAnswer.dataset.index;
            dataTrue = dataTrue.split(',');
            dataTrue = dataTrue.map(item => Number(item));
            let uObj = [].concat(...userObj);
            uObj = uObj.sort();
            dataTrue = dataTrue.sort();
            if (String(dataTrue) === String(uObj)) {
                jsonData[canvasName] = [true];
            }
            else {
                jsonData[canvasName] = [false];
            }
            let canvasHTML = canvasAnswer.querySelector('.answers').innerHTML;
            localStorage.setItem('canvasHTML', canvasHTML);

            data.append('resultArr', JSON.stringify(jsonData));
            sendAJAX("https://httpbin.org/post", data);
            console.log(jsonData)
        }

        btn.addEventListener('click', sendStepThree)
    })();


    const final =  document.querySelector('.hello-test_final');
    (function finalActions(elem = final){
        if (!elem) {
            return false;
        }
        function setCssDiagram(line, percent, color) {
            line.style.width = percent + '%';
            line.style.backgroundColor = color;
        }
        let diagramsItem = elem.querySelectorAll('.diagram__item');
        diagramsItem.forEach(function (item) {
            let questions = Number(item.dataset.questions);
            let result = Number(item.dataset.result);
            let subLine = item.querySelector('.diagram__item-result');

            switch (result) {
                case 5:
                    setCssDiagram(subLine, 100, '#69A000');
                    break;
                case 4:
                    setCssDiagram(subLine, 80, '#B1CD43');
                    break;
                case 3:
                    setCssDiagram(subLine, 60, '#8FA36A');
                    break;
                case 2:
                    setCssDiagram(subLine, 40, '#8FA36A');
                    break;
                case 1:
                    setCssDiagram(subLine, 20, '#8FA36A');
                    break;
                default:
                    setCssDiagram(subLine, 0, '#8FA36A');
            }
        });
    })();
}

ready(init);