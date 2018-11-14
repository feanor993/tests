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
        if(!elem)
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
}

ready(init);