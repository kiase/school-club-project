let room1=0,room2=0,room3=0,room4=0,lobby=0
let pz1=0,pz2=0,pz3=0,pz4=0,pz1_1,pz_1_11,pz_1_12,lockpin=5347182,pinLq=419;
let box=1,box1=1,lockpinR=0,Ykey=1
let mc=0,Time=0,Redkey=0,blackkey=0;
let note,Rbox,Lbox,Bkey,end;

let dot1,dot2,dot3;

let X1=0,X2=0,X3=0;

let a=0, t=0;

let loading=0,start=0;

let R_lobby,R1,R2,R3,R4,R_h,R_h_claer;
let R1_d_1,R1_d_11,R1_d112,R1_d_2,R1_d_2_clear,R2_open,pz1_open;
let arrowL , arrowR
let R3_open,R3_drop,R3_solve
let light_on , light_off
let map='',lock,R1_d_d,R1_d_get,Rkey,note2

function preload() {
  lockpinR=createInput()
  lockpinR.position(300, 560);
  lockpinR.hide()
  pinL=createInput()
  pinL.position(700,70)
  pinL.hide()
  R_lobby = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R_lobby.png')
  R1 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1.png')
  R1_d_1 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1_d_1.png')
  R1_d_11 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1_d_11.png')
  R1_d_112 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1_d_112.png')
  R2 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R2.png')
  R3 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R3.png')
  R3_open = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R3_open.png')
  R4 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R4.png')
  lock = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/0lock.png')
  R2_open_open = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R2_open_open.png')
  arrowL = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/0L_arrow.png')
  arrowR = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/0R_arrow.png')
  pz1_1  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/_pz1.png')
  pz_1_11  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/_pz1_1.png')
  pz_1_12  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/_pz1_2.png')
  pz1_open  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/pz1_open.png')
  R1_d_d = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1_d_d.png')
  R1_d_get = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/R1_d_get.png')
  Rkey = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/Rkey.png')
  note = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/note111.png')
  note2 = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/note2.png')
  Rbox  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/Rbox.png')
  Lbox  = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/Lbox.png')
  Bkey = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/Bkey-1.png')
  end = loadImage('https://raw.githubusercontent.com/kiase/school-club-project/main/project/game4/image/ending.png')
}




setInterval(() => Time++, 300);
//시간 함수

function setup() {
  createCanvas(800, 600);
   background(0);  
}

