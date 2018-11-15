function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function sendAJAX(url, data) {
    fetch(url, {
        method: "POST",
        body: data
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
    }).catch(function (error) {
        console.log(error)
    });
}

let getParents = (elem, clName) => {
    let parents = [];
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.classList.contains(clName))
            parents.push(elem)
    }
    return parents.length ? parents[0] : false;
};

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function init() {
    let authForm = document.querySelector('.form-authorize');
    if (authForm) {
        authForm.addEventListener('submit', function (e) {
            e.stopPropagation();
            e.preventDefault();
            let formData = new FormData();
            let inputs = this.querySelectorAll('input');
            inputs.forEach(input => {
                formData.append(input.name, input.value)
            });
            sendAJAX("https://httpbin.org/post", formData)
        })
    }

    function setDoneWidth() {
        let doneSteps = document.querySelectorAll('.progress-step_done');
        let doneLine = document.querySelector('.progress-done__line');
        if (doneSteps && doneLine) {
            let width = 0;
            doneSteps.forEach(ds => width += ds.clientWidth);
            doneLine.style.width = width + 'px'
        }
    }

    setDoneWidth();
    window.addEventListener('resize', setDoneWidth);
    let progressIndexes = document.querySelectorAll('.progress-step__index');
    if (progressIndexes)
        progressIndexes.forEach(pi => pi.addEventListener('click', e => (pi.parentNode.getAttribute('class').includes('active') || pi.parentNode.getAttribute('class').includes('done')) ? true : e.preventDefault()));
    let timer = (elem) => {
        if (!elem)
            return false;
        let counter = 0;
        let finish = parseInt(elem.dataset.finish);
        let secBlock = elem.querySelector('.timer__seconds');
        let minBlock = elem.querySelector('.timer__minutes');
        let sec = parseInt(secBlock.textContent);
        let min = parseInt(minBlock.textContent);
        let timerId = setInterval(() => {
            if (finish <= counter)
                elem.classList.add('timer_bad');
            sec < 10 ? secBlock.textContent = '0' + sec : secBlock.textContent = sec;
            sec++;
            counter++;
            if (sec === 59) {
                min++;
                min < 10 ? minBlock.textContent = '0' + min : minBlock.textContent = min;
                sec = 0;
            }
        }, 1000);
    }
    timer(document.querySelector('.timer[data-finish]'));
    let stepOne = document.querySelector('.step_one');

    function stepOneActions(elem) {
        if (!elem)
            return false;
        let list = elem.querySelector('.step_one-list');
        let items = list.querySelectorAll('.step_one-item');
        items.forEach(item => {
            let btns = item.querySelectorAll('.step_one-item__button');
            btns.forEach(btn => {
                btn.addEventListener('click', function () {
                    item.setAttribute('data-answer', this.dataset.answer);
                    btns.forEach(b => b.classList.remove('step_one-item__button_active'));
                    btn.classList.add('step_one-item__button_active')
                })
            })
        });
        let stepOneBtn = elem.querySelector('.step_one__button');
        stepOneBtn.addEventListener('click', function () {
            let unChecked = [...items].filter(item => !item.dataset.answer);
            if (unChecked.length < 1) {
                let data = new FormData();
                items.forEach(item => {
                    let bool;
                    item.dataset.answer === "yes" ? bool = 'y' : bool = 'n';
                    data.append(item.querySelector('.step_one-item__text').dataset.name, bool);
                });
                sendAJAX("https://httpbin.org/post", data)
            }
            else {
                let top = Math.abs(unChecked[0].getBoundingClientRect().top)
                let scrollAnimate = setInterval(() => {
                    if (top > 0) {
                        top -= 10
                        document.documentElement.scrollTop = top
                    } else {
                        clearInterval(scrollAnimate)
                    }
                }, 1)
            }
        })
    }

    stepOneActions(stepOne)


    const stepTwo = document.querySelector('.step_two');

    function stepTwoActions(step) {
        if (!step)
            return false
        const ranges = step.querySelector('.ranges');
        const rangeElems = step.querySelectorAll('.slider-range');
        const stepTwoBtn = step.querySelector('.step_two__button');
        let parentsRanges = step.querySelectorAll('.slider-range__wrap');
        rangeElems.forEach(range => {
            let thumbUser = range.querySelector('.thumb_user');
            let thumbMax = range.querySelector('.thumb_max');
            thumbUser.addEventListener('mousedown', e => customDrag(thumbUser, range, e));
            thumbMax.addEventListener('mousedown', e => customDrag(thumbMax, range, e));
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
            let percentElem = elem.querySelector('.thumb-count');
            let sliderCoords = getCoords(parent);
            let sliderHeight = parent.clientHeight;
            let thumbData = self.dataset.thumb;
            let thumbBefore = parent.querySelector(`.thumb-before[data-thumb='${thumbData}']`);
            document.onmousemove = function (e) {
                document.documentElement.style.cursor = "grabbing";
                let parentRange = getParents(elem, 'slider-range__wrap');
                let elemName = elem.dataset.thumb;
                elem.style.cursor = "grabbing";
                elem.parentNode.querySelector('.thumb_max').classList.add('active');
                let newTop = e.pageY - shiftY - sliderCoords.top;
                if (newTop < 7) {
                    newTop = 7;
                }
                setTimeout(function () {
                    thumbBefore.style.height = sliderHeight - newTop - 12 + 'px';
                }, 10);

                let percent = parseInt((sliderHeight - newTop + 10) / sliderHeight * 100);
                if (percent < 0) {
                    percent = 0
                }
                if (percent > 100) {
                    percent = 100
                }
                percentElem.textContent = percent.toFixed();
                parentRange.setAttribute(`data-${elemName}`, percent.toFixed())
                if (newTop > sliderHeight - self.clientHeight - 10) {
                    newTop = sliderHeight - self.clientHeight - 5;
                }
                self.style.top = newTop + 'px';
                elem.classList.add('animated');
            };
            document.onmouseup = function () {
                document.documentElement.style.cursor = "default";
                elem.style.cursor = "pointer";
                elem.classList.remove('animated');
                document.onmousemove = document.onmouseup = null;

                parentsRanges = [...parentsRanges];
                let unSelectedRanges = parentsRanges.filter(parRan => parRan.getAttribute('data-user') === null || parRan.getAttribute('data-max') === null)
                if (unSelectedRanges.length < 1) {
                    stepTwoBtn.disabled = false;
                }
            };
            return false;
        }

        stepTwoBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            let resultArr = [];
            let data = new FormData();
            parentsRanges.forEach(pr => {
                let name = pr.dataset.name
                let obj  = {};
                obj[name] = {
                    user: pr.dataset.user,
                    max: pr.dataset.max
                };
                resultArr.push(obj)
            });
            data.append('resultsArr', JSON.stringify(resultArr))
            data.append('FORMNAME', ranges.dataset.name)
            sendAJAX("https://httpbin.org/post", data)

        })
    }

    stepTwoActions(stepTwo)

}

ready(init);