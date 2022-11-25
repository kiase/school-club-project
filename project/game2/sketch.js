var Rain = [];
var score;
let a=0;
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
  Rain.push(new ql);
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
  text('점수'+score.count+'점', width/2, height/5*2);
  await sleep(1000);
  if(score.count>=5000){
    text('축하합니다', width/2, height/5*3);
    await sleep(1000);
    textSize(30);
    text('이 화면을 저희에게 보여주세요!', width/2, height/5*4);
  }
}

function draw(){
  background(0,0,0);
  box.render();
  score.render();
  for(var j = 0;j<Rain.length;j++){
    Rain[j].render();
  }
 
  if(frameCount%241==0){
    addRain();
  }
  if(frameCount%477==0){
    addRain();
  }
}
function addRain(){
  for(var i = 0;i <1;i++){
    Rain.push(new ql);
   
  }
}

class Player{
  constructor(){
    this.x=0;
    this.y=0;
    this.size=35;
    this.speed=10;
    this.hp=240;
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
  health(){
    fill('green');
    rect(20,20,this.hp * 3, 30);
  }
}
class Score{
  constructor(){
    this.count=0;
    
  }
  render(){
    fill(255,255,255);
    textSize(50);
    textAlign(CENTER);
    text(this.count,width/2,80);
    
    if(box.hp <= 0){
      noLoop();
      gameset();
      push();
      

}
}
}
class ql{
    constructor(){
        this.x = random(20 , width -10);
        this.y = -100;
        this.w = 5;
        this.h = 60;
        this.m = this.h / this.w;
    }
    render(){
        this.update();
        fill('lightblue');
        rect(this.x, this.y, this.w, this.h);
    }
    update(){
        this.y += this.m;
 
        if(this.y > height + this.h){
            this.x = random(10 , width -10);
            this.y = -200;
        }
 
        if(box.y < this.y + this.h + 10 ){
            if(box.hp != 0){
                if(box.x < this.x && box.x + box.size > this.x + this.w){
                    this.stop();
                    score.count -= 5;
                }else{
                    if(this.y > height){
                    score.count += 1;
                    }
                }
            }
        }
    }
    stop(){
        this.x = random(10 , width -10);
        this.y = -100;
        box.hp -= 23;
    }
}
