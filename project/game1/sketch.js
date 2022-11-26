
class grid{
  constructor(gx, gy, gw, gh, rx, ry){
    this.gridX = gx;
    this.gridY = gy;
    this.gridWidth = gw;
    this.gridHeight = gh;
    this.rangeX = rx;
    this.rangeY = ry;
    this.cellWidth = this.gridWidth/this.rangeX;
    this.cellHeight = this.gridHeight/this.rangeY;
  }
  
  draw(){
    strokeWeight(1);
    for(let i=0;i<=this.rangeX;i++){ //세로줄
      line(this.gridWidth/this.rangeX*i, this.gridY, this.gridWidth/this.rangeX*i, this.gridY+this.gridHeight);
    }
    for(let i=0;i<=this.rangeY;i++){ //가로줄
      line(this.gridX, this.gridHeight/this.rangeY*i, this.gridX+this.gridWidth, this.gridHeight/this.rangeY*i);
    }
  }
  
  getCell(x, y){
    let r = [];
    if(x>=0&&x<this.rangeX){
      append(r, this.gridWidth/this.rangeX*x);
    }
    else{
      append(r, null);
    }
    if(y>=0&&y<this.rangeY){
      append(r, this.gridHeight/this.rangeY*y);
    }
    else{
      append(r, null);
    }
    append(r, this.gridWidth/this.rangeX);
    append(r, this.gridHeight/this.rangeY);
    return {x: r[0], y: r[1], width: r[2], height: r[3]}
  }
  
}
class block{
  constructor(xpos, ypos, w, h, tag, tagsize) {
    this.x = xpos;
    this.y = ypos;
    this.width = w;
    this.height = h;
    this.blockColor = '#f6cccc';
    this.count = 10;
    this.tag = tag;
    this.tagColor = '#000000';
    this.tagSize = tagsize;
    this.trigger = false;
  }
  
  draw(){
    fill(this.blockColor);
    stroke('#000000');
    rect(this.x, this.y, this.width, this.height);
  }
  
  tagDraw(){
    fill(this.tagColor);
    noStroke();
    textSize(this.tagSize);
    textAlign(CENTER, CENTER);
    text(this.tag, this.x+this.width/2, this.y+this.height/2);
  }
  
  move(x, y){
    this.x+=x
    this.y+=y
  }
  
  set(x, y){
    this.x=x
    this.y=y
  }
  
  onClick(){
    if(this.x<mouseX&&this.x+this.width>mouseX&&
       mouseIsPressed==true&&
       this.y<mouseY&&this.y+this.height>mouseY){
      return true;
    }
    else{
      return false;
    }
  }
  
  getCenter(){
    let Rside = [this.x+this.width, this.y+this.height/2];
    let Lside = [this.x, this.y+this.height/2];
    let Tside = [this.x+this.width/2, this.y];
    let Bside = [this.x+this.width/2, this.y+this.height];
    let center = [this.x+this.width/2, this.y+this.height/2];
    return {Rside, Lside, Tside, Bside, center};
  }
  
}
let puzzle = [];
let volume = [];
let g;
let clicked_block = [];
let move_count = 0;
let changed = false;
let cvsize;
let input, button=[];
let sta_call=false;
let gametime=[0, 0, 0];

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

function checker(){
  let a=0;
  for(let i=0;i<sqrt(puzzle.length);i++){
    for(let j=0;j<sqrt(puzzle.length)-1;j++){
      if(round(puzzle[i*sqrt(puzzle.length)+j].getCenter().Rside[0], 7)==
         round(puzzle[i*sqrt(puzzle.length)+j+1].getCenter().Lside[0], 7)&&
         round(puzzle[i*sqrt(puzzle.length)+j].getCenter().Rside[1], 7)==
         round(puzzle[i*sqrt(puzzle.length)+j+1].getCenter().Lside[1], 7)){
        a+=1;
      }
    }
    try{
      if(round(puzzle[i*sqrt(puzzle.length)].getCenter().Bside[0], 7)==
         round(puzzle[(i+1)*sqrt(puzzle.length)].getCenter().Tside[0], 7)&&
         round(puzzle[i*sqrt(puzzle.length)].getCenter().Bside[1], 7)==
         round(puzzle[(i+1)*sqrt(puzzle.length)].getCenter().Tside[1], 7)){
        a+=1;
      }
    }
    catch(e){}
  }
  if(a==(sqrt(puzzle.length)-1)*sqrt(puzzle.length)+sqrt(puzzle.length)-1){
    return true;
  }
  else{
    return false;
  }
}

