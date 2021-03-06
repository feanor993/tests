String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};
let regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function activateCanvas() {
    localStorage.removeItem('canvasHTML');
    localStorage.removeItem('finishCanvas');
}

function sendForm(form, url, self) {
    let controls = form.querySelectorAll('input');
    let data = new FormData();
    controls.forEach((cont) => data.append(cont.name, cont.value));
    fetchData(url, data, self);
    return true;
}

function removeEmptyWarnings(form) {
    let inputs = Array.from(form.querySelectorAll("input")).filter(i => !i.disabled);
    let formWarning = form.querySelector('.form-warning');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let empty = Array.from(inputs).filter((input) => input.value.length < 1);
            this.classList.remove('error');
            if (!empty.length) {
                formWarning.classList.remove('active');
            }
        })
    });
}

function validateEmpty(form) {
    let inputs = form.querySelectorAll("input");
    inputs = Array.from(inputs).filter(item => !item.disabled);
    let formWarning = form.querySelector('.form-warning');
    let empty = inputs.filter((input) => input.value.length < 1);
    if (empty.length) {
        formWarning.classList.add('active');
        empty.map((empt) => empt.classList.add('error'));
        return false;
    } else {
        return true
    }
}

function validateEmail(email, emailWarning) {
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
    return email.value.match(regExpMail);
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

function fetchData(url, data, self) {
    fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Query-Type": "ajax/fetch"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (self && data.result === true) {
            let href = self.querySelector('.form-authorize__submit').dataset.redirect;
            if (href) {
                location.href = href;
            }
        }
        if (!self && typeof data.result === "object") {
            location.reload()
        }
        console.log(data)
    })
        .catch(function (error) {
            console.log(error);
        });
}

