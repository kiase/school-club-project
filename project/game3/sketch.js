let canvas = [800, 800];//캔버스 크기(x, y)
let padl = 120;//패드 길이(지름)
let padt = 20;//패드 두께
let ball = 15;//공 크기(지름)
let x = canvas[0]/2, y = canvas[1]-50-padt/2-ball/2;//공 기본 위치(픽셀)
let dir = 5;//공 이동 거리
let xdir = dir, ydir = -dir;
let spm = 1;//이동 거리 배수
let spa = 0.005;//공 가속도(1 = 초당 이동거리 배수가 1씩 증가)
let block = [];//블록 배치 배열(3차원)
let onelinenum = 9;//가로 블록 배치 수
let linenum = 9;//세로 블록 배치 수
let brickY = 40;//블록 높이
let brickX = canvas[0]/onelinenum;//블록 길이
let life = 2;//목숨 수
let blockleft = onelinenum*linenum;//남은 블록 수
let Playing = false;//게임이 시작되었는지 확인
let gametime = [0, 0, 0];
let brickColor = ['green','blue','orange','yellow','aqua','red','pink','white','purple'];//벽돌색

//대기함수
function sleep(ms){
  return new Promise((resolve) => {setTimeout(resolve, ms);})
}

async function gt(){
  await sleep(100);
  gametime[2] += 1;
  if(gametime[2]>=10){
    gametime[1]+=1;
    gametime[2]=0;
  }
  if(gametime[1]>=60){
    gametime[0]+=1;
    gametime[1]=0;
  }
  gt();
}

async function gameset(){
  for(let i=0;i<20;i++){
    noStroke();
    fill('#00000018');
    rect(0, 0, width, height);
    await sleep(20);
  }
  await sleep(1000);
  fill('#ffcccc');
  textSize(70);
  text('clear!', width/2, height/5*1);
  await sleep(1000);
  textSize(50);
  text('소요 시간 : '+gametime[0]+':'+gametime[1]+'.'+gametime[2], width/2, height/5*2);
  await sleep(1000);
  text('축하합니다', width/2, height/5*3);
  await sleep(1000);
  textSize(30);
  text('이 화면을 저희에게 보여주세요!', width/2, height/5*4);
}

function setup() {
  createCanvas(canvas[0], canvas[1]);
  for(let j=0;j<linenum;j++){
    block[j]=[];
    for(let i=0;i<onelinenum;i++){
      append(block[j], [1, brickColor[int(random(0, brickColor.length))]]);
    }
  }
  gt();
  timer();
}

function gameover(){
  background(220);
  strokeWeight(0);
  fill('black');
  textSize(40);
  textAlign(CENTER);
  text('Game Over..', canvas[0]/2, canvas[1]/2);
}

async function timer() {
  for(let i=3;i>0;i--){
    background(220);
    strokeWeight(0);
    fill('black');
    textSize(100);
    textAlign(CENTER);
    text(i, canvas[0]/2, canvas[1]/2+80);
    strokeWeight(0);
    fill('#FF00006D');
    for(let j=0;j<life;j++){
      rect(20+j*(50), height-50, 30, 30, 10, 10, 10, 10);
    }
    await sleep(1000);
  }
  Playing = true;
}

