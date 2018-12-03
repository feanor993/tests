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
let userObj = [];
let lines = elem.querySelectorAll('.canvas-row');
let objCoord = {
    currentClick: [],
    prevClick: []
};

function checkLine(lnM, point, c = 0) {

    if(c < 0  || localStorage.getItem('finishCanvas')){
        return false
    }
    else {
        lnM.classList.add('active');
        if(point.dataset.outer === "outer"){
            c++;
            localStorage.setItem('finishCanvas', true)
        }
        return true;
    }
}

pointsElems.forEach(point => {
    if(localStorage.getItem('finishCanvas')){
        points.forEach(point => point.removeAttribute('data-hover'))
    }
    point.addEventListener('click', function (e) {
        clickCounter++;
        if(!localStorage.getItem('finishCanvas')){
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
                                    if(checkLine(line, point) ===  true){
                                        checkLine(line, point);
                                        userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                    }
                                }
                            }
                            else {
                                if (parseInt(line.style.top) === objCoord.prevClick[0] && (parseInt(line.style.left) === objCoord.currentClick[1]) && line.className.includes('vertical')) {
                                    if(checkLine(line, point) ===  true){
                                        checkLine(line, point);
                                        userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                    }

                                }
                            }

                        }
                        else if (Math.abs(objCoord.currentClick[1] - objCoord.prevClick[1]) > 1) {
                            if (objCoord.prevClick[1] - objCoord.currentClick[1] < 0) {
                                if (parseInt(line.style.top) === objCoord.currentClick[0] && (parseInt(line.style.left) === objCoord.prevClick[1]) && line.className.includes('horizont')) {
                                    if(checkLine(line, point) ===  true){
                                        checkLine(line, point);
                                        userObj.push([parseInt(line.style.left), parseInt(line.style.top)]);
                                    }
                                }
                            }
                            else {
                                if (parseInt(line.style.top) === objCoord.currentClick[0] && (parseInt(line.style.left) === objCoord.currentClick[1]) && line.className.includes('horizont')) {
                                    if(checkLine(line, point) ===  true){
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