function sendAJAX(url, data) {
    // тут добавил полифилл для более старых браузеров

    function ajaxActions(resp) {
        console.log(resp);
        if (resp.indexOf('<main class="main') > -1) {
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
        else {
            let objResp = JSON.parse(resp);
            let formErrorsArray = ['userName', 'userSchool', 'userSchoolClass', 'userEmail'];
            let errorsArray = {};
            formErrorsArray.forEach(err => {
                if (objResp[err]) {
                    errorsArray[err] = objResp[err];
                }
            });
            for (let item in errorsArray) {
                let input = document.querySelector(`input[name=${item}]`);
                if (input) {
                    input.classList.add('error');
                    let span = input.parentNode.querySelector('.label-warning');
                    if (span) {
                        span.textContent = errorsArray[item];
                        span.classList.add('active');
                    }
                }
            }
        }

    }

    if (window.fetch) {
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
    else {
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
    const result = document.querySelector('.result');
    const admin = document.querySelector('.admin');
    const exit = document.querySelector('.exit');
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
            if (auth || final || result || admin) {
                elem.classList.add('displayNone');
            }
            else {
                elem.classList.remove('displayNone');
            }
            if (exit && !admin) {
                exit.style.display = "none";
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
    if (!document.querySelector(".timer[data-finish]")) {
        return false
    } else {
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
    window.addEventListener("resize", setDoneWidth);

    const authForm = document.querySelector('.form-authorize');
    (function authFormActions(elem = authForm) {
        if (!elem) {
            return false;
        }
        removeEmptyWarnings(elem);
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmpty(this)) {
                let data = new FormData();
                let inputs = this.querySelectorAll('input');
                inputs.forEach(input => data.append(input.name, input.value));
                sendAJAX("https://httpbin.org/post", data);
            }
        })
    })();

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
            thumbUser.addEventListener("touchstart", function (e) {
                if (e.target.closest('.step_two').dataset.disabled) {
                    return false
                }
                else {
                    customDrag(thumbUser, range, e);
                }

            });
            thumbMax.addEventListener("touchstart", function (e) {
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

            function mouseMoveD(e) {
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
                if (parentRange) {
                    parentRange.setAttribute(`data-${elemName}`, percent.toFixed());
                }

                if (newTop > sliderHeight - self.clientHeight - 10) {
                    newTop = sliderHeight - self.clientHeight - 5;
                }
                self.style.top = newTop + "px";
                elem.classList.add("animated");
            }

            function mouseUpD() {
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
            }

            document.onmousemove = function (e) {
                mouseMoveD(e)
            };
            document.ontouchmove = function (e) {
                mouseMoveD(e)
            }

            document.onmouseup = function () {
                mouseUpD()
            };
            document.ontouchend = function () {
                mouseUpD()
            }
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

        if (stepTwoBtn) {
            stepTwoBtn.addEventListener('click', sendStepTwo);
        }

    })();

    var stepFour = document.querySelector(".step_four");
    (function stepFourActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepFour;

        if (!elem) {
            return false;
        }

        var list = elem.querySelector('.people-list');
        var items = elem.querySelectorAll('.people');
        var results = elem.querySelectorAll('.step_four__input');
        var textes = [];
        var btn = elem.querySelector('.step_four__button');
        items.forEach(function (item) {
            var txt = item.querySelector('.people-name').textContent;
            textes.push(txt);
            item.addEventListener('click', function (e) {
                e.preventDefault();
                if (this.dataset.disable || elem.dataset.disable) {
                    return false;
                }
                var input = this.querySelector('input');
                input.checked = false;
                this.classList.add('dn');
                var text = this.querySelector('.people-name').textContent;
                var dId = this.querySelector('.people-name').dataset.id;

                var selected = this.parentNode.parentNode.querySelector('.step_four__input');
                var createEl = '\n                  <div class="people-sel" data-id="' + dId + '">\n                            <div class="people-sel__text">' + text + '</div>\n                            <div class="people-sel__delete"></div>\n                        </div>\n                ';
                selected.innerHTML += createEl;
            });
        });
        results.forEach(function (result) {
            result.addEventListener('click', function (ev) {
                var self = this;
                if (this.dataset.disable || elem.dataset.disable) {
                    return false;
                }
                if (!ev.target.closest('.people-sel')) {
                    results.forEach(function (r) {
                        return r.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    if (!result.parentNode.querySelector('.people-list')) {
                        list.style.display = "block";
                        result.parentNode.appendChild(list);
                    } else {
                        result.parentNode.querySelector('.people-list').style.display = "block";
                    }

                    items = Array.from(items);
                    var value = this.dataset.value.split(',');
                    var hidden = [];
                    items.map(function (item) {
                        if (value.includes(item.querySelector('.people-name').textContent)) {
                            hidden.push(item);
                        }
                    });
                    items.map(function (i) {
                        return i.classList.remove('dn');
                    });
                    hidden.map(function (h) {
                        return h.classList.add('dn');
                    });
                    var myItems = self.querySelectorAll('.people-sel');
                    myItems.forEach(function (item) {
                        var text = item.querySelector('.people-sel__text').textContent;
                        if (textes.includes(text)) {
                            var dnItems = Array.from(self.parentNode.querySelectorAll('li .people-name')).filter(function (item) {
                                return item.textContent === text;
                            });
                            if (dnItems.length) {
                                dnItems.map(function (item) {
                                    item.parentNode.classList.add('dn');
                                });
                            }
                        }
                    });
                } else {
                    var elementToDel = ev.target.closest('.people-sel');
                    var parent = elementToDel.parentNode;
                    var text = elementToDel.querySelector('.people-sel__text').textContent;
                    parent.removeChild(elementToDel);
                    var selectedArray = self.dataset.value.split(',');
                    var myList = self.parentNode.querySelector('.people-list');
                    var iskEl = Array.from(myList.querySelectorAll('li')).filter(function (item) {
                        return item.querySelector('.people-name').textContent === text;
                    });
                    if (iskEl) {
                        iskEl[0].classList.remove('dn');
                    }

                    if (selectedArray.includes(text)) {
                        selectedArray.splice(selectedArray.indexOf(text), 1);
                        self.dataset.value = selectedArray;
                    }
                }
            });
        });
        document.addEventListener('click', function (e) {
            var _this = this;

            if (!(e.target.closest('.people-list') || e.target.closest('.step_four__input'))) {
                console.log(111);
                if (elem) {
                    results.forEach(function (result) {
                        return result.classList.remove('selected');
                    });
                    list.style.display = "none";
                    items.forEach(function (item) {
                        item.classList.remove('dn');
                        var input = _this.querySelector('input');
                        if (input) {
                            input.checked = false;
                        }
                    });
                }
            }
        });
        btn.addEventListener('click', function () {
            var data = new FormData();
            results.forEach(function (result) {
                var name = result.dataset.name;
                var selected = [];
                var items = result.querySelectorAll('.people-sel__text');
                items.forEach(function (item) {
                    selected.push(item.parentNode.dataset.id);
                });
                data.append(name, JSON.stringify(selected));
            });
            fetchData("https://httpbin.org/post", data);
        });

        check(disableStepFour, elem);

        function disableStepFour() {
            items.forEach(function (item) {
                return item.dataset.disable = true;
            });
            results.forEach(function (result) {
                return result.dataset.disable = true;
            });
            var lists = elem.querySelectorAll('.people-list');
            lists.forEach(function (l) {
                return l.style.display = "none";
            });
        }
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

        function wordsFunc(datas) {
            let words = datas.words;
            let wordsArr = words.split(', ');
            let resultArray = [];
            let HTMLarray = [];
            let parser = new DOMParser();

            function mouseUpSel() {
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
            }

            wordsString.addEventListener('mouseup', mouseUpSel);
            wordsString.addEventListener('touchend', mouseUpSel)
        }

        if (window.fetch) {
            (async function getArray() {
                let response = await fetch(jsonURL);
                let data = await response.json();
                wordsFunc(data);

            })();
        }
        else {
            var request = new XMLHttpRequest();
            request.open('GET', jsonURL);
            request.responseType = 'json';
            request.onload = function () {
                wordsFunc(request.response)
            };
            request.send();
        }

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
        console.log(111)
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
        let clearBtn = elem.querySelector('.clear-canvas');
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
        if (localStorage.getItem('canvasHTML')) {
            let question = canvasAnswer.querySelector('.question');
            question.removeChild(question.querySelector('.answers'));
            question.innerHTML += localStorage.getItem('canvasHTML');
            question.querySelector('.clear-canvas').classList.remove('active');

        }
        else {
            pointsElems.forEach(point => {
                if (localStorage.getItem('finishCanvas')) {
                    points.forEach(point => point.removeAttribute('data-hover'));
                }
                point.addEventListener('click', function (e) {
                    if (elem.dataset.disabled) {
                        return false;
                    }
                    clearBtn.classList.add('active');
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
        /// clear canvas

        clearBtn.addEventListener('click', function () {
            this.classList.remove('active');
            userObj = [];
            this.classList.remove('active');
            let lines = [...horizontals, ...verticals];
            lines.map((line) => line.classList.remove('active'));
            localStorage.removeItem('finishCanvas');
            clickCounter = 0;
            objCoord = {
                currentClick: [],
                prevClick: []
            };
            points.forEach((point, index) => {
                points.forEach((p) => p.classList.remove("active"));
                if (resT[index].outer === true) {
                    point.setAttribute('data-hover', true);
                }
                if (resT[index].outer === false) {
                    point.removeAttribute('data-hover');
                    point.dataset.outer = "inner"
                }
            });
        });

        // end clear canvas
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


    const final = document.querySelector('.hello-test_final');
    (function finalActions(elem = final) {
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

        let finalForm = elem.querySelector('.final-item-form__form');
        let email = elem.querySelector('input[name="e-mail"]');
        let emailWarning = elem.querySelector('.email-warning');
        validateEmail(email, emailWarning);
        removeEmptyWarnings(elem);
        finalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmail(email, emailWarning) && validateEmpty(this)) {
                let inputs = Array.from(this.querySelectorAll('input'));
                let data = new FormData();
                inputs.map(input => data.append(input.name, input.value));
                sendAJAX("https://httpbin.org/post", data);
            }
        })


    })();

    const enterForm = document.querySelector('.enter-form');
    (function enterActions(elem = enterForm) {
        if (!elem) {
            return false;
        }
        removeEmptyWarnings(elem);
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmpty(this)) {
                sendForm(this, "https://httpbin.org/post", e.target)
            }
        })

    })();

    const createUser = document.querySelector('.create-user');
    (function createUserActions(elem = createUser) {
        if (!elem) {
            return false;
        }
        removeEmptyWarnings(elem);
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmpty(this)) {
                sendForm(this, "https://httpbin.org/post")
            }
        })

    })();

    const editUser = document.querySelector('.edit-user');
    (function editUserActions(elem = editUser) {
        if (!elem) {
            return false;
        }
        let email = elem.querySelector('input[name="e-mail"]');
        let emailWarning = elem.querySelector('.email-warning');
        validateEmail(email, emailWarning);
        removeEmptyWarnings(elem);
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmail(email, emailWarning) && validateEmpty(this)) {
                let inputs = Array.from(this.querySelectorAll('input')).filter(i => !i.disabled);
                let id = this.querySelector('input[name="id"]');
                let data = new FormData();
                inputs.map(input => data.append(input.name, input.value));
                data.append('id', id.value);
                sendAJAX("https://httpbin.org/post", data);
            }
        });

    })();

    const editTable = document.querySelector('.edit-table-wrap');

    (function editTableActions(elem = editTable) {
        if (!elem) {
            return false
        }
        let selectedArray = [];
        let controls = elem.querySelectorAll('.radio-label');
        let conrolsLen = controls.length;
        let deleteDtn = elem.querySelector('.delete-btn');
        let deletePopup = elem.querySelector('.delete-popup');
        let closePopup = elem.querySelectorAll('.delete-popup__undo, .overlay, .delete-popup__close');
        let deleteSubmit = elem.querySelector('.delete-popup__delete');
        let tableRows = elem.querySelectorAll('.edit-table__body tr');

        tableRows.forEach(row => {
            row.addEventListener('click', function (e) {
                if (!(e.target.classList.contains('select-td') || e.target.classList.contains('result-td') || e.target.parentNode.classList.contains('result-td'))) {
                    if (this.dataset.href) {
                        location.href = this.dataset.href;
                    }
                }
            });
        });

        controls.forEach(control => {
            control.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                this.querySelector('input').checked = !this.querySelector('input').checked;
                if (this.parentNode.tagName === "TD") {
                    let id = e.target.closest('tr').dataset.id;
                    if (selectedArray.includes(id)) {
                        selectedArray.splice(selectedArray.indexOf(id), 1)
                    } else {
                        selectedArray.push(id)
                    }
                    if (conrolsLen === selectedArray.length + 1) {
                        elem.querySelector('th input').checked = true;
                    } else {
                        elem.querySelector('th input').checked = false;
                    }
                } else if (this.parentNode.tagName === "TH") {
                    if (this.querySelector('input').checked) {
                        selectedArray = [];
                        controls.forEach(item => {
                            item.querySelector('input').checked = true;
                            let id = item.parentNode.parentNode.dataset.id;
                            if (id) {
                                selectedArray.push(id)
                            }
                        });
                    } else {
                        selectedArray = [];
                        controls.forEach(item => item.querySelector('input').checked = false);
                    }
                }
                selectedArray.length ? deleteDtn.disabled = false : deleteDtn.disabled = true;
            })
        });
        deleteDtn.addEventListener('click', () => {
            deletePopup.classList.add('active');
            document.documentElement.style.overflow = "hidden"
        });
        closePopup.forEach(el => {
            el.addEventListener('click', function () {
                deletePopup.classList.remove('active');
                document.documentElement.style.overflow = "auto"
            })
        });
        deleteSubmit.addEventListener('click', function () {
            let data = new FormData();
            data.append('delete-lines', JSON.stringify(selectedArray));
            fetchData("https://httpbin.org/post", data);
        });


    })();

    const editGroup = document.querySelector('.edit-group__form');

    (function editGroupActions(elem = editGroup) {
        if (!elem) {
            return false
        }
        let email = elem.querySelector('input[name="e-mail"]');
        let emailWarning = elem.querySelector('.email-warning');
        validateEmail(email, emailWarning);
        removeEmptyWarnings(elem);
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            validateEmpty(this);
            if (validateEmpty(this) && validateEmail(email, emailWarning)) {
                sendForm(this, this.action)
            }
        })
    })()

}

ready(init);