function draw() {
  let padY = height-50;
  //게임 시작 전 상태
  if(Playing == false){
    //벽돌, 패드, 공을 정지한 상태로 유지
    stroke('#000000');
    strokeWeight(padt);
    line(canvas[0]/2-padl/2, padY, canvas[0]/2+padl/2, padY);
    
    stroke('#ffff00');
    fill('#ffff00');
    circle(x, y, ball);
    
    stroke('black');
    strokeWeight(2);
    for(let j=0;j<linenum;j++){
      for(let i=0;i<onelinenum;i++){
        if(block[j][i][0]==1){
          fill(block[j][i][1]);
          rect(i*brickX, brickY*j, brickX, brickY);
        }
      }
    }
  }
  //게임 시작 후 상태
  else{
    background(220);
    //벽돌 그리기
    stroke('black');
    strokeWeight(2);
    for(let j=0;j<linenum;j++){
      for(let i=0;i<onelinenum;i++){
        if(block[j][i][0]==1){
          fill(block[j][i][1]);
          rect(i*brickX, brickY*j, brickX, brickY);
        }
      }
    }
    if(blockleft==0){
      noLoop();
      gameset();
    }
    //목숨 그리기
    strokeWeight(0);
    fill('#FF00006D');
    for(let i=0;i<life;i++){
      rect(20+i*(50), height-50, 30, 30, 10, 10, 10, 10);
    }
    //패드 그리기
    stroke('#000000');
    strokeWeight(padt);
    if(mouseX<0){
      line(0-padl/2, padY, 0+padl/2, padY);
    }
    else if(mouseX>width){
      line(width-padl/2, padY, width+padl/2, padY);
    }
    else{
      line(mouseX-padl/2, padY, mouseX+padl/2, padY);
    }
    //공 그리기
    stroke('#ffff00');
    fill('#ffff00');
    circle(x, y, ball);
    //공 이동
    x+=xdir*spm;
    y+=ydir*spm;
    spm+=spa/60;
  //벽, 패드 충돌 판정
    if(x>width-ball/2){
      x = width-ball/2;
    }
    if(x<ball/2){
      x = ball/2;
    }
    if(y>height-ball/2){
      y = height-ball/2;
    }
    if(y<ball/2){
      y = ball/2;
    }
    if(mouseX-padl/2-padl/10<=x+ball/2&&mouseX+padl/2+padl/10>=x+ball/2&&padY-padt/2<=y&&padY+padt/2>=y){
      y = padY-padt/2;
      ydir = -ydir
    }
    if(x==ball/2||x==width-ball/2){
      xdir = -xdir;
    }
    else if(y==ball/2){
      ydir = -ydir;
    }
    //y축 하단부 충돌시에는 사망 처리, 게임 재시작
    else if(y==height-ball/2){
      ydir = -ydir;
      Playing = false;
      x = width/2;
      y = height-50-padt/2-ball/2;
      life-=1;
      spm = 1;
      if(life<0){
        gameover();
      }
      else{
        timer();
      }
    }
  }
  //벽돌 충돌 판정
    for(let j=0;j<linenum;j++){
      //y축 하단부
      if(brickY*j+(brickY/2)<y-ball/2 && y-ball/2<brickY*(j+1) && block[j][int(x/brickX)][0]==1){
        block[j][int(x/brickX)][0]=0;
        blockleft-=1;
        ydir = -ydir;
        y = brickY*(j+1)+ball/2;
      }
      //y축 상단부
      else if(brickY*j+(brickY/2)>y+ball/2 && y+ball/2>brickY*(j) && block[j][int(x/brickX)][0]==1){
        block[j][int(x/brickX)][0]=0;
        blockleft-=1;
        ydir = -ydir;
        y = brickY*(j)-ball/2;
      }
    }
    for(let i=0;i<onelinenum;i++){
      //x축 우측
      if(brickX*i+(brickX/2)<x-ball/2 && x-ball/2<brickX*(i+1) && y<brickY*linenum && block[int(y/brickY)][i][0]==1){
        block[int(y/brickY)][i][0]=0;
        blockleft-=1;
        xdir = -xdir;
        x = brickX*(i+1)+ball/2;
      }
      //x축 좌측
      else if(brickX*i+(brickX/2)>x+ball/2 && x+ball/2>brickX*(i) && y<brickY*linenum && block[int(y/brickY)][i][0]==1){
        block[int(y/brickY)][i][0]=0;
        blockleft-=1;
        xdir = -xdir;
        x = brickX*(i)-ball/2;
      }
    }
}