async function block_swap(class1, class2, ms, mult){
  let pos1 = [class1.x, class1.y];
  let pos2 = [class2.x, class2.y];
  let v1 = createVector(class1.getCenter().center[0], class1.getCenter().center[1]);
  let v2 = createVector(class2.getCenter().center[0], class2.getCenter().center[1]);
  let v3 = v1.copy();
  v3.mult(-1);
  v3.add(v2);
  let v4 = v2.copy();
  v4.mult(-1);
  v4.add(v1);
  for(let j=1;j<=mult;j++){
    vec = [v1.copy(), v2.copy(), v3.copy(), v4.copy()];
    vec[2].div(mult).mult(j);
    vec[3].div(mult).mult(j);
    vec[0].add(vec[2]);
    vec[1].add(vec[3]);
    class1.set(vec[0].x-class1.width/2, vec[0].y-class1.height/2);
    class2.set(vec[1].x-class2.width/2, vec[1].y-class2.height/2);
    await sleep(ms);
  }
  class1.set(pos2[0], pos2[1]);
  class2.set(pos1[0], pos1[1]);
}

async function gameset(){
  for(let i=0;i<20;i++){
    noStroke();
    fill('#00000018');
    rect(0, 0, cvsize, cvsize);
    await sleep(20);
  }
  await sleep(1000);
  fill('#ffcccc');
  textSize(70);
  text(g.rangeX+' X '+g.rangeY, cvsize/2, cvsize/5*1);
  await sleep(1000);
  textSize(50);
  text('사이즈 퍼즐 완료', cvsize/2, cvsize/5*2);
  await sleep(1000);
  text('소요 시간 : '+gametime[0]+':'+gametime[1]+'.'+gametime[2], cvsize/2, cvsize/5*3);
}

function sleep(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })}

async function starter(level){
  if(sta_call==false){
    sta_call = true;
  }
  let pz_level = level;
  g = new grid(0, 0, cvsize, cvsize, pz_level, pz_level);
  for(let i=0;i<g.rangeY;i++){
    for(let j=0;j<g.rangeX;j++){
      if(level<=5){
        append(puzzle, new block(g.cellWidth*j,g.cellHeight*i,g.cellWidth, g.cellHeight, i*g.rangeX+j+1, 40));
      }else if(level<=14){
        append(puzzle, new block(g.cellWidth*j,g.cellHeight*i,g.cellWidth, g.cellHeight, i*g.rangeX+j+1, 25));
      }else{
        append(puzzle, new block(g.cellWidth*j,g.cellHeight*i,g.cellWidth, g.cellHeight, i*g.rangeX+j+1, 15));
      }
    }
  }
  for(let i=0;i<g.rangeX*g.rangeY;i++){
    append(volume, i);
  }
  shuffle(volume, true);
  for(let i=0;i<puzzle.length;i++){
    puzzle[i].set(g.cellWidth*(floor(volume[i]/g.rangeX)), g.cellHeight*(volume[i]%g.rangeY));
    if(puzzle.length-1==i){
      puzzle[i].blockColor = '#ffffff00';
      puzzle[i].tagColor = '#ffffff00';
      puzzle[i].trigger = null;
    }
  }
  await sleep(500);
  gt();
  loop();
}

function setup() {
  noLoop();
  if(windowWidth>windowHeight){
    createCanvas(windowHeight-100, windowHeight);
    cvsize = windowHeight-100
  }
  else{
    createCanvas(windowWidth, windowWidth+100);
    cvsize = windowWidth
  }
  background(220);
  textAlign(CENTER, CENTER);
  textSize(30);
  text('퍼즐 크기를 선택하세요', width/2, height/5);
  for(let i=0;i<20;i++){
    button[i] = createButton((i+2)+'x'+(i+2));
    button[i].size(60, 60);
    button[i].position(windowWidth/2-width/4+width/6*(i%4), height/3+80*floor(i/4));
    button[i].mousePressed(eval('ff'+(i+2)));
  }
}
function bth(){
  for(let i=0;i<button.length;i++){
    button[i].hide();
  }
  text('퍼즐 제작중..', width/2, height/5*4);
}
function ff2(){bth();starter(2);}
function ff3(){bth();starter(3);}
function ff4(){bth();starter(4);}
function ff5(){bth();starter(5);}
function ff6(){bth();starter(6);}
function ff7(){bth();starter(7);}
function ff8(){bth();starter(8);}
function ff9(){bth();starter(9);}
function ff10(){bth();starter(10);}
function ff11(){bth();starter(11);}
function ff12(){bth();starter(12);}
function ff13(){bth();starter(13);}
function ff14(){bth();starter(14);}
function ff15(){bth();starter(15);}
function ff16(){bth();starter(16);}
function ff17(){bth();starter(17);}
function ff18(){bth();starter(18);}
function ff19(){bth();starter(19);}
function ff20(){bth();starter(20);}
function ff21(){bth();starter(21);}

function draw(){
  if(sta_call==false){
    return null;
  }
  background(220);
  g.draw();
  for(let i=0;i<puzzle.length;i++){
    puzzle[i].draw();
    puzzle[i].tagDraw();
  }
  fill('#6666ff');
  strokeWeight(1);
  textSize(40);
  textAlign(CENTER,CENTER);
  text('블록 이동 횟수 : '+move_count+'회', width/2, width+((height-width)/2)-12);
  textSize(13);
  if(changed==false){
  text('최초 1회에 한해, 빈칸 휠 클릭으로 마지막 두 번호의 위치를 바꿀 수 있습니다. ['+int(puzzle.length-2)+'↔'+int(puzzle.length-1)+']', width/2, width+((height-width)/2)+20);
  }
  else if(changed==null){
  text('위치를 바꾸고 있습니다...', width/2, width+((height-width)/2)+20);
  }
  else{
  text('위치를 바꾸었습니다! 더이상 바꿀 수 없습니다.', width/2, width+((height-width)/2)+20);
  }
}

async function mousePressed() {
  if(sta_call==false){
    return null;
  }
  for(let i=0;i<puzzle.length;i++){
    if(puzzle[i].onClick()==true&&puzzle[i].trigger==false){
      puzzle[i].blockColor = '#ff0000';
      puzzle[i].trigger = true;
      if(round(puzzle[i].getCenter().Rside[0], 7)==round(puzzle[puzzle.length-1].getCenter().Lside[0], 7)&&
         round(puzzle[i].getCenter().Rside[1], 7)==round(puzzle[puzzle.length-1].getCenter().Lside[1], 7)||
         round(puzzle[i].getCenter().Lside[0], 7)==round(puzzle[puzzle.length-1].getCenter().Rside[0], 7)&&
         round(puzzle[i].getCenter().Lside[1], 7)==round(puzzle[puzzle.length-1].getCenter().Rside[1], 7)||
         round(puzzle[i].getCenter().Tside[0], 7)==round(puzzle[puzzle.length-1].getCenter().Bside[0], 7)&&
         round(puzzle[i].getCenter().Tside[1], 7)==round(puzzle[puzzle.length-1].getCenter().Bside[1], 7)||
         round(puzzle[i].getCenter().Bside[0], 7)==round(puzzle[puzzle.length-1].getCenter().Tside[0], 7)&&
         round(puzzle[i].getCenter().Bside[1], 7)==round(puzzle[puzzle.length-1].getCenter().Tside[1], 7)){
        move_count+=1;
        await block_swap(puzzle[i], puzzle[puzzle.length-1], 20, 15);
        await sleep(20);
        puzzle[i].blockColor = '#f6cccc';
        puzzle[i].trigger = false;
        if(checker()==true){
          puzzle[puzzle.length-1].blockColor = '#f6cccc'
          puzzle[puzzle.length-1].tagColor = '#000000';
          noLoop();
          gameset();
        }
      }
      else{
        puzzle[i].blockColor = '#ff0000';
        puzzle[i].trigger = true;
        await sleep(200);
        puzzle[i].blockColor = '#f6cccc';
        puzzle[i].trigger = false;
      }
    }
  }
  if(windowWidth>windowHeight){
    if(puzzle[puzzle.length-1].onClick()==true&&mouseButton==CENTER&&changed==false){
      puzzle[puzzle.length-2].blockColor = '#66ff66';
      puzzle[puzzle.length-3].blockColor = '#66ff66';
      changed=null;
      await block_swap(puzzle[puzzle.length-2], puzzle[puzzle.length-3], 20, 30);
      await sleep(500);
      changed=true;
      puzzle[puzzle.length-2].blockColor = '#f6cccc';
      puzzle[puzzle.length-3].blockColor = '#f6cccc';
      if(checker()==true){
        puzzle[puzzle.length-1].blockColor = '#f6cccc'
        puzzle[puzzle.length-1].tagColor = '#000000';
        noLoop();
        gameset();
      }
    }
  }
  else{
    if(puzzle[puzzle.length-1].onClick()==true&&mouseButton==LEFT&&changed==false){
      await sleep(3000);
      if(puzzle[puzzle.length-1].onClick()==true&&mouseButton==LEFT&&changed==false){
        puzzle[puzzle.length-2].blockColor = '#66ff66';
        puzzle[puzzle.length-3].blockColor = '#66ff66';
        changed=null;
        await block_swap(puzzle[puzzle.length-2], puzzle[puzzle.length-3], 20, 30);
        await sleep(500);
        changed=true;
        puzzle[puzzle.length-2].blockColor = '#f6cccc';
        puzzle[puzzle.length-3].blockColor = '#f6cccc';
        if(checker()==true){
          puzzle[puzzle.length-1].blockColor = '#f6cccc'
          puzzle[puzzle.length-1].tagColor = '#000000';
          noLoop();
          gameset();
        }
      }
    }
  }
}
