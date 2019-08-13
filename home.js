



/*2048*/
window.onload = function () {

    //整个界面的宽高
    var window = document.getElementsByClassName("window")[0];
    var SCREEN_Width  = window.clientWidth;
    var SCREEN_Height = window.clientHeight;
    
    //游戏区域滑块的尺寸
    var GAME_TILED_WIDTH  =  55 * SCREEN_Width/320;
    var GAME_TILED_HEIGTH =  GAME_TILED_WIDTH;

    //游戏滑块边框和间隙的宽度
    var GAME_TILED_BOARD_WIDTH = 12;

    //游戏滑块行数和列数
    var GAME_ROWS  = 4;
    var GAME_COLS  = 4;

    //游戏结束弹出框的尺寸
    var ALERT_WIDTH  = 260 *SCREEN_Width/320;
    var ALERT_HEIGHT = 360 *SCREEN_Width/320;

    //游戏界面下方按钮尺寸
    var BTN_SIZE = 55 *SCREEN_Width/320;
    
    
    //游戏界面部分颜色
    var GAMEBACKCOLOR = "rgb(62,  78,  91)"; 
    var SCORECOLOR    = "rgb(39,  55,  67)";   
    var TILEDCOLOR    = "rgb(128, 141, 146)";
    //数字颜色
    var TILEDColor    = "rgb(90,  111, 127)";
    var DBTILEDColor  = "rgb(248, 245, 245)";
    
    
    
    //游戏界面背景色设置
    window.style.background =  GAMEBACKCOLOR;
    
    
    //中间游戏区域的宽高 = 滑块大小 + 间隙 + 边框
    var _tiledmapwidth = GAME_TILED_WIDTH * GAME_COLS+GAME_TILED_BOARD_WIDTH*(GAME_COLS+1);
    var _tiledmapheight = _tiledmapwidth;

    
    //游戏区域自适应布局
    var center = document.getElementsByClassName("center")[0];
    center.style.width = _tiledmapwidth + "px";
    center.style.height = _tiledmapheight + "px";
    center.style.marginLeft = (SCREEN_Width - _tiledmapwidth)/2 + "px";
    
    //底部按钮大小自适应
    var bottom = document.getElementsByClassName("bottom")[0];
    var leftBtn = bottom.getElementsByTagName("button")[0];
    var rightBtn = bottom.getElementsByTagName("button")[1];
    
    leftBtn.style.width = BTN_SIZE + "px";
    leftBtn.style.height = BTN_SIZE + "px";
    leftBtn.style.borderRadius = BTN_SIZE * 0.5 + "px";
    rightBtn.style.width = BTN_SIZE + "px";
    rightBtn.style.height = BTN_SIZE + "px";
    rightBtn.style.borderRadius = BTN_SIZE * 0.5 + "px";


    /*根据数字变换滑块的颜色*/
    function setTiledColor(number) {
        var color;
        switch (number){
            case 0:color = "rgb(128, 141, 146)";break;
            case 2:color = "rgb(253, 255, 246)";break;
            case 4:color = "rgb(211, 219, 190)";break;
            case 8:color = "rgb(154, 152, 176)";break;
            case 16:color = "rgb(99, 107, 126)";break;
            case 32:color = "rgb(95, 115, 86)";break;
            case 64:color = "rgb(100, 84, 75)";break;
            case 128:color = "rgb(110, 135, 125)";break;
            case 256:color = "rgb(65, 100, 125)";break;
            case 512:color = "rgb(124, 117, 54)";break;
            case 1024:color = "rgb(46, 79, 80)";break;
            case 2048:color = "rgb(105, 95, 130)";break;
            case 4096:color = "rgb(131, 91, 64)";break;
            case 8192:color = "rgb(36, 50, 75)";break;
            default:break;
        }

        return color;
    }


    //布局游戏区域小背景块
    for(var row=0;row<GAME_ROWS;row++){
        for(var col=0;col<GAME_COLS;col++){

            var tieldView = new MoveTieldView(0);
            tieldView.showXY(row,col);
            center.appendChild(tieldView.view);
        }
    }


    /*封装滑块对象  包括无数字的背景块(传0生成)  带数字的滑块传非0*/
    function MoveTieldView(num){


        /*生成滑块 并设置背景色和数字*/
        this.view = document.createElement("div");
        this.view.style.width = GAME_TILED_WIDTH + "px";
        this.view.style.height = GAME_TILED_HEIGTH + "px";
        this.view.style.position = "absolute";
        this.view.style.textAlign = "center";
        this.view.style.lineHeight = GAME_TILED_HEIGTH + "px";
        this.view.style.borderRadius = "7px";
        this.view.style.msUserSelect = "none";
        this.view.style.msTouchSelect = "none";
        this.view.style.webkitUserSelect = "none";
        this.view.style.userSelect = "none";


        /*随机生成2或者4 生成4的概率为 1/11 */
        this.n = Math.floor(Math.random()*10);
        this.number = this.n === 5 ? 4:2;

        /*滑块背景色*/
        this.bacgroundColor = setTiledColor(this.number);

        /*数字颜色 2和4用深灰  4以上用白色*/
        this.numberColor = TILEDCOLOR;
        if(this.number > 4){
            this.numberColor = DBTILEDColor;
        }

        /*滑块数字大小 超过4位数则size缩小*/
        this.font = 30;
        if(this.number > 1000){
            this.font = 20;
        }

        /* num为0 生成背景块无数字 */
        if(num === 0){
            this.number = "";
            this.bacgroundColor = setTiledColor(0);
        }

        /*设置滑块属性*/
        this.setView = function () {
            this.view.style.background = this.bacgroundColor;
            this.view.innerHTML = this.number;
            this.view.style.fontSize = this.font + "px";
            this.view.style.fontWeight = "bold";
            this.view.style.color = this.numberColor;
        }


        /*让滑块显示的位置 纵坐标row 横坐标col*/
        this.showXY = function (row,col) {
            var left = GAME_TILED_WIDTH * col + GAME_TILED_BOARD_WIDTH * (col+1);
            var top = GAME_TILED_HEIGTH * row + GAME_TILED_BOARD_WIDTH * (row+1);
            this.view.style.left = left + "px";
            this.view.style.top = top + "px";
        }


        /*将滑块移动到 纵坐标row 横坐标col*/
        this.moveXY = function (row,col) {

            var left = GAME_TILED_WIDTH*col+GAME_TILED_BOARD_WIDTH*(col+1) + "px";
            var top = GAME_TILED_HEIGTH*row+GAME_TILED_BOARD_WIDTH*(row+1) + "px";
            this.view.style.transition = "transform 0.1s";
            this.view.style.left = left;
            this.view.style.top = top;
            // setTimeout(function () {
            //
            //
            // },50);
        }

        
        /*数字翻倍*/
        this.doubleNumber = function () {

            this.changeTransform();

            this.number *= 2;
            this.bacgroundColor = setTiledColor(this.number);
            if(this.number>1000) {
                this.font = 20;
            }
            if(this.number > 4){
                this.numberColor = DBTILEDColor;
            }
            this.setView()
        }


        /*变大和恢复的动画*/
        this.changeTransform = function () {


            setTimeout(change("scale(1.2)",this.view),5);

            this.view.addEventListener("webkitTransitionEnd",function () {
                setTimeout(change("scale(1)",this.view),10);
            });
        }

        function change(scale,view) {
            view.transition = "transform 0.2s";
            view.style.WebkitTransform = "scale";
        }


        /*生成滑块后直接设置属性 并播放变大变小动画*/
        this.setView();
        /*如果是数字块 则实现放大缩小动画*/
        if(num !== 0){
            this.changeTransform();
        }

        return this;
    }



    /*********************
     *
     * 游戏部分 通过手势控制滑块 时间和分数 并判断结果
     *
     *********************/


    /*滑动方向 上0 下1 左2 右3*/
    var direction = -1;

    /*控制游戏区域的二维数组  游戏滑块容器也是二维数组 滑块总数*/
    var map = new Array();
    var allTiled = new Array();
    var total = GAME_ROWS * GAME_COLS;

    /*计时器 时间 是否开始计时  分数 滑块数字*/
    var timer     = null;
    var time      = 0.00;
    var startTime = false;
    var timeLab = document.getElementsByClassName("time")[0];
    var timeLabText = timeLab.getElementsByTagName("p")[1];


    /*分数 滑块数字 数字总和*/
    var score     = 0;
    var numScore  = 2;
    var sum       = 0;
    var scoreLab = document.getElementsByClassName("score")[0];
    var scoreLabText = scoreLab.getElementsByTagName("p")[1];

    /*是否开始移动 是否正在移动*/
    var startMove = false;
    var isMove    = false;

    /*是否清空游戏区域 是否暂停*/
    var isMoveClearn = false;
    var isStopGame   = false;

    /*是否播放音乐 播放器*/
    var isAudioPlay = true;
    var audio = document.createElement('audio');
    document.body.appendChild(audio);

    /*播放音乐*/
    function  playAudio(name) {
        var url = "Resource/" + name;
        console.log(url);
        audio.src = url;
        audio.play();
    }

    /*九宫格全部为0*/
    for(var row=0;row<GAME_ROWS;++row){
        var arr = new Array();
        for(var col=0;col<GAME_COLS;++col){
            arr[col] = sum;
            map[row] = arr;
        }
    }

    /*生成一个新的滑动块*/
    function newMoveView() {

        /*检测九宫格是否填满*/
        var freeCount = total- allTiled.length;
        if(freeCount === 0){
            return;
        }

        /*生成 1-freeCount-1 的随机数*/
        var num   = Math.floor(Math.random()*(freeCount-1) + 1);
        var row,col;
        var count = 0;
        var find  = false;

        console.log(num);

        /*在剩下的空位中生成新滑块 避免消耗过大*/
        for(row=0; row<GAME_ROWS; ++row) {
            for(col=0; col<GAME_COLS; ++col) {
                if(map[row][col] === 0) {
                    ++count;
                    if(count === num) {
                        find = true;
                        break;
                    }
                }
            }
            if(find == true) {
                break;
            }
        }

        /*生成一个滑块*/
        var moveView = new MoveTieldView(1);
        moveView.showXY(row,col);
        center.appendChild(moveView.view);
        allTiled.push(moveView);
        ++sum;
        map[row][col] = sum;
    }


    newMoveView();

    // var over = document.createElement("div");
    // over.setAttribute("class","gameOver");
    // window.appendChild(over);
    
    /*开始计时*/
    function startTimer() {
        if(timer != null){
            return;
        }

        timer =  setInterval(function () {

            if(time > 9999.97){
                clearInterval(timer);
                timer = null;
                alert("游戏已经超时");
            }
            time = time + 0.02;
            timeLabText.innerHTML = time.toFixed(2) + "";

        },20);
    }

    /*判断滑动*/
    center.onmousedown = function (startEvent) {

        if(isStopGame == false){
            startMove = true;
        }
        else{
            startMove = false;
        }

        //获取鼠标点击时的坐标
        var startX = startEvent.clientX;
        var startY = startEvent.clientY;

        center.onmouseup = function () {
            center.onmousemove = null;
            center.onmouseup = null;
        }

        center.onmousemove = function (moveEvent) {
            if(!startTime){
                startTime = false;
                startTimer();
            }

            //获取鼠标移动时的坐标
            var endX = moveEvent.clientX;
            var endY = moveEvent.clientY;

            var ax = endX - startX;
            var ay = endY - startY;

            /*移动像素大于5  则滑动成功 判断方向 上0 下1 左2 右3 */
            if(startMove == true && ( Math.abs(ax)>5 || Math.abs(ay)>5)) {
                startMove = false;

                /*纵向移动 向上<0  向下>0 */
                if(Math.abs(ay)>Math.abs(ax)){

                    if(ay<0){
                        direction = 0;
                    }
                    else{
                        direction = 1;
                    }
                }
                /*横向移动  向左<0  向右>0 */
                else{
                    if(ax<0){
                        direction = 2;
                    }
                    else{
                        direction = 3;
                    }
                }

                moveAllTiled(direction);
            }


        }
    }

    
    
    /*移动所有滑块 上0 下1 左2 右3*/
    function moveAllTiled(index) {
        isMoveClearn = false;
        if(isGameOver() == true){
            gameOver();
            return;
        }

        if(isMove){
            return
        }
        isMove = true;

        switch (index){
            case 0:
                moveUp();
                break;
            case 1:
                moveDown()
                break;
            case 2:
                moveLeft()
                break;
            case 3:
                moveRight()
                break;
            default:break;
        }

        //播放音乐
        if(isAudioPlay == true){
            if(isMoveClearn == true) playAudio("hit.wav");
            else playAudio("move.wav");
        }

        scoreLabText.innerHTML = score + "";

        newMoveView();
        isMove = false;
    }


    /*向上滑动*/
    function moveUp() {

        for(var col=0;col<GAME_COLS;++col){
            var hit=0;
            for(var row=0;row<GAME_ROWS;++row){
                if(map[row][col]>0)
                {
                    for(var row1=row;row1>0;--row1)
                    {
                        if(map[row1-1][col]==0)
                        {
                            map[row1-1][col]=map[row1][col];
                            map[row1][col]=0;
                            var index = map[row1-1][col] - 1;
                            var moveView = allTiled[index];
                            moveView.moveXY(row1-1,col);
                        }
                        else
                        {
                            var index = map[row1-1][col] - 1;
                            var tiledObj = allTiled[index];
                            var numObj = tiledObj.number;

                            var index2 = map[row1][col] - 1;
                            var tiledNow = allTiled[index2];
                            var numNow = tiledNow.number;
                            if(numObj===numNow && hit%2===0)
                            {
                                //消除音乐播放
                                isMoveClearn = true;
                                ++hit;
                                score +=numObj*2;
                                tiledObj.doubleNumber();
                                tiledNow.view.remove();
                                var index3 = map[row1][col]-1;
                                allTiled.splice(index3,1);
                                sum--;
                                var index4 = map[row1][col];
                                for(var r=0;r<GAME_ROWS;++r)
                                {
                                    for(var c=0;c<GAME_COLS;++c)
                                    {
                                        if(map[r][c]>index4)
                                        {
                                            map[r][c]--;
                                        }
                                    }
                                }
                                map[row1][col]=0;
                            }
                            else if(hit!=0)
                            {
                                ++hit;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    /*向下滑动*/
    function moveDown() {

        for(var col=0;col<GAME_COLS;++col)
        {
            var hit=0;
            for(var row=GAME_ROWS-1;row>=0;--row)
            {
                if(map[row][col]>0)
                {
                    for(var row1=row;row1<GAME_ROWS-1;++row1)
                    {
                        if(map[row1+1][col]==0)
                        {
                            map[row1+1][col]=map[row1][col];
                            map[row1][col]=0;
                            var index = map[row1+1][col]-1;
                            var view = allTiled[index];
                            view.moveXY(row1+1,col);
                        }
                        else
                        {
                            var index1 = map[row1+1][col]-1;
                            var tiledObj = allTiled[index1];
                            var numObj = tiledObj.number;

                            var index2 = map[row1][col]-1;
                            var tiledNow = allTiled[index2];
                            var numNow = tiledNow.number;

                            if(numObj==numNow && hit%2==0)
                            {
                                //消除音乐播放
                                isMoveClearn = true;
                                ++hit;
                                score +=numObj*2;
                                hit=true;
                                tiledObj.doubleNumber();
                                tiledNow.view.remove();
                                var index3 = map[row1][col]-1;
                                allTiled.splice(index3,1);
                                sum--;
                                var index4 = map[row1][col];
                                for(var r=0;r<GAME_ROWS;++r)
                                {
                                    for(var c=0;c<GAME_COLS;++c)
                                    {
                                        if(map[r][c]>index4)
                                        {
                                            map[r][c]--;
                                        }
                                    }
                                }
                                map[row1][col]=0;
                            }
                            else if(hit!=0)
                            {
                                ++hit;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    /*向左滑动*/
    function moveLeft() {

        for(var row=0;row<GAME_ROWS;++row)
        {
            var hit=0;
            for(var col=0;col<GAME_COLS;++col)
            {
                if(map[row][col]>0)
                {
                    for(var col1=col;col1>0;--col1)
                    {
                        if(map[row][col1-1]==0)
                        {
                            map[row][col1-1]=map[row][col1];
                            map[row][col1]=0;
                            var index = map[row][col1-1]-1;
                            var view = allTiled[index];
                            view.moveXY(row,col1-1);
                        }
                        else
                        {
                            var index1 = map[row][col1-1]-1;
                            var tiledObj = allTiled[index1];
                            var numObj = tiledObj.number;

                            var index2 = map[row][col1]-1;
                            var tiledNow = allTiled[index2];
                            var numNow = tiledNow.number;

                            if(numObj==numNow && hit%2==0)
                            {
                                //消除音乐播放
                                isMoveClearn = true;
                                ++hit;
                                score +=numObj*2;
                                tiledObj.doubleNumber();
                                tiledNow.view.remove();
                                var index3 = map[row][col1]-1;
                                allTiled.splice(index3,1);
                                sum--;
                                var index4 = map[row][col1];
                                for(var r=0;r<GAME_ROWS;++r)
                                {
                                    for(var c=0;c<GAME_COLS;++c)
                                    {
                                        if(map[r][c]>index4)
                                        {
                                            map[r][c]--;
                                        }
                                    }
                                }
                                map[row][col1]=0;
                            }
                            else if(hit!=0)
                            {
                                ++hit;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    /*向右滑动*/
    function moveRight() {

        for(var row=0;row<GAME_ROWS;++row)
        {
            var hit=0;
            for(var col=GAME_COLS-1;col>=0;--col)
            {
                if(map[row][col]>0)
                {
                    for(var col1=col;col1<GAME_COLS-1;++col1)
                    {
                        if(map[row][col1+1]==0)
                        {
                            map[row][col1+1]=map[row][col1];
                            map[row][col1]=0;
                            var index = map[row][col1+1]-1;
                            var view = allTiled[index];
                            view.moveXY(row,col1+1);
                        }
                        else
                        {
                            var index1 = map[row][col1+1]-1;
                            var tiledObj = allTiled[index1];
                            var numObj =  tiledObj.number;

                            var index2 = map[row][col1]-1;
                            var tiledNow = allTiled[index2];
                            var numNow = tiledNow.number;

                            if(numObj==numNow && hit%2==0)
                            {
                                //消除音乐播放
                                isMoveClearn = true;
                                ++hit;
                                score +=numObj*2;
                                tiledObj.doubleNumber();
                                tiledNow.view.remove();
                                var index3 = map[row][col1]-1;
                                allTiled.splice(index3,1);

                                sum--;
                                var index4 = map[row][col1];
                                for(var r=0;r<GAME_ROWS;++r)
                                {
                                    for(var c=0;c<GAME_COLS;++c)
                                    {
                                        if(map[r][c]>index4)
                                        {
                                            map[r][c]--;
                                        }
                                    }
                                }
                                map[row][col1]=0;
                            }
                            else if(hit!=0)
                            {
                                ++hit;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }


    //游戏是否结束 注意 判断游戏结束不是判断allTiled的长度是否为16或者map里面没有0
    //因为相同的块挨着的情况下是可以继续滑动的
    function isGameOver() {

        var isGameOver = true;
        var freeCount = 16- allTiled.length;

        if(freeCount!=0) {
            isGameOver=false;
        }

        if(freeCount==0) {

            for(var r=0;r<GAME_ROWS;++r){

                for(var c=0;c<GAME_COLS;++c) {

                    var index = map[r][c]-1;
                    var tiled = allTiled[index];
                    var num    = tiled.number;
                    var objNum = 0;

                    if(r+1<GAME_ROWS) {
                        var index2 = map[r+1][c]-1;
                        var on = allTiled[index2];
                        objNum = on.number;

                        if(num==objNum) {
                            isGameOver=false;
                        }
                    }

                    if(r-1>=0) {
                        var index3 = map[r-1][c]-1;
                        var on2 = allTiled[index3];
                        objNum= on2.number;

                        if(num==objNum) {
                            isGameOver=false;
                        }
                    }
                    if(c-1>=0) {
                        var index4 = map[r][c-1]-1;
                        var on3 = allTiled[index4];
                        objNum= on3.number;

                        if(num==objNum) {
                            isGameOver=false;
                        }
                    }

                    if(c+1<GAME_COLS) {

                        var index5 = map[r][c+1]-1;
                        var on4 = allTiled[index5];
                        objNum= on4.number;

                        if(num==objNum) {
                            isGameOver=false;;
                        }
                    }
                    if(!isGameOver) {
                        break;
                    }
                }
                if(!isGameOver) {
                    break;
                }
            }
        }
        return isGameOver;
    }


    /*游戏结束*/
    function gameOver() {

        clearInterval(timer);

        for(var i=0;i<allTiled.length;++i){
            var view = allTiled[i];
            if(numScore < view.number){
                numScore = view.number;
            }
        }

        var gameOver = document.createElement("div");
        window.appendChild(gameOver);
        gameOver.setAttribute("class","gameOver");

        var back = document.createElement("img");
        gameOver.appendChild(back);
        back.src = "Resource/MLTableAlertBackground.png";

        var top = document.createElement("div");
        gameOver.appendChild(top);
        top.setAttribute("class","top");
        top.innerText = "加油！";

        var table =  document.createElement("ul");
        gameOver.appendChild(table);
        table.setAttribute("class","center");


        var lefts = ["时间：","分数：","最大："];
        var rights = [time.toFixed(2)+"",score+"",numScore+""];
        for(var i=0;i<3;++i){
            var cell =  document.createElement("li");
            table.appendChild(cell);

            var left = document.createElement("p");
            cell.appendChild(left);
            left.setAttribute("class","left");
            left.innerText = lefts[i];

            var right = document.createElement("p");
            cell.appendChild(right);
            right.setAttribute("class","right");
            right.innerText = rights[i];
        }

        var newGame = document.createElement("button");
        gameOver.appendChild(newGame);
        newGame.setAttribute("class","newGame");
        newGame.innerText = "重新开始";


        var x, y;
        var isDrop = false;

        /*鼠标可以拖动结束界面*/
        gameOver.onmousedown = function(e) {
            var e = e || window.event;
            x = e.clientX - gameOver.offsetLeft;
            y = e.clientY - gameOver.offsetTop;
            isDrop = true;

            e.preventDefault();
        }

        gameOver.onmousemove = function(e) {

            if(isDrop) {
                var e = e || window.event;

                var moveX = e.clientX - x;
                var moveY = e.clientY - y;

                gameOver.style.left = moveX + "px";
                gameOver.style.top = moveY + "px";
            }else{
                return ;
            }
        }

        gameOver.onmouseup = function() {
            isDrop = false;
            center.onmousemove = null;
            center.onmouseup = null;
        }


        /*重新开始*/
        newGame.onclick = function () {

            gameOver.remove();
            startAgain();
        }
    }

    /*重新开始*/
    function  startAgain() {
        clearInterval(timer);
        timer = null;
        time = 0.00;
        timeLabText.innerHTML = "0.00";

        score = 0;
        scoreLabText.innerHTML = "0";
        numScore = 2;

        sum = 0;
        startMove = false;
        isMove    = false;

        allTiled.splice(0,allTiled.length);
        map.splice(0,map.length);

        for(var row=0;row<GAME_ROWS;++row){
            var arr = new Array();
            for(var col=0;col<GAME_COLS;++col){
                arr[col] = sum;
                map[row] = arr;
            }
        }

        center.innerHTML = "";


        //布局游戏区域小背景块
        for(var row=0;row<GAME_ROWS;row++){
            for(var col=0;col<GAME_COLS;col++){
                var tieldView = new MoveTieldView(0);
                tieldView.showXY(row,col);
                center.appendChild(tieldView.view);
            }
        }

        newMoveView();
    }


    /*重新开始  音频开关*/
    var bottom = window.getElementsByClassName("bottom")[0];
    var leftDiv = bottom.getElementsByClassName("left")[0];
    var leftBtn = leftDiv.getElementsByTagName("button")[0];
    leftBtn.onclick = function () {
        if(isGameOver()){
            return;
        }
        startAgain();
    }

    var rightDiv = bottom.getElementsByClassName("right")[0];
    var rightBtn = rightDiv.getElementsByTagName("button")[0];
    rightBtn.onclick = function () {
        if(isGameOver()){
            return;
        }
        isAudioPlay = !isAudioPlay;
        rightBtn.innerHTML = isAudioPlay?"关闭":"开启";
    }

}