function sleep(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
//딜레이 함수

async function draw() {
   console.log(mouseX,mouseY,box1,map,box,Redkey)
  if(loading>=2 && start==0){
    if(Time==1){
      X1=-10
      X2=0
      X3=0
      t=t+20
    }else if(Time==2){
      X1=0
      X2=-10
      X3=0
      t=t+20
    }else if(Time>=3){
      X1=0
      X2=0
      X3=-10
      Time=0
      t=t+20
    }
    
    background(255)
    textSize(50);
    stroke('black');
    strokeWeight(2);
    fill('black')
    text('Now Loading',230,height/2-100)
    text('.',535,200+X1)
    text('.',545,200+X2)
    text('.',555,200+X3)
    rect(30,height/2,740,30)
    fill('white')
    rect(30,height/2,t,30) 
    }//로딩화면
    if(t==740){
      start++
      lobby=1
      t++
      map='R1'
  }//로비 입장
 
  
  
  if(lobby==1){
    background(0)
    image(R_lobby,0,0);
    text('방탈출',30,50)
    text('시작하기',width-250,height-100)
    
  } //로비
  
  if(lobby==1 && mouseX>540 && mouseY>450 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();  
      lobby=0
      room1=1
     }//시작
  
  
  if(room1==1){
    image(eval(map),0,0)
    if(map=='R1' && mouseX>83 && mouseX<313 && mouseY>334 && mouseY<512 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_1'
    }//서랍
    if(map=='R1_d_1'&& box==1 && mouseX>57 && mouseX<754 && mouseY>200 && mouseY<356 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_11'
      }//서랍 열기
    if(map=='R1_d_1'&& box==0 && mouseX>57 && mouseX<754 && mouseY>200 && mouseY<356 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_112'
      }//서랍 상자 먹기
    if(map=='R1_d_1' && mouseX>583 && mouseX<672 && mouseY>526 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1'
    }//돌아가기
    if(map=='R1_d_11' && mouseY<256 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_1'
    } //돌아가기
    if(map=='R1_d_11' && mouseX>450 && mouseX<600 && mouseY>306 && mouseY<426 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_112'
      box=0
  }//템 먹기
    if(map=='R1_d_112'&& mouseY<230 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop();
      map='R1_d_1'
      }//돌아가기
    if(map=='R1'&&mouseX<80 && mouseY<555 && mouseY>460 && mouseIsPressed===true){
      map='R2'
      room1=0
      room2=1
    }//왼 화살표
    if(map=='R1'&&mouseX<755 && mouseX>690 && mouseY<500 && mouseY>440 && mouseIsPressed===true){
      noLoop();
      await sleep(100)
      loop(); 
      room1=0
      room4=1
      map='R4'
    }//오 화살표
    if(map=='R1_d_1'&&Ykey==1&&mouseIsPressed===true&&mouseX<570&&mouseY>420){
      noLoop();
      await sleep(100)
      loop(); 
      map='R1_d_d'
      
    }
    if(map=='R1_d_1'&&Ykey==0&&mouseIsPressed===true&&mouseX<570&&mouseY>420){
      noLoop();
      await sleep(100)
      loop(); 
      map='R1_d_get'
      
    }
    if(map=='R1_d_d'&&Ykey==1&&mouseIsPressed===true&&mouseX>230&&mouseX<435&&mouseY>360&&mouseY<430){
      noLoop();
      await sleep(100)
      loop(); 
      map='R1_d_get'
      Ykey=0
      Time=0
    }
    if(mouseIsPressed===true&&map=='R1_d_get'&&mouseY<300){
      map='R1_d_1'
    }
    if(Ykey==0&&box==0){
      
      image(Rkey,100,100)
        if(Time==3){
          image(eval(map),0,0)
          box=-1
          Redkey=1
          Ykey=-1
          
        }
    }
    if(map=='R1_d_11'&&mouseIsPressed===true){
      Time=0
    if(mouseIsPressed===true&&mouseX>85&&mouseX<250&&mouseY>300&&mouseY<500){
      image(note,0,0)
        if(Time==2){
          image(map,0,0)
        }
       }
    }
    if(mouseIsPressed===true&&mouseX>730&&mouseX<760&&mouseY>340&&mouseY<380&&blackkey==2){
      room1=0
      room2=0
      room3=0
      room4=0
      image(end,0,0)
      noLoop()
    }
    
  } 
  if(room2==1){
    image(eval(map),0,0);
    if(map=='R2'&&mouseIsPressed===true&&mouseX<80&&mouseY<480&&mouseY>380){
      noLoop();
      await sleep(100)
      loop(); 
      room2=0
      room3=1
      map='R3'
    }
    if(map=='R2'&&mouseIsPressed===true&&mouseX>685&&mouseY<470&&mouseY>380){
      noLoop();
      await sleep(100)
      loop(); 
      room2=0
      room1=1
      map='R1'
    }
    if(map=='R2_open_open'&&mouseIsPressed===true&&mouseX<80&&mouseY<480&&mouseY>380){
      noLoop();
      await sleep(100)
      loop(); 
      room2=0
      room3=1
      map='R3'
    }
    if(map=='R2_open_open'&&mouseIsPressed===true&&mouseX>685&&mouseY<470&&mouseY>380){
      noLoop();
      await sleep(100)
      loop(); 
      room2=0
      room1=1
      map='R1'
    }
    
    
    if(map=='R2'&& mouseX>572&&mouseX<617&&mouseX>572&&mouseY>375&&mouseY<408&& mouseIsPressed===true){
      noLoop()
      await sleep(100)
      loop()
      map='lock'
    }
    if(map=='lock'&&mouseX>125&&mouseX<586&&mouseY>439&&mouseY<555&&mouseIsPressed===true){
      noLoop()
      await sleep(100)
      loop()
      lockpinR.show()
        if(lockpin==int(lockpinR.value())){
          map='R2_open_open'
          lockpinR.hide()
          
        }
    }else if(map=='lock'&&mouseY<445&&mouseIsPressed===true){
      noLoop()
      await sleep(100)
      loop()       
      map='R2'
      lockpinR.hide()
      }  
    if(box1==1&&map=='R2_open_open'){
            image(Rbox,0,0)
          }
          if(mouseIsPressed===true&&mouseX>513&&mouseX<577&&mouseY>233&&mouseY<272&&map=='R2_open_open'){
            box1=0
            
          }
  }
  
  if(room3==1){
    image(eval(map),0,0)
    image(arrowL,0,450)
    image(arrowR,width-70,450)
    if(map=='R3'&&mouseIsPressed===true&&mouseX<70&&mouseY>450){
      noLoop();
      await sleep(100)
      loop(); 
      room4=1
      room3=0
      map='R4'
    }
    if(map=='R3'&&mouseIsPressed===true&&mouseX>width-70&&mouseY>450){
      noLoop();
      await sleep(100)
      loop(); 
      room2=1
      room3=0
      map='R2'
    }
    if(mouseIsPressed===true&& mouseX<560&&mouseY<260){
      map='pz1_1'
    }
    if(map=='pz1_1'&&mouseIsPressed===true&&mouseX>100&&mouseX<200&&mouseY>300&&mouseY<360){
      map='pz_1_11'
      noLoop();
      await sleep(100);
      loop();
      pz1=pz1+1
      map='pz1_1'
    }
    if(map=='pz1_1'&&mouseIsPressed===true&&mouseX>590&&mouseX<690&&mouseY>300&&mouseY<360){
      map='pz_1_12'
      noLoop();
      await sleep(100);
      loop();
      pz2=pz2+1
      map='pz1_1'
        if(pz1+pz2>=20){
         map='pz1_open' 
   } 
    }
   
    if(map=='pz1_open'&&mouseIsPressed===true&&mouseX>374&&mouseX<417&&mouseY>311&&mouseY<345){
      image(note2,0,0)
  }else if(map!='R3'&&mouseY<200&&mouseIsPressed===true){
    noLoop();
      await sleep(100);
      loop();
    map='R3'
  }
}
  
  if (room4==1){
    image(eval(map),0,0)
    image(arrowL,0,450)
    image(arrowR,width-70,450)
    if(map=='R4'&&mouseIsPressed===true&&mouseX<70&&mouseY>450){
      noLoop();
      await sleep(100)
      loop(); 
      room4=0
      room1=1
      map='R1'
    }
    if(map=='R4'&&mouseIsPressed===true&&mouseX>width-70&&mouseY>450){
      noLoop();
      await sleep(100)
      loop(); 
      room4=0
      room3=1
      map='R3'
    }
  }
   if(box1==0&&Redkey==1){
    image(Lbox,0,0)
      if(mouseIsPressed===true&&mouseX>700&&mouseY<70){
        pinL.show()
        if(pinLq==int(pinL.value())){
          Redkey=0
          pinL.hide()
          blackkey=1
          Time=0
      }
    }
  }
  if(blackkey==1){
    image(Bkey,250,200)
      if(Time==3){
        blackkey=2
      }
  }
  
  
}
function mouseClicked(){
  loading=loading+1
}