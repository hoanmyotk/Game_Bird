var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');
var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
var gameoverimg = new Image();
var nhay = document.getElementById('nhay');
gameoverimg.src="gameover.png"
birdimg.src="bird.png";
hinhnenchinh.src="nenchinh.png";
ongtren.src="ongtren.png";
ongduoi.src="ongduoi.png";

var score=0;
var khoangcachhaiong=140; //khoảng cách giữa 2 ống
var khoangcachdenongduoi; // khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
// chym
var bird={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var gameover={
    x: hinhnenchinh.width/2.5,
    y: hinhnenchinh.height/2
}
var ong=[]; //tạo mảng ống để chứa các ống di chuỷen
ong[0]={
    x:canvas.width,
    y:0 
}

//tạo function để chạy trò chơi
function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        // vị trí ống trên cộng khoảng cách đến
        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x-=2; //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x ==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
            })
        }
        if(ong[i].x==bird.x)score++;
        // nếu ống đụng lề trái thì xóa nó đi 
        if(ong[i].x ==0 )ong.splice(0,1);    
        // gameover
        if(bird.y+birdimg.height==canvas.height||
        bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
        && (bird.y<=ong[i].y+ongtren.height||
        bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
        ){
            context.drawImage(gameoverimg, gameover.x, gameover.y)
            return;
        }                   
    }

    scoreshow.innerHTML="score: "+score;
    // cho bird rơi xuống
    bird.y+=2;
    requestAnimationFrame(run);
}
document.addEventListener("keydown",function(e){
    if (e.keyCode == 32){
        nhay.play()
        bird.y -= 60   
    }
})
run()
document.addEventListener("keydown",function(e){
    if (e.key == 'Enter'){
        this.location.reload()
    }
})
