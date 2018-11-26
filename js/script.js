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
        console.log(JSON.parse(data.form.resultsArr));
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

function init() {
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

        authForm.addEventListener("submit", function (e) {
            e.stopPropagation();
            e.preventDefault();
            let formData = new FormData();
            let inputs = e.target.querySelectorAll("input");
            inputs.forEach((input) => formData.append(input.name, input.value));
            sendAJAX("https://httpbin.org/post", formData);
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

    function timer(elem) {
        if (elem) {
            let counter = 0;
            let finish = parseInt(elem.dataset.finish);
            let secEl = elem.querySelector(".timer__seconds");
            let minEl = elem.querySelector(".timer__minutes");
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
        }
    }

    timer(document.querySelector(".timer[data-finish]"));


    const stepOne = document.querySelector(".step_one");

    (function stepOneActions(elem = stepOne) {
        if (!elem) {
            return false;
        }
        let list = elem.querySelector(".step_one-list");
        let items = list.querySelectorAll(".step_one-item");
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
        stepOneBtn.addEventListener("click", function () {
            items = Array.from(items);
            let noSel = items.filter((item) => !item.dataset.answer);
            if (noSel.length < 1) {
                let data = new FormData();
                items.forEach(function (item) {
                    let bool = (item.dataset.answer === "yes" ? "y" : "n");
                    let textBlock = item.querySelector(".step_one-item__text");
                    let name = textBlock.dataset.name;
                    data.append(name, bool);
                });
                sendAJAX("https://httpbin.org/post", data);
            }
        });
    })();

    const stepTwo = document.querySelector(".step_two");
    (function stepTwoActions(step = stepTwo) {
        if (!step) {
            return false;
        }
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
                if(val !== 'name' && data){
                    let thumb = parent.querySelector(`.thumb_${val}`);
                    let before = parent.querySelector(`.thumb-before_${val}`);
                    let count = thumb.querySelector('.thumb-count');
                    count.textContent = Number(data);
                    before.style.height = data*0.93 + "%";
                    thumb.style.bottom = before.getBoundingClientRect().height + "px";
                }
            }

            thumbUser.addEventListener("mousedown", function (e) {
                if(getParents(thumbUser, 'ranges').dataset.disabled){
                    return false
                }
                else {
                    customDrag(thumbUser, range, e);
                }

            });
            thumbMax.addEventListener("mousedown", function (e) {
                if(getParents(thumbUser, 'ranges').dataset.disabled){
                    return false
                }
                else{
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

        stepTwoBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
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
        })
    })();

    const stepFour = document.querySelector(".step_four");
    (function stepFourActions(elem = stepFour) {
        if (!elem) {
            return false;
        }
        const form = elem.querySelector('.step_four__form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let controls = e.target.querySelectorAll('input');
            let data = new FormData();
            controls.forEach((cont) => data.append(cont.name, cont.value));
            sendAJAX("https://httpbin.org/post", data);
        })
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
        btn.addEventListener('click', function () {
            let userArray = JSON.stringify(userWords.dataset.find.split(','));
            let data = new FormData();
            data.append('userFind', userArray);
            sendAJAX("https://httpbin.org/post", data);
        })


    })();

}

ready(init);