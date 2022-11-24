var Rain = [];
var score;
let a=0;
let cantsee = false;
let bi_count = 0;
let fat = false;
function setup(){
  if(windowWidth>windowHeight){
    createCanvas(windowHeight, windowHeight);
  }
  else{
    createCanvas(windowWidth, windowWidth);
  }
  background(255,255,255);
  score=new Score();
  box=new Player();
  box.setStart();
  noStroke();
  Rain.push(new ql(5, 60, 1, 'lightblue', 10, 5, 5, -1, false));
}

function sleep(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })}

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
  text('Game over', width/2, height/5*1);
  await sleep(1000);
  textSize(50);
  text('점수'+score.counter+'점', width/2, height/5*2);
  await sleep(1000);
}

function draw(){
  background(0,0,0);
  if(cantsee==true){
    for(var j = 0;j<Rain.length;j++){
      Rain[j].hiderender();
    }
  }else{
    for(var j = 0;j<Rain.length;j++){
      Rain[j].render();
    }
  }
  if(frameCount%30==0){
    if(fat==true){
      let i = random(0, 100);
      if(i<=5){
        box.size = 35;
        box.rs();
        fat=false;
      }
    }
    if(cantsee==true){
      let i = random(0, 10);
      if(i<=3){
        cantsee=false;
      }
    }
  }
  box.render();
  score.render();
 
  if(frameCount%251==0){
    let i = random(0, 100);
    if(i<=10){
      cantsee = true;
    }
  }
 
  if(frameCount%251==0){
    let i = random(0, 100);
    if(i<=40){
      addRain('hard');
    }
    else if(i<=45){
      addRain('speed');
    }
    else if(i<=47){
      addRain('board');
    }
    else if(i<=49){
      addRain('heal');
    }
    else if(i<=50){
      addRain('blood');
    }
    else{
      addRain('normal');
    }
  }
  if(bi_count>=6){
    bi_count = 0;
    box.size = 80;
    box.rs();
  }

  if(frameCount%631==0){
    bi_count = 0;
    let i = random(0, 100);
    if(i<=35){
      addRain('hard');
    }
    else if(i<=45){
      addRain('speed');
    }
    else if(i<=50){
      addRain('board');
    }
    else if(i<=57){
      addRain('heal');
    }
    else if(i<=62){
      addRain('blood');
    }
    else{
      addRain('normal');
    }
  }

  if(frameCount%1087==0){
    let i = random(0, 100);
    if(i<=35){
      addRain('hard');
    }
    else if(i<=50){
      addRain('speed');
    }
    else if(i<=60){
      addRain('board');
    }
    else if(i<=75){
      addRain('heal');
    }
    else if(i<=85){
      addRain('blood');
    }
    else{
      addRain('normal');
    }
  }

  if(frameCount%1303==0){
    addRain('infrain');
  }

}
function addRain(type){
  for(var i = 0;i <1;i++){
    if(type=='normal'){
      Rain.push(new ql(5, 60, 1+random(-0.1, 0.1), 'lightblue', 10, 5, 5, round(random(15, 30)), true));
    }
    else if(type=='hard'){
      Rain.push(new ql(5, 60, 1.4+random(-0.1, 0.1), 'red', 15, 30, 5, round(random(5, 30)), true));
    }
    else if(type=='heal'){
      Rain.push(new ql(10, 60, 0.8+random(-0.1, 0.1), 'green', -60, 0, 0, 4, true));
    }
    else if(type=='speed'){
      Rain.push(new ql(5, 120, 4+random(-1, 3), 'lightpurple', 7, 3, 0, round(random(15, 30)), false));
    }
    else if(type=='infrain'){
      Rain.push(new ql(5, 60, 1+random(-0.1, 0.1), 'lightblue', 10, 5, 5, -1, false));
    }
    else if(type=='board'){
      Rain.push(new ql(300, 20, 0.6+random(0, 0.2), 'blue', 30, 30, 0, round(random(3, 7)), true));
    }
    else if(type=='blood'){
      Rain.push(new ql(20, 100, 1.4+random(-0.1, 0.1), 'darkred', 50, 400, 20, round(random(3, 10)), true));
    }
    
  }
}

class Player{
  constructor(){
    this.x=0;
    this.y=0;
    this.size=35;
    this.speed=10;
    this.hp=150;
    }
  
  render(){
    this.health();
    this.update();
    fill(255,255,255);
    textSize(20);
    textAlign(CENTER);
    text("Player",this.x+this.size/2,this.y-this.size+10);
    rect(this.x,this.y,this.size,this.size);
  }
  update(){
    this.controller();
    if(this.x > width-this.size){
      this.x=width-this.size;
    }else if(this.x<0){
        this.x=0;
    }
  }
  controller(){
    if(windowWidth>windowHeight){
      if(keyIsDown(LEFT_ARROW)){
           this.x-=this.speed;
      } 
      if(keyIsDown(RIGHT_ARROW)){
        this.x+=this.speed;
      }
    }
    else{
      if(keyIsDown(LEFT_ARROW)){
           this.x-=this.speed;
      } 
      if(keyIsDown(RIGHT_ARROW)){
        this.x+=this.speed;
      }
      if(mouseIsPressed&&pmouseX>mouseX){
           this.x+=mouseX-pmouseX;
      }
      if(mouseIsPressed&&pmouseX<mouseX){
           this.x+=mouseX-pmouseX;
      }
    }
  }
  setStart(){
    this.x=width/2-this.size/2;
    this.y=height-this.size-2;
  }
  rs(){
    this.y=height-this.size-2;
  }
  health(){
    fill('green');
    rect(20,20,this.hp * 3, 30);
    textSize(20);
    fill('white');
    textAlign(CENTER);
    text(this.hp, 40, 40);
  }
}
class Score{
  constructor(){
    this.count=0;
    this.counter=0;
  }
  display(){
    if(this.count>9999){
      this.counter='足??쩌쭐';
    }else{
      this.counter=this.count;
    }
  }
  render(){
    fill(255,255,255);
    textSize(50);
    textAlign(CENTER);
    this.display();
    text(this.counter,width/2,80);
    if(box.hp <= 0){
      noLoop();
      gameset();
      push();
      

}
}
}
class ql{
    constructor(w, h, v, c, d, pd, pi, life, dead){
        this.x = random(20 , width -10);
        this.y = -100;
        this.w = w;
        this.h = h;
        this.v = v;
        this.c = c;
        this.d = d;
        this.pd = pd;
        this.pi = round(pi/5);
        this.m = this.h / this.w * this.v;
        this.dead = dead;
        this.life = life;
    }
    render(){
        this.update();
        fill(this.c);
        rect(this.x, this.y, this.w, this.h);
    }
    hiderender(){
        this.update();
    }
    update(){
        this.y += this.m;
 
        if(this.y > height + this.h){
            this.x = random(10 , width -10);
            this.y = -200;
            this.life -= 1;
            if(this.life==0){
              this.remove();
            }
        }
 
        if(box.y < this.y + this.h + 10 ){
            if(box.hp > 0){
                if(box.x < this.x && box.x + box.size > this.x + this.w){
                    this.damaged();
                    bi_count += 1;
                    score.count -= this.pd;
                }else{
                    if(this.y > height){
                    score.count += this.pi;
                    }
                }
            }
        }
    }
    damaged(){
      this.x = random(10 , width -10);
      this.y = -100;
      box.hp -= this.d;
      if(this.dead==true){
        this.remove();
      }
    }
    remove(){
        this.x = random(10 , width -10);
        this.y = -100;
        this.w = 0;
        this.h = 0;
    }
}
