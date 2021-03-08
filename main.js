canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext("2d")
ctx.lineWidth = 5
ctx.strokeStyle = '#010101'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
let painting = false
let EraserEnabled = false
let colorId = 'color1'
let myAlpha = 1
chooseColor(colorId)
function chooseColor(colorId) {
    console.log(myAlpha)
    switch (colorId) {
        case 'color1':
            ctx.strokeStyle = 'rgba(1,1,1,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#010101';
            break;
        case 'color2':
            ctx.strokeStyle = 'rgba(58,124,243,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#3A7CF3';
            break;
        case 'color3':
            ctx.strokeStyle = 'rgba(121, 212, 117,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#79D475';
            break;
        case 'color4':
            ctx.strokeStyle = 'rgba(247, 210, 84,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#F7D254';
            break;
        case 'color5':
            ctx.strokeStyle = 'rgba(232, 70, 74,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#E8464A';
            break;
        case 'color6':
            ctx.strokeStyle = 'rgba(96, 59, 175,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#603BAF';
            break;
        case 'color7':
            ctx.strokeStyle = 'rgba(88, 184, 179,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#58B8B3';
            break;
        case 'color8':
            ctx.strokeStyle = 'rgba(156, 106, 70,' + myAlpha + ')';
            highLiter.style.color = pen.style.color = '#9C6A46';
            break;
    }
}

pen.addEventListener('click', (e) => {
    pen.classList.add('current')
    highLiter.classList.remove('current')
    eraser.classList.remove('current')
    EraserEnabled = false
    ctx.lineWidth = 5
    myAlpha = 1
    chooseColor(colorId)
})
highLiter.addEventListener('click', (e) => {
    pen.classList.remove('current')
    highLiter.classList.add('current')
    eraser.classList.remove('current')
    EraserEnabled = false
    ctx.lineWidth = 15
    myAlpha = 0.1
    chooseColor(colorId)
})
eraser.addEventListener('click', (e) => {
    pen.classList.remove('current')
    highLiter.classList.remove('current')
    eraser.classList.add('current')
    EraserEnabled = true;
    console.log("橡皮擦")
})
clear.addEventListener('click', (e) => {
    EraserEnabled = false
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})
colorArea.addEventListener('click', (e) => {
    if (e.target.className == 'colorItem') {
        let currentColor = document.getElementById(colorId)
        currentColor.classList.remove('current')
        colorId = e.target.id
        currentColor = document.getElementById(colorId)
        currentColor.classList.add('current')
        chooseColor(colorId, 1)
    }
})

let isTouchDevice = 'ontouchstart' in document.documentElement;//检查是否是触屏设备
if (isTouchDevice) {
    console.log("触屏设备");

    canvas.ontouchstart = (e) => {
        x1 = e.touches[0].clientX
        y1 = e.touches[0].clientY
    }
    canvas.ontouchmove = (e) => {
        console.log(x1, y1)
        let x2 = e.touches[0].clientX
        let y2 = e.touches[0].clientY
        ctx.beginPath();
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke();
        x1 = x2
        y1 = y2
    }
} else {
    canvas.onmousedown = (e) => {
        let x = e.clientX
        let y = e.clientY
        painting = true
        if (EraserEnabled) {
            ctx.clearRect(x - 15, y - 15, 30, 30)
        }
        startPoint = { x: x, y: y }
    }

    canvas.onmousemove = (e) => {
        let x = e.clientX
        let y = e.clientY
        let newPoint = { x: x, y: y };
        if (painting) {
            if (EraserEnabled) {
                ctx.clearRect(x - 15, y - 15, 30, 30)
            } else {
                drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
            }
            startPoint = newPoint;
        }
    }

    canvas.onmouseup = () => {
        painting = false
    }

}

function drawLine(xStart, yStart, xEnd, yEnd) {
    //开始绘制路径
    ctx.beginPath();
    //线宽
    //起始位置
    ctx.moveTo(xStart, yStart);
    //停止位置
    ctx.lineTo(xEnd, yEnd);
    //描绘线路
    ctx.stroke();
    //结束绘制
    ctx.closePath();
}

touchBar.click(

)