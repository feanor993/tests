'use strict';

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }

            return step("next");
        });
    };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

function activateCanvas() {
    localStorage.removeItem('canvasHTML');
    localStorage.removeItem('finishCanvas');
}

function which(click, buttons) {
    for (var i in buttons) {
        var button = buttons[i];
        var bl = button[0];
        var tr = button[1];

        if (click[0] >= bl[0] && click[0] <= tr[0] && click[1] >= bl[1] && click[1] <= tr[1]) {
            return i;
        }
    }

    var distances = Array();

    for (var _i in buttons) {
        var _button = buttons[_i];
        var _bl = _button[0];
        var _tr = _button[1];
        if (click[0] >= _bl[0] && click[0] <= _tr[0]) {
            distances[_i] = Math.min(Math.abs(click[1] - _bl[1]), Math.abs(click[1] - _tr[1]));
        } else if (click[1] >= _bl[1] && click[1] <= _tr[1]) {
            distances[_i] = Math.min(Math.abs(click[0] - _bl[0]), Math.abs(click[0] - _tr[0]));
        } else {
            distances[_i] = Math.sqrt(Math.pow(Math.min(Math.abs(click[0] - _bl), Math.abs(click[0] - _tr)), 2) + Math.pow(Math.min(Math.abs(click[1] - _bl), Math.abs(click[1] - _tr)), 2));
        }
    }

    var min_id = 0;
    for (var j in distances) {
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
    var fioA = fio.split(' ');
    if (fioA.length !== 3) {
        return false;
    }
    for (var i = 0; i < 3; i++) {
        if (/[^-А-Я\x27а-я]/.test(fioA[i])) {
            return false;
        }
    }
    return true;
}

function ready(fn) {
    var bool = document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading";
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
        if (resp.indexOf('<main class="main') > -1) {
            console.log(resp);
            var main = document.querySelector('.wrapper');
            main.removeChild(document.querySelector('.main'));
            main.innerHTML += resp;
            var script = document.querySelector('.current_script');
            eval(script.textContent);
            eval(timer());
            eval(setDoneWidth());
            script = '';
        } else {
            var objResp = JSON.parse(resp);
            var formErrorsArray = ['userName', 'userSchool', 'userSchoolClass', 'userEmail'];
            var errorsArray = {};
            formErrorsArray.forEach(function (err) {
                if (objResp[err]) {
                    errorsArray[err] = objResp[err];
                }
            });
            for (var item in errorsArray) {
                var input = document.querySelector('input[name=' + item + ']');
                if (input) {
                    input.classList.add('error');
                    var span = input.parentNode.querySelector('.label-warning');
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
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Query-Type", "ajax/fetch");
        xhr.onload = function (e) {
            ajaxActions(e.target.response);
        };
        xhr.onerror = function (error) {
            console.log('произошла ошибка' + error.code);
        };
        xhr.send(data);
    }
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

function hideElems() {
    var start = document.querySelector('.start');
    var finish = document.querySelector('.finish');
    var final = document.querySelector('.hello-test_final');
    var timerBlockFunc = document.querySelector(".timer[data-finish]");
    var elemControlsArray = [];
    elemControlsArray.push(finish, start);
    var step = document.querySelector('.step');
    var auth = document.querySelector('.authorize');
    var timerSettings = document.querySelector('.hidden.timer_settings');

    if (timerBlockFunc) {
        timerBlockFunc.removeAttribute('data-finally');
        if (!step || !timerSettings) {
            timerBlockFunc.classList.add('displayNone');
        } else {
            timerBlockFunc.classList.remove('displayNone');
        }
    }
    elemControlsArray.map(function (elem) {
        if (elem) {
            if (auth || final) {
                elem.classList.add('displayNone');
            } else {
                elem.classList.remove('displayNone');
            }
        }
    });
}

function disableSend(elem) {
    elem.dataset.disabled = true;
    var finallyWarning = elem.querySelector('.time-finish');
    if (finallyWarning) {
        finallyWarning.classList.add('active');
    }
}

function check(func, elem) {
    var send = false;
    var checkInterval = setInterval(function () {
        if (document.querySelector(".timer[data-finish]").dataset.finally) {
            send = true;
            clearInterval(checkInterval);
            if (send) {
                func(elem);
            }
        }
    }, 1000);
}

function timer() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector(".timer[data-finish]");

    var timerCounterBlock = document.querySelector('.timer_settings.hidden');
    if (!elem || !timerCounterBlock) {
        return false;
    }
    var secEl = elem.querySelector(".timer__seconds");
    var minEl = elem.querySelector(".timer__minutes");
    var finish = parseInt(timerCounterBlock.dataset.timer);

    var minutes = Math.floor(finish / 60);
    var seconds = finish % 60;
    var minutesText = String(minutes >= 10 ? minutes : '0' + minutes);
    var secondsText = String(seconds >= 10 ? seconds : '0' + seconds);
    minEl.textContent = minutesText;
    secEl.textContent = secondsText;
    var timerInterval = setInterval(function () {
        seconds--;
        if ((seconds === 0 || seconds < 0) && minutes > 0) {
            seconds = 59;
            minutes--;
            secEl.innerText = seconds;
            if (minutes < 10) {
                minEl.innerText = '0' + minutes;
            } else {
                minEl.innerText = minutes;
            }
        } else if (seconds < 10 && seconds !== 0) {
            secEl.innerText = '0' + seconds;
        } else {
            secEl.innerText = seconds;
        }
        if (seconds <= 59 && minutes < 1) {
            elem.classList.add("timer_bad");
        }
        if (seconds < 1 && minutes < 1) {
            secEl.innerText = '0' + seconds;
            elem.dataset.finally = true;
            clearInterval(timerInterval);
        }
    }, 1000);
}

timer();

function setDoneWidth() {
    var doneSteps = document.querySelectorAll(".progress-step_done");
    var doneLine = document.querySelector(".progress-done__line");
    var slicedDone = [].concat(_toConsumableArray(doneSteps)).splice(0, doneSteps.length - 1);
    if (doneSteps && doneLine) {
        var width = 0;
        var minWidth = 0;
        slicedDone.map(function (ds) {
            return minWidth += ds.clientWidth;
        });
        doneSteps.forEach(function (ds) {
            return width += ds.clientWidth;
        });
        doneLine.style.minWidth = minWidth + "px";
        doneLine.style.width = width + "px";
    }
}

setDoneWidth();

function init() {
    hideElems();
    timer();
    setDoneWidth();
    var authForm = document.querySelector(".form-authorize");
    if (authForm) {
        var schoolsListFunc = function schoolsListFunc(datas) {
            schools = datas;
            localStorage.setItem('schoolsTest', JSON.stringify(datas));
            var schoolsList = document.createElement("ul");
            schoolsList.classList.add("schools-list");
            schoolsList.hidden = true;
            var label = schoolInput.parentNode;
            label.appendChild(schoolsList);
            schoolInput.addEventListener("input", function (e) {
                var val = e.target.value;
                schoolsList.innerHTML = null;
                if (val.length > 0) {
                    for (var item in schools) {
                        if (typeof schools[item] === "string") {
                            var incVal = schools[item].includes(val);
                            var incCap = schools[item].includes(val.capitalize());
                            if (incVal || incCap) {
                                if (schoolsList.hidden) {
                                    schoolsList.hidden = false;
                                }
                                var li = document.createElement("li");
                                li.textContent = schools[item];
                                schoolsList.appendChild(li);
                                li.addEventListener("click", function (ev) {
                                    ev.stopImmediatePropagation();
                                    schoolWarning.classList.remove('active');
                                    e.target.value = ev.target.textContent;
                                    schoolsList.innerHTML = null;
                                    schoolsList.hidden = true;
                                });
                            }
                        }
                    }
                }
            });
        };

        var schoolInput = authForm.querySelector("input[name='userSchool']");

        var schoolsURL = schoolInput.dataset.json;
        var schools = {};
        var email = authForm.querySelector('input[name="userEmail"]');
        var emailWarning = authForm.querySelector('.email-warning');
        var formWarning = authForm.querySelector('.form-warning');
        var schoolWarning = authForm.querySelector('.school-warning');
        var fioInput = authForm.querySelector('input[name="userName"]');
        var fioWarning = authForm.querySelector('.fio-warning');

        if (window.fetch) {
            fetch(schoolsURL).then(function (response) {
                return response.json();
            }).then(function (data) {
                schoolsListFunc(data);
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            var request = new XMLHttpRequest();
            request.open('POST', schoolsURL);
            request.responseType = 'json';
            request.onload = function () {
                schoolsListFunc(request.response);
            };
            request.send();
        }

        var inputs = authForm.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                var empty = Array.from(inputs).filter(function (input) {
                    return input.value.length < 1;
                });
                this.classList.remove('error');
                if (!empty.length) {
                    formWarning.classList.remove('active');
                }
            });
        });

        var regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email.addEventListener('input', function () {
            if (!email.value.match(regExpMail)) {
                this.classList.add('error');
                emailWarning.classList.add('active');
            } else {
                this.classList.remove('error');
                emailWarning.classList.remove('active');
            }
        });
        authForm.addEventListener("submit", function (e) {
            e.stopPropagation();
            e.preventDefault();
            var formData = new FormData();
            inputs = Array.from(inputs);
            var schoolsTest = JSON.parse(localStorage.getItem('schoolsTest'));
            var schoolsTestArray = [];
            for (var school in schoolsTest) {
                schoolsTestArray.push(schoolsTest[school]);
            }
            var emailCheck = email.value.match(regExpMail);
            var empty = inputs.filter(function (input) {
                return input.value.length < 1;
            });
            if (empty.length) {
                formWarning.classList.add('active');
                empty.map(function (empt) {
                    return empt.classList.add('error');
                });
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
            if (!empty.length && emailCheck && isCorrectFIO(fioInput.value) && schoolsTestArray.includes(schoolInput.value)) {
                inputs.forEach(function (input) {
                    return formData.append(input.name, input.value);
                });
                formData.append('action', 'welcome');
                sendAJAX("/diagnostika/index.php", formData);
            }
        });

        document.addEventListener('click', function (e) {
            var closest = e.target.closest('.form-authorize__label') === schoolInput.parentNode;
            var list = document.querySelector('.schools-list');
            if (list && !closest) {
                list.innerHTML = null;
                list.hidden = true;
            }
        });
    }
    window.addEventListener("resize", setDoneWidth);
    var progressIndexes = document.querySelectorAll(".progress-step__index");
    if (progressIndexes) {
        progressIndexes.forEach(function (p) {
            var act = p.parentNode.className.includes("active");
            var done = p.parentNode.className.includes("done");
            var bool = act || done;
            p.addEventListener("click", function (e) {
                return bool ? true : e.preventDefault();
            });
        });
    }

    var stepOne = document.querySelector(".step_one");

    (function stepOneActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepOne;

        if (!elem) {
            return false;
        }
        var list = elem.querySelector(".step_one-list");
        var items = list.querySelectorAll(".step_one-item");
        check(disableSend, elem);
        items.forEach(function (item) {
            var btns = item.querySelectorAll(".step_one-item__button");
            btns.forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    if (elem.dataset.disabled) {
                        return false;
                    }
                    item.setAttribute("data-answer", e.target.dataset.answer);
                    btns.forEach(function (b) {
                        return b.classList.remove("active");
                    });
                    btn.classList.add("active");
                });
            });
        });

        var stepOneBtn = elem.querySelector(".step_one__button");

        function sendStepOne() {
            items = Array.from(items);
            var data = new FormData();
            items.forEach(function (item) {
                var bool = item.dataset.answer === "yes" ? "y" : "n";
                var textBlock = item.querySelector(".step_one-item__text");
                var name = textBlock.dataset.name;
                if (item.dataset.answer) {
                    data.append(name, bool);
                } else {
                    data.append(name, null);
                }
            });
            sendAJAX("https://httpbin.org/post", data);

            return true;
        }

        stepOneBtn.addEventListener('click', sendStepOne);
    })();

    var stepTwo = document.querySelector(".step_two");
    (function stepTwoActions() {
        var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepTwo;

        if (!step) {
            return false;
        }

        check(disableSend, step);
        var ranges = step.querySelector(".ranges");
        var rangeElems = step.querySelectorAll(".slider-range");
        var stepTwoBtn = step.querySelector(".step_two__button");
        var parentsRanges = step.querySelectorAll(".slider-range__wrap");
        rangeElems.forEach(function (range) {
            var thumbUser = range.querySelector(".thumb_user");
            var thumbMax = range.querySelector(".thumb_max");
            var parent = range.parentNode.parentNode;
            var max = parent.querySelector('.thumb_max');
            var dataset = parent.dataset;
            max.classList.add('active');
            var keys = Object.keys(dataset);
            keys.map(function (key) {
                return setValue(key);
            });

            function setValue(val) {
                var data = parent.dataset[val];
                if (val !== 'name' && data) {
                    var thumb = parent.querySelector('.thumb_' + val);
                    var before = parent.querySelector('.thumb-before_' + val);
                    var count = thumb.querySelector('.thumb-count');
                    count.textContent = Number(data);
                    before.style.height = data * 0.93 + "%";
                    thumb.style.bottom = before.getBoundingClientRect().height + "px";
                }
            }

            thumbUser.addEventListener("mousedown", function (e) {
                if (e.target.closest('.step_two').dataset.disabled) {
                    return false;
                } else {
                    customDrag(thumbUser, range, e);
                }
            });
            thumbMax.addEventListener("mousedown", function (e) {
                if (e.target.closest('.step_two').dataset.disabled) {
                    return false;
                } else {
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
            var thumbCoords = getCoords(elem);
            var shiftY = e.pageY - thumbCoords.top;
            var self = elem;
            var percentElem = elem.querySelector(".thumb-count");
            var sliderCoords = getCoords(parent);
            var sliderHeight = parent.clientHeight;
            var thumbData = self.dataset.thumb;
            var thumbBefore = parent.querySelector('.thumb-before[data-thumb="' + thumbData + '"]');
            document.onmousemove = function (e) {
                document.documentElement.style.cursor = "grabbing";
                var parentRange = e.target.closest('.slider-range__wrap');
                var elemName = elem.dataset.thumb;
                elem.style.cursor = "grabbing";
                var maxThumb = elem.parentNode.querySelector(".thumb_max");
                maxThumb.classList.add("active");
                var newTop = e.pageY - shiftY - sliderCoords.top;
                if (newTop < 7) {
                    newTop = 7;
                }
                setTimeout(function () {
                    thumbBefore.style.height = sliderHeight - newTop - 12 + 'px';
                }, 10);
                var perText = (sliderHeight - newTop + 10) / sliderHeight * 100;
                var percent = parseInt(perText);
                if (percent < 0) {
                    percent = 0;
                }
                if (percent > 100) {
                    percent = 100;
                }
                percentElem.textContent = percent.toFixed();
                parentRange.setAttribute('data-' + elemName, percent.toFixed());
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
                    return e.getAttribute("data-user") === null || e.getAttribute("data-max") === null;
                }

                var noSelRan = parentsRanges.filter(function (r) {
                    return selectedIf(r);
                });
                if (noSelRan.length < 1) {
                    stepTwoBtn.disabled = false;
                }
            };
            return false;
        }

        function sendStepTwo() {

            var resultArr = [];
            var data = new FormData();
            parentsRanges.forEach(function (pr) {
                var name = pr.dataset.name;
                var obj = {};
                obj[name] = {
                    user: pr.dataset.user,
                    max: pr.dataset.max
                };
                resultArr.push(obj);
            });
            data.append("resultsArr", JSON.stringify(resultArr));
            data.append("FORMNAME", ranges.dataset.name);
            sendAJAX("https://httpbin.org/post", data);
        }

        stepTwoBtn.addEventListener('click', sendStepTwo);
    })();

    var stepFour = document.querySelector(".step_four");
    (function stepFourActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepFour;

        if (!elem) {
            return false;
        }

        var form = elem.querySelector('.step_four__form');
        var inputs = form.querySelectorAll('input');
        inputs.forEach(function (input) {
            return input.addEventListener('input', function (e) {
                if (elem.dataset.disabled) {
                    inputs.forEach(function (input) {
                        return input.disabled = true;
                    });
                }
            });
        });
        check(disableSend, elem);

        function sendStepFour() {
            var controls = form.querySelectorAll('input');
            var data = new FormData();
            controls.forEach(function (cont) {
                return data.append(cont.name, cont.value);
            });
            sendAJAX("https://httpbin.org/post", data);
            return true;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            sendStepFour();
        });
    })();

    var stepFive = document.querySelector(".step_five");
    (function stepFiveActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepFive;

        if (!elem) {
            return false;
        }
        var wordsString = elem.querySelector('.words-string');
        var content = elem.querySelector('.step_five__content');
        var jsonURL = content.dataset.json;
        var userWords = elem.querySelector('.user-words__words');
        var wordsCount = elem.querySelector('.user-words__count span');
        var btn = elem.querySelector('.step_five__button');
        check(disableSend, elem);

        function wordsFunc(datas) {
            var words = datas.words;
            var wordsArr = words.split(', ');
            var resultArray = [];
            var HTMLarray = [];
            var parser = new DOMParser();
            wordsString.addEventListener('mouseup', function (e) {
                if (!elem.dataset.disabled) {
                    var selection = window.getSelection().toString();
                    if (wordsArr.includes(selection) && !resultArray.includes(selection)) {
                        resultArray.push(selection);
                        HTMLarray = resultArray.map(function (elem) {
                            return '<span> ' + elem + '</span>';
                        });
                    }
                    userWords.setAttribute('data-find', String(resultArray));
                    userWords.innerHTML = parser.parseFromString(HTMLarray, "text/html").body.innerHTML;
                    wordsCount.textContent = resultArray.length;
                    if (wordsArr.length === resultArray.length) {
                        console.log("Ура, все слова найдены!");
                    }
                }
            });
        }

        if (window.fetch) {
            (function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var response, data;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return fetch(jsonURL);

                                case 2:
                                    response = _context.sent;
                                    _context.next = 5;
                                    return response.json();

                                case 5:
                                    data = _context.sent;

                                    wordsFunc(data);

                                case 7:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function getArray() {
                    return _ref.apply(this, arguments);
                }

                return getArray;
            })()();
        } else {
            var request = new XMLHttpRequest();
            request.open('GET', jsonURL);
            request.responseType = 'json';
            request.onload = function () {
                wordsFunc(request.response);
            };
            request.send();
        }

        (function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var response, data, words, wordsArr, resultArray, HTMLarray, parser;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return fetch(jsonURL);

                            case 2:
                                response = _context2.sent;
                                _context2.next = 5;
                                return response.json();

                            case 5:
                                data = _context2.sent;
                                words = data.words;
                                wordsArr = words.split(', ');
                                resultArray = [];
                                HTMLarray = [];
                                parser = new DOMParser();

                                wordsString.addEventListener('mouseup', function (e) {
                                    if (!elem.dataset.disabled) {
                                        var selection = window.getSelection().toString();
                                        if (wordsArr.includes(selection) && !resultArray.includes(selection)) {
                                            resultArray.push(selection);
                                            HTMLarray = resultArray.map(function (elem) {
                                                return '<span> ' + elem + '</span>';
                                            });
                                        }
                                        userWords.setAttribute('data-find', String(resultArray));
                                        userWords.innerHTML = parser.parseFromString(HTMLarray, "text/html").body.innerHTML;
                                        wordsCount.textContent = resultArray.length;
                                        if (wordsArr.length === resultArray.length) {
                                            console.log("Ура, все слова найдены!");
                                        }
                                    }
                                });

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getArray() {
                return _ref2.apply(this, arguments);
            }

            return getArray;
        })()();

        function sendStepFive() {
            var data = new FormData();
            if (userWords.dataset.find) {
                var userArray = JSON.stringify(userWords.dataset.find.split(','));
                data.append('userFind', userArray);
            } else {
                data.append('userFind', []);
            }
            sendAJAX("https://httpbin.org/post", data);
            return true;
        }

        btn.addEventListener('click', sendStepFive);
    })();

    var stepThree = document.querySelector('.step_three');
    (function stepThreeActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stepThree;

        if (!elem) {
            return false;
        }
        var controls = elem.querySelectorAll('input');
        controls.forEach(function (input) {
            if (elem.dataset.disabled) {
                input.disabled = true;
            }
            input.addEventListener('input', function () {
                if (elem.dataset.disabled) {
                    controls.forEach(function (inp) {
                        return inp.disabled = true;
                    });
                }
            });
        });
        check(disableSend, elem);
        var questions = elem.querySelectorAll('.question-wrap');
        var numberInputs = elem.querySelectorAll('.number-input');
        var btn = elem.querySelector('.step_three__button');
        numberInputs.forEach(function (number) {
            number.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').substr(0, 4);
            });
        });
        questions.forEach(function (question) {
            var radios = question.querySelectorAll('input[type="radio"]');
            radios.forEach(function (radio) {
                var label = radio.parentNode;
                label.addEventListener('click', function (e) {
                    var self = this;
                    if (!self.querySelector('input[type="radio"]').disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        radios = [].concat(_toConsumableArray(radios));
                        var noThis = radios.filter(function (rd) {
                            return rd.parentNode !== self;
                        });
                        noThis.forEach(function (rad) {
                            return rad.checked = false;
                        });
                        self.querySelector('input[type="radio"]').checked = !self.querySelector('input[type="radio"]').checked;
                    }
                });
            });
        });

        /// canvas start
        function checkLine(lnM, point) {
            var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


            if (c < 0 || localStorage.getItem('finishCanvas')) {
                return false;
            } else {
                lnM.classList.add('active');
                if (point.dataset.outer === "outer") {
                    c++;
                    localStorage.setItem('finishCanvas', true);
                }
                return true;
            }
        }

        var canvasAnswer = elem.querySelector('.question-wrap[data-type="canvas"]');
        var clearBtn = elem.querySelector('.clear-canvas');
        var userObj = [];
        var rects = elem.querySelectorAll('.canvas-block');
        var points = elem.querySelectorAll('.canvas-point');
        localStorage.removeItem('finishCanvas');
        var coordsArray = [[360, 63], [298, 125], [360, 125], [422, 125], [484, 125], [236, 187], [298, 187], [360, 187], [422, 187]];
        var resT = [{x: 360, y: 125, outer: true}, {x: 422, y: 125, outer: true}, {
            x: 298,
            y: 187,
            outer: true
        }, {x: 360, y: 187, outer: false}, {x: 422, y: 187, outer: false}, {x: 484, y: 187, outer: true}, {
            x: 298,
            y: 249,
            outer: true
        }, {x: 360, y: 249, outer: true}, {x: 422, y: 249, outer: true}, {x: 298, y: 125, outer: true}, {
            x: 484,
            y: 125,
            outer: true
        }, {x: 484, y: 249, outer: true}];

        var horizontalArr = [[360, 125], [298, 187], [360, 187], [422, 187], [298, 125], [422, 125]];
        var verticalArr = [[360, 125], [422, 125], [298, 187], [360, 187], [422, 187], [298, 125], [484, 125]];

        rects.forEach(function (rect, index) {
            rect.style.left = coordsArray[index][0] + "px";
            rect.style.top = coordsArray[index][1] + "px";
        });
        points.forEach(function (point, index) {
            point.style.left = resT[index].x + "px";
            point.style.top = resT[index].y + "px";
            point.dataset.index = index + 1;
            if (resT[index].outer === true) {
                point.dataset.outer = "outer";
                point.dataset.hover = "true";
            }
            if (resT[index].outer === false) {
                point.dataset.outer = "inner";
            }
        });
        var horizontals = elem.querySelectorAll('.horizont');
        horizontals.forEach(function (horizont, index) {
            horizont.style.top = horizontalArr[index][1] + 'px';
            horizont.style.left = horizontalArr[index][0] + 'px';
        });

        var verticals = elem.querySelectorAll('.vertical');
        verticals.forEach(function (vertical, index) {
            vertical.style.top = verticalArr[index][1] + 'px';
            vertical.style.left = verticalArr[index][0] + 'px';
        });
        var hovered = elem.querySelectorAll('.canvas-point[data-hover]');
        var pointsElems = elem.querySelectorAll('.canvas-point');
        var clickCounter = 0;
        var finishCounter = 0;

        var lines = elem.querySelectorAll('.canvas-row');
        var objCoord = {
            currentClick: [],
            prevClick: []
        };
        if (localStorage.getItem('canvasHTML')) {
            var question = canvasAnswer.querySelector('.question');
            question.removeChild(question.querySelector('.answers'));
            question.innerHTML += localStorage.getItem('canvasHTML');
            question.querySelector('.clear-canvas').classList.remove('active');
        } else {
            pointsElems.forEach(function (point) {
                if (localStorage.getItem('finishCanvas')) {
                    points.forEach(function (point) {
                        return point.removeAttribute('data-hover');
                    });
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
                            pointsElems.forEach(function (pi) {
                                return pi.classList.remove('selected');
                            });
                            this.classList.add('selected');
                            var selected = elem.querySelector('.selected');
                            hovered.forEach(function (h) {
                                return h.removeAttribute('data-hover');
                            });
                            var self = this;
                            var osPoints = [];
                            var yPoint = [].concat(_toConsumableArray(pointsElems)).filter(function (pi) {
                                return pi.style.left === self.style.left && Math.abs(parseInt(pi.style.top) - parseInt(self.style.top)) < 70;
                            }).filter(function (pointN) {
                                return pointN !== self;
                            });
                            var xPoint = [].concat(_toConsumableArray(pointsElems)).filter(function (pi) {
                                return pi.style.top === self.style.top && Math.abs(parseInt(pi.style.left) - parseInt(self.style.left)) < 70;
                            }).filter(function (pointN) {
                                return pointN !== self;
                            });
                            osPoints = Array.apply(undefined, _toConsumableArray(yPoint).concat(_toConsumableArray(xPoint)));
                            osPoints.map(function (op) {
                                return op.dataset.hover = "true";
                            });
                            var top = parseInt(elem.querySelector('.selected').style.top);
                            var left = parseInt(elem.querySelector('.selected').style.left);
                            if (clickCounter === 1) {
                                objCoord.currentClick = [top, left];
                            } else {
                                objCoord.prevClick = [].concat(_toConsumableArray(objCoord.currentClick));
                                objCoord.currentClick = [top, left];
                            }

                            if (objCoord.prevClick.length) {

                                var draw = [].concat(_toConsumableArray(lines)).forEach(function (line) {
                                    if (Math.abs(objCoord.currentClick[0] - objCoord.prevClick[0]) > 1) {
                                        if (objCoord.prevClick[0] - objCoord.currentClick[0] > 0) {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && parseInt(line.style.left) === objCoord.currentClick[1] && line.className.includes('vertical')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        } else {
                                            if (parseInt(line.style.top) === objCoord.prevClick[0] && parseInt(line.style.left) === objCoord.currentClick[1] && line.className.includes('vertical')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        }
                                    } else if (Math.abs(objCoord.currentClick[1] - objCoord.prevClick[1]) > 1) {
                                        if (objCoord.prevClick[1] - objCoord.currentClick[1] < 0) {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && parseInt(line.style.left) === objCoord.prevClick[1] && line.className.includes('horizont')) {
                                                if (checkLine(line, point) === true) {
                                                    checkLine(line, point);
                                                    userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                                }
                                            }
                                        } else {
                                            if (parseInt(line.style.top) === objCoord.currentClick[0] && parseInt(line.style.left) === objCoord.currentClick[1] && line.className.includes('horizont')) {
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
                });
            });
        }
        /// clear canvas

        clearBtn.addEventListener('click', function () {
            this.classList.remove('active');
            userObj = [];
            this.classList.remove('active');
            var lines = [].concat(_toConsumableArray(horizontals), _toConsumableArray(verticals));
            lines.map(function (line) {
                return line.classList.remove('active');
            });
            localStorage.removeItem('finishCanvas');
            clickCounter = 0;
            objCoord = {
                currentClick: [],
                prevClick: []
            };
            points.forEach(function (point, index) {
                points.forEach(function (p) {
                    return p.classList.remove("active");
                });
                if (resT[index].outer === true) {
                    point.setAttribute('data-hover', true);
                }
                if (resT[index].outer === false) {
                    point.removeAttribute('data-hover');
                    point.dataset.outer = "inner";
                }
            });
        });

        // end clear canvas
        //// canvas end
        function sendStepThree() {
            var _ref3;

            var data = new FormData();
            var jsonData = {};

            var radiosQuestions = elem.querySelectorAll('.question-wrap[data-type="radio"]');
            radiosQuestions.forEach(function (radio) {
                var name = radio.dataset.index;
                var checkedElem = [].concat(_toConsumableArray(radio.querySelectorAll('input[type="radio"]'))).filter(function (r) {
                    return r.checked;
                });
                if (checkedElem.length) {
                    jsonData[name] = [checkedElem[0].dataset.name];
                } else {
                    jsonData[name] = [null];
                }
            });
            var inputQuestions = elem.querySelectorAll('.question-wrap[data-type="input"]');
            inputQuestions.forEach(function (inputQuestion) {
                var name = inputQuestion.dataset.index;
                var input = inputQuestion.querySelector('input[type="text"]');
                if (input.value) {
                    jsonData[name] = [input.value];
                } else {
                    jsonData[name] = [null];
                }
            });

            var checkboxQuestions = elem.querySelectorAll('.question-wrap[data-type="checkbox"]');
            checkboxQuestions.forEach(function (check) {
                var name = check.dataset.index;
                var checkedElems = [].concat(_toConsumableArray(check.querySelectorAll('input[type="checkbox"]'))).filter(function (cb) {
                    return cb.checked;
                });
                if (checkedElems.length) {
                    var ckdArr = [];
                    checkedElems.map(function (ckd) {
                        return ckdArr.push(ckd.dataset.name);
                    });
                    jsonData[name] = ckdArr;
                } else {
                    jsonData[name] = [null];
                }
            });

            var canvas = canvasAnswer.querySelector('.canvas-wrapper');
            var dataTrue = canvas.dataset.true;
            var canvasName = canvasAnswer.dataset.index;
            dataTrue = dataTrue.split(',');
            dataTrue = dataTrue.map(function (item) {
                return Number(item);
            });
            var uObj = (_ref3 = []).concat.apply(_ref3, _toConsumableArray(userObj));
            uObj = uObj.sort();
            dataTrue = dataTrue.sort();
            if (String(dataTrue) === String(uObj)) {
                jsonData[canvasName] = [true];
            } else {
                jsonData[canvasName] = [false];
            }
            var canvasHTML = canvasAnswer.querySelector('.answers').innerHTML;
            localStorage.setItem('canvasHTML', canvasHTML);

            data.append('resultArr', JSON.stringify(jsonData));
            sendAJAX("https://httpbin.org/post", data);
            console.log(jsonData);
        }

        btn.addEventListener('click', sendStepThree);
    })();

    var final = document.querySelector('.hello-test_final');
    (function finalActions() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : final;

        if (!elem) {
            return false;
        }

        function setCssDiagram(line, percent, color) {
            line.style.width = percent + '%';
            line.style.backgroundColor = color;
        }

        var diagramsItem = elem.querySelectorAll('.diagram__item');
        diagramsItem.forEach(function (item) {
            var questions = Number(item.dataset.questions);
            var result = Number(item.dataset.result);
            var subLine = item.querySelector('.diagram__item-result');

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