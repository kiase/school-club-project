let cav = [600, 600];
let xline = 14,
  yline = 14;
let cell = [cav[0] / xline, cav[1] / yline];
let code = [];

let a = 0,
  b = 0;
let a1 = 0,
  b1 = 0;
//code[x][y][p]
//└기준점 셀의 왼쪽 위
//cell[축]
//└전체 셀의 크기
//모든 축 => 0=x축, 1=y축

function setting() {
  for (let j = 0; j < xline; j++) {
    code[j] = [];
    for (let i = 0; i < xline; i++) {
      code[j][i] = [];
      append(code[j][i], (cav[0] / yline) * j);
      append(code[j][i], (cav[1] / xline) * i);
    }
  }
  console.log(code);
}
function draw_grid() {
  strokeWeight(1);
  for (let i = 0; i <= xline; i++) {
    line((width / xline) * i, 0, (width / xline) * i, height);
  }
  for (let i = 0; i <= yline; i++) {
    line(0, (height / yline) * i, width, (height / yline) * i);
  }
}

function setup() {
  window.addEventListener("contextmenu", e => e.preventDefault());
  let cv=createCanvas(cav[0], cav[1]);
  background(255);
  setting();
}

function draw() {
  draw_grid();
  strokeWeight(3);
  line(code[4][3][0], code[4][0][1], code[4][13][0], code[4][13][1] + cell[1]);
  line(code[3][0][1], code[4][3][0], code[4][13][1] + cell[1], code[4][13][0]);
  fill("black");
  textSize(35);
  textAlign(CENTER, CENTER);
  //4=>1
  text("4", code[4][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("4", code[4][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("6", code[5][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("1", code[5][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("1", code[6][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("7", code[6][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("2", code[7][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("1", code[7][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("2", code[7][3][0] + cell[0] / 2, code[4][1][1] + cell[1] / 2);
  text("1", code[8][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("2", code[8][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("3", code[8][3][0] + cell[0] / 2, code[4][1][1] + cell[1] / 2);
  text("1", code[9][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("2", code[9][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("3", code[9][3][0] + cell[0] / 2, code[4][1][1] + cell[1] / 2);
  text("2", code[10][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("1", code[10][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("2", code[10][3][0] + cell[0] / 2, code[4][1][1] + cell[1] / 2);
  text("1", code[11][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("7", code[11][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("4", code[12][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("2", code[12][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);
  text("3", code[13][3][0] + cell[0] / 2, code[4][3][1] + cell[1] / 2);
  text("5", code[13][3][0] + cell[0] / 2, code[4][2][1] + cell[1] / 2);

  text("6", code[3][3][0] + cell[0] / 2, code[4][4][1] + cell[1] / 2);
  text("1", code[3][3][0] + cell[0] / 2, code[4][5][1] + cell[1] / 2);
  text("2", code[3][3][0] + cell[0] / 2, code[4][6][1] + cell[1] / 2);
  text("3", code[3][3][0] + cell[0] / 2, code[4][7][1] + cell[1] / 2);
  text("1", code[3][3][0] + cell[0] / 2, code[4][8][1] + cell[1] / 2);
  text("3", code[3][3][0] + cell[0] / 2, code[4][9][1] + cell[1] / 2);
  text("2", code[3][0][0] + cell[0] / 2, code[4][10][1] + cell[1] / 2);
  text("3", code[3][3][0] + cell[0] / 2, code[4][11][1] + cell[1] / 2);
  text("4", code[3][3][0] + cell[0] / 2, code[4][12][1] + cell[1] / 2);
  text("1", code[3][3][0] + cell[0] / 2, code[4][13][1] + cell[1] / 2);

  text("", code[2][3][0] + cell[0] / 2, code[4][4][1] + cell[1] / 2);
  text("4", code[2][3][0] + cell[0] / 2, code[4][5][1] + cell[1] / 2);
  text("2", code[2][3][0] + cell[0] / 2, code[4][6][1] + cell[1] / 2);
  text("3", code[2][3][0] + cell[0] / 2, code[4][7][1] + cell[1] / 2);
  text("2", code[2][3][0] + cell[0] / 2, code[4][8][1] + cell[1] / 2);
  text("2", code[2][3][0] + cell[0] / 2, code[4][9][1] + cell[1] / 2);
  text("2", code[2][0][0] + cell[0] / 2, code[4][10][1] + cell[1] / 2);
  text("2", code[2][3][0] + cell[0] / 2, code[4][11][1] + cell[1] / 2);
  text("2", code[2][3][0] + cell[0] / 2, code[4][12][1] + cell[1] / 2);
  text("8", code[2][3][0] + cell[0] / 2, code[4][13][1] + cell[1] / 2);

  text("", code[1][3][0] + cell[0] / 2, code[4][4][1] + cell[1] / 2);
  text("1", code[1][3][0] + cell[0] / 2, code[4][5][1] + cell[1] / 2);
  text("2", code[1][3][0] + cell[0] / 2, code[4][6][1] + cell[1] / 2);
  text("", code[1][3][0] + cell[0] / 2, code[4][7][1] + cell[1] / 2);
  text("4", code[1][3][0] + cell[0] / 2, code[4][8][1] + cell[1] / 2);
  text("", code[1][3][0] + cell[0] / 2, code[4][9][1] + cell[1] / 2);
  text("3", code[1][0][0] + cell[0] / 2, code[4][10][1] + cell[1] / 2);
  text("3", code[1][3][0] + cell[0] / 2, code[4][11][1] + cell[1] / 2);
  text("1", code[1][3][0] + cell[0] / 2, code[4][12][1] + cell[1] / 2);
  text("", code[1][3][0] + cell[0] / 2, code[4][13][1] + cell[1] / 2);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    a = floor(mouseX / cell[0]);
    b = floor(mouseY / cell[0]);

    if (a >= 4 && b >= 4) {
      fill("gray");
      strokeWeight(1);
      rect(code[a][b][0], code[a][b][1], cell[0], cell[0]);
    }
  }

  if (mouseButton == RIGHT) {
    a1 = floor(mouseX / cell[0]);
    b1 = floor(mouseY / cell[0]);
    if (a >= 4 && b >= 4) {
      fill("white");
      strokeWeight(1);
      rect(code[a1][b1][0], code[a1][b1][1], cell[0], cell[0]);
    }
  }
}
