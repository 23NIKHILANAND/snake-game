const cvs =document.getElementById("snake");
const ctx =cvs.getContext("2d")

const box=32;

const ground = new Image();
ground.src ="img/ground.png";

const foodImg =new Image();  
foodImg.src ="img/food.png";

const dead =new Audio();
const  eat=new Audio();
const up=new Audio();
const left=new Audio();
const right= new Audio();
const down = new Audio();

dead.src="audio/dead.mp3"
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
// left.src="audio/left.mp3";
// right.src="audio/right.mp3";
// down.src="audio/down.mp3";



let snake=[];
snake[0]={
    x : 9 * box,
    y : 10 * box
}


 let food ={
     x : Math.floor(Math.random()*17+1)*box,
     y : Math.floor(Math.random()*15+3)*box
 }

 let score=0;

 let d

 document.addEventListener("keydown",direction);

 function direction(event){
     let key = event.keyCode;
     if(event.keyCode == 37  && d != "Right"){
         d="Left";
         left.play();
     }
     else if(event.keyCode == 38 && d != "Down"){
        d="Up";
        up.play();
    }
    else if(event.keyCode == 39 && d != "Left"){
        d="Right";
        right.play();
    }
    else if(event.keyCode == 40 && d != "Up"){
        d="Down";
        down.play();
    }


 }

 //check for collision
  function collision(head,array){
      for(let i=0;i<array.length; i++){
          if(head.x == array[i].x && head.y== array[i].y){
              return true
          }
      }
      return false;
  }

  function draw(){
      ctx.drawImage(ground,0,0)

      for(let i=0;i < snake.length;i++){
          ctx.fillStyle = (i==0) ? "green" : "white";
          ctx.fillRect(snake[i].x,snake[i].y,box,box);

          ctx.strokeStyle="red";
          ctx.strokeRect(snake[i].x,snake[i].y,box,box);

      }
      ctx.drawImage(foodImg,food.x,food.y);
     //old head position
      let snakeX =snake[0].x;
      let snakeY =snake[0].y;

       //which direction to remove
       if(d == "Left") snakeX -= box;
       if(d == "Up") snakeY -= box;
       if(d == "Right") snakeX += box;
       if(d == "Down") snakeY += box;

      //if snake eats food
      if(snakeX == food.x && snakeY == food.y){
          score++;
          eat.play();
          food = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
          }

        } 
          else{
               //remove tail
                 snake.pop();

          }

          let newHead ={
            x : snakeX,
            y : snakeY
        }
        //game over
          if(snakeX <box || snakeX > 17 * box || snakeY <3*box ||snakeY >17*box  || collision(newHead,snake)){
              clearInterval(game);
              dead.play();
          }
      //add new head
      
      snake.unshift(newHead);

      ctx.fillStyle="white";
      ctx.font ="20px change one";
      ctx.fillText(score,2*box,1.6*box);
  }
  let game=setInterval(draw,100)