let canvas = document.getElementById('canvas');
if (canvas) {
    let ctx = canvas.getContext('2d');
    let coordsArray = [
        [360, 63], [308, 115], [360, 115], [412, 115], [464, 115], [256, 167], [308, 167], [360, 167], [412, 167]
    ];
    let coordsTwo = [];
    coordsArray.forEach(coord => {
        coordsTwo.push([coord[0] - 6, coord[1] - 6])
    });

    let pointsArray = [];
    coordsTwo.forEach(coord => {
        let x = coord[0] + 52;
        let y = coord[1] + 52;
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
        let whichArr = resultArray[which([e.layerX, e.layerY ], resultArray)];
        let mX = resultArray[which([e.layerX, e.layerY ], resultArray)][0];
        let mY = resultArray[which([e.layerX, e.layerY ], resultArray)][1];
        resultArray.map(coord => {
            let inX = coord[0] < mousePos.x + 20 && coord[0] > mousePos.x - 20;
            let inY = coord[1] < mousePos.y + 20 && coord[1] > mousePos.y - 20;
            if (inX && inY) {
                clickCount += 1;
                if (clickCount === 1) {
                    obj.currentClick = [mX , mY];
                } else {
                    obj.prevClick = [...obj.currentClick];
                    obj.currentClick = [mX , mY];
                }

                if(obj.currentClick.length && obj.prevClick.length && (obj.currentClick !== obj.prevClick)){
                    let rX = Math.abs((obj.prevClick[0])  - (obj.currentClick[0]));
                    let rY = Math.abs((obj.prevClick[1]) - (obj.currentClick[1]));
                    if((rX < 20 && rY > 45)){
                        if(rY < 60 ){
                            if (obj.currentClick[1] >  obj.prevClick[1] ) {
                                console.log('вниз');
                                let filtredARR = resultArray.filter(rItem => rItem[1] >= obj.currentClick[1] - 10);
                                resultArray =  filtredARR;
                                ctx.beginPath();
                                ctx.strokeStyle = "#FFD207";
                                ctx.lineWidth = "3";
                                ctx.moveTo(obj.currentClick[0], whichArr[1] - 52);
                                ctx.lineTo(obj.currentClick[0], whichArr[1]);
                                ctx.stroke();
                            }
                            else if(obj.currentClick[1] <=  obj.prevClick[1]) {
                                console.log('вверх');
                                let filtredARR = resultArray.filter(rItem => rItem[1] <= obj.currentClick[1] + 10);
                                resultArray =  filtredARR;
                                ctx.beginPath();
                                ctx.strokeStyle = "#FFD207";
                                ctx.lineWidth = "3";
                                ctx.moveTo(obj.currentClick[0], whichArr[1] + 52);
                                ctx.lineTo(obj.currentClick[0], whichArr[1]);
                                ctx.stroke();
                            }
                        }

                    }
                    else if((rX > 20 && rY < 45)){
                        if (rX < 60) {
                            if (obj.currentClick[0] >  obj.prevClick[0] ) {
                                console.log('вправо');
                                let filtredARR = resultArray.filter(rItem => rItem[0]  <= obj.currentClick[0] + 10);
                                resultArray =  filtredARR;
                                ctx.beginPath();
                                ctx.strokeStyle = "#FFD207";
                                ctx.lineWidth = "3";
                                ctx.moveTo(whichArr[0], obj.currentClick[1]);
                                ctx.lineTo(whichArr[0] - 52, obj.currentClick[1]);
                                ctx.stroke();
                            }
                            else if(obj.currentClick[0] <=  obj.prevClick[0]) {
                                console.log('влево');
                                let filtredARR = resultArray.filter(rItem => rItem[0]  >= obj.currentClick[0] - 10);
                                resultArray =  filtredARR;
                                ctx.beginPath();
                                ctx.strokeStyle = "#FFD207";
                                ctx.lineWidth = "3";
                                ctx.moveTo(whichArr[0], obj.currentClick[1]);
                                ctx.lineTo(whichArr[0] + 52, obj.currentClick[1]);
                                ctx.stroke();
                            }
                        }

                    }

                    console.log(resultArray);
                }
            }
            else {
                return false
            }
        });
    });

}