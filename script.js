// circle1: 가운데 위
// circle2: 왼쪽 아래
// circle3: 오른쪽 아래
// button1: Reset
// button2: Add Set
// button3: change Shape
var screen_width = window.innerWidth;
var screen_height = window.innerHeight;

const circle_radius = 75; // 원 반지름
const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");

const setting_container = document.getElementById("setting_container")
const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");
canvas.width = screen_width
canvas.height = screen_height
var count = 3; // 집합 개수
var vertex_number = '' // 꼭짓점 개수
var vertex_input = document.getElementById('vertex'); // 꼭짓점 개수 입력창
const additional_dot_space = 3;
let new_sets = [];
let triangle1 = {parity :'1', start_pos_x: '', start_pos_y: ''}; // parity : 0(짝수), 1(홀수)

// 처음 로딩 시 도형 설정
set_setting_container()
set_base_circle(screen_width, screen_height);

// 화면 크기 변경 -> 기본원, 설정 패널 위치 변경
window.addEventListener("resize", function() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    console.log(screen_width, screen_height);
    set_base_circle(screen_width, screen_height);
    set_setting_container(screen_width, screen_height);
    set_canvas(screen_width, screen_height);
    add_set(screen_width, screen_height, "triangle");
});

// Reset Button Click -> Base Circle Update, canvas Update
button1.addEventListener("click", function() {
    set_base_circle(screen_width, screen_height);
    set_canvas(screen_width, screen_height);
})

// Add Set Button Click -> Add Set, 집합 개수 Update
button2.addEventListener("click", function() {
    count++;
    add_set(screen_width, screen_height, vertex_number)
})

// Set Shape -> Check & Save Vertex Input
button3.addEventListener("click", function() {
    vertex_number = vertex_input.value; // 꼭짓점 개수 입력
    if (isNaN(vertex_number) || vertex_number=='') {
        alert("숫자만 입력해 주세요!")
        return 1;
    }
    console.log(vertex_number)
})

// 기본원 제어 함수
function set_base_circle(screen_width, screen_height) {
    circle1.style.top = screen_height / 2 - circle_radius + "px";
    circle1.style.left = screen_width / 2 - circle_radius + "px";

    circle2.style.top = screen_height / 2 - circle_radius + circle_radius + "px";
    circle2.style.left = screen_width / 2 - circle_radius  - circle_radius / 1.5  + "px";

    circle3.style.top = screen_height / 2 - circle_radius + circle_radius + "px";
    circle3.style.left = screen_width / 2  - circle_radius / 2+ "px";
    
}

// 설정 패널 제어 함수
function set_setting_container(screen_width, screen_height) {
    setting_container.style.top = screen_width / 2 + circle_radius * 2 + "px";
    setting_container.style.left = screen_height / 2 + "px";
}

// canvas 제어 함수
function set_canvas(screen_width, screen_height) {
    canvas.width = screen_width;
    canvas.height = screen_height;

    ctx.beginPath()
}

// TO DO : 벤다이어그램 각 영역별로 필수로 지나야 할 구역의 한 점을 포인트로 잡고 도형 적당히 그려보자(삼각형, 직사각형, 오각형)


function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 0, 0.55)";
    ctx.fill();
}

function add_set(screen_width, screen_height, shape) {
    var side1_x_pos = parseFloat(circle3.style.left) - 3
    var side2_x_pos = parseFloat(circle2.style.left) + circle_radius*2 - 20
    var side1_y_pos = screen_height / 2
    var side2_y_pos = screen_height / 2
    if (shape == '') {
        alert("Set Shape 버튼을 클릭하여 추가할 집합의 꼭짓점 개수를 선택해주세요!")
    }
    if (shape % 2 == 0) {
        points1_to_draw = [];
        points2_to_draw = [];
        // 꼭짓점 개수가 짝수개 -> 초기 시작점 2개, 밑 점 두개
        var start_pos_x1 = parseFloat(circle3.style.left) - 3
        var start_pos_x2 = parseFloat(circle2.style.left) + circle_radius*2 - 20
        var start_pos_y1 = parseFloat(canvas.height) / 2 - circle_radius * 3
        var start_pos_y2 = parseFloat(canvas.height) / 2 - circle_radius * 3
        var saved_st2_x2 = start_pos_x2
        var saved_st2_y2 = start_pos_y2
        var count_to_draw = 0 // 그린거 개수
        points1_to_draw.push([start_pos_x1, start_pos_y1])
        // 마지막 2점 빼고 그리기
        while (shape - count_to_draw  != 2)
        {
            var next_pos_x1 = start_pos_x1 - 3
            var next_pos_x2 = start_pos_x2 + 3
            var next_pos_y1 = start_pos_y1 + 3
            var next_pos_y2 = start_pos_y2 + 3

            points1_to_draw.push([next_pos_x1, next_pos_y1])
            points2_to_draw.push([next_pos_x2, next_pos_y2 ])

            console.log(start_pos_x1, start_pos_x2)
            console.log(next_pos_x1, next_pos_y1)
            console.log(next_pos_x2, next_pos_y2)
            console.log(start_pos_x2, start_pos_y2)

            start_pos_x1 = start_pos_x1 - 3
            start_pos_x2 = start_pos_x2 + 3
            start_pos_y1 = start_pos_y1 - 3
            start_pos_y2 = start_pos_y2 - 3
            
            count_to_draw = count_to_draw + 2
        }
        points1_to_draw.push([side1_x_pos, side1_y_pos])
        points1_to_draw.push([side2_x_pos, side2_y_pos])
        points2_to_draw.reverse()
        
        ctx.beginPath();
        ctx.moveTo(points1_to_draw[0][0], points1_to_draw[0][1]);
        var len1 = points1_to_draw.length
        var len2 = points2_to_draw.length
        for (let i = 1; i < len1; i++) {
            ctx.lineTo(points1_to_draw[i][0], points1_to_draw[i][1]);
        }
        for (let i = 1; i < len2; i++) {
            ctx.lineTo(points2_to_draw[i][0], points2_to_draw[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 0, 0.55)";
        ctx.fill();
    }
    else {
        // 꼭짓점 개수가 홀수개 -> 초기 시작점은 1개 , 밑 점 두개
        var start_pos_x = parseFloat(canvas.width) / 2 - 15
        var start_pos_y = parseFloat(canvas.height) / 2 - circle_radius * 3
        const triangleHeight = 150;
        const triangleWidth = 100;
        points_to_draw = [];
        points_to_draw.push([start_pos_x, start_pos_y])
        points_to_draw.push([side1_x_pos, side1_y_pos])
        points_to_draw.push([start_pos_x, start_pos_y])
        points_to_draw.push([start_pos_x, start_pos_y])
        ctx.beginPath();
        ctx.moveTo(start_pos_x, start_pos_y);
        ctx.lineTo(side1_x_pos, side1_y_pos); // 두 번째 점
        ctx.lineTo(side2_x_pos, side2_y_pos); // 세 번째 점
        ctx.lineTo(start_pos_x, start_pos_y); // 첫 번째 점과 연결하여 선을 닫음
        ctx.closePath();

        ctx.fillStyle = "rgba(255, 255, 0, 0.55)"; // 원하는 도형의 색상 설정
        ctx.fill();
        console.log("그림")
        // 그려야 하는 점 개수가 2개일 때 까지 B,C 집합 접근 전까지에 다 그리기
    }
}
