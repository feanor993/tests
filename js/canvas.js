let canvas = document.getElementById('canvas');
if (canvas) {
    let ctx = canvas.getContext('2d');

    let coordsArray = [
        [360, 63], [308, 115], [360, 115], [412, 115], [464, 115], [256, 167], [308, 167], [360, 167], [412, 167]
    ];
    let pointsArray = [];
    coordsArray.forEach(coord => {
        let x = coord[0] + 60;
        let y = coord[1] + 60;
        pointsArray.push(Array(x, y));
    });
    let resultArray = coordsArray.concat(pointsArray);
    coordsArray.map(coord => {
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.strokeStyle = "#B1CD43";
        ctx.rect(coord[0], coord[1], 40, 40);
        ctx.fillStyle = "#F6F5F5";
        ctx.stroke();
        ctx.stroke();
    });
    let obj = {
        currentClick: [],
        prevClick: []
    };
    let clickCount = 0;

    canvas.addEventListener('click', function (e) {
        const mousePos = {
            x: e.layerX,
            y: e.layerY
        };
        console.log(mousePos)
        resultArray.map(coord => {
            let inX = coord[0] < mousePos.x + 20 && coord[0] > mousePos.x - 20;
            let inY = coord[1] < mousePos.y + 20 && coord[1] > mousePos.y - 20;
            if (inX && inY) {
                clickCount += 1;
                if (clickCount === 1) {
                    obj.currentClick = [coord[0], coord[1]];
                } else {
                    obj.prevClick = [...obj.currentClick];
                    obj.currentClick = [coord[0], coord[1]];
                }

                if(obj.currentClick.length && obj.prevClick.length && (obj.currentClick !== obj.prevClick)){
                    let rX = Math.abs((obj.prevClick[0] -13)  - (obj.currentClick[0] -6));
                    let rY = Math.abs((obj.prevClick[1] -13) - (obj.currentClick[1] -6));
                    if((rX < 20 && rY > 45) || (rY < 20 && rX > 45)){
                        if (obj.currentClick[1] >  obj.prevClick[1] ) {
                            if (obj.currentClick[0] >  obj.prevClick[0] ){
                                console.log(1)
                            }
                            else{
                                console.log(2)
                            }
                            ctx.beginPath();
                            ctx.strokeStyle = "#FFD207";
                            ctx.lineWidth = "3";
                            ctx.moveTo(obj.prevClick[0] -6 ,obj.prevClick[1] -6);
                            ctx.lineTo(obj.currentClick[0] -13, obj.currentClick[1] -13);
                            ctx.stroke();
                        }
                        else if(obj.currentClick[1] <=  obj.prevClick[1]) {
                            if (obj.currentClick[0] >  obj.prevClick[0] ){
                                console.log(1)
                            }
                            else{
                                console.log(2)
                            }
                            ctx.beginPath();
                            ctx.strokeStyle = "#FFD207";
                            ctx.lineWidth = "3";
                            ctx.moveTo(obj.prevClick[0] -13 ,obj.prevClick[1] -13);
                            ctx.lineTo(obj.currentClick[0] -6,obj.currentClick[1] -6);
                            ctx.stroke();
                        }
                    }
                    console.log(obj)
                }
            }
            else {
                return false
            }
        });
    })
}


let cnvsBtn = document.querySelector('.cnvs-btn');
cnvsBtn.addEventListener('click', function () {
    let canvas = document.querySelector('.canvas-wrapper');
    let dataTrue = canvas.dataset.true;
    dataTrue = dataTrue.split(',');
    dataTrue = dataTrue.map(item => Number(item))
    let uObj =  [].concat(...userObj);
    uObj = uObj.sort();
    dataTrue = dataTrue.sort();
    if(String(dataTrue) === String(uObj)){
        alert('ура, вы ответили верно')
    }
    else {
        alert('вы ответили неверно')
    }
})