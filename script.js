var gameRunning = false;
var clickSpeedInterval;

var upgrade = {
    clicks: 1,
    autoClicker: 1,
}

var statistics = {
    clicks: 0,
    clickSpeed: 0,
    clickSpeedAvarge: 0,
    wholeTime: 0,
}

if (document.getElementById("clickMe").mouseover) {
    gameRunning = false
    console.log("gameRunning: " + gameRunning)
}


function isGameRunning(state) {
    if (state == true) {
        gameRunning = true
        console.log("gameRun: " + gameRunning)
    }
    if (state == false) {
        gameRunning = false
        console.log("gameRun: " + gameRunning)
        clearInterval(clickSpeedInterval);

    }


}

function clickCount() {
    if (gameRunning == true) {
        statistics.clicks += 1 * upgrade.clicks;
        getStatisticClickspeed()
        showStatistics();
    }
}


// Statistics

function getStatisticClickspeed() {
    

    showStatisticsClickSpeed();

    statistics.clickSpeedAvarge += statistics.clickSpeed;
    
    statistics.clickSpeed = 0;
    clearInterval(clickSpeedInterval);

    clickSpeedInterval = setInterval(() => {
        statistics.clickSpeed++
    }, 1);
}



// Time
function time() {
    let timeInterval
    timeInterval = setInterval(() => {
        if (gameRunning == true) {
            statistics.wholeTime++;
            showStatistics();
            console.log("statistics.wholeTimer: " + statistics.wholeTime)
        }
    }, 1000);
}

time()
// ! Time

// Show
function showStatisticsClickSpeed() {
    document.getElementById("clickSpeedText").innerHTML = "ClickSpeed: " + statistics.clickSpeed + " ms";
    document.getElementById("clickSpeedAvargeText").innerHTML = "ClickSpeedAvarge: " + Math.round(statistics.clickSpeedAvarge / statistics.clicks) + " ms";


}


function showStatistics() {
    document.getElementById("clickText").innerHTML = "Clicks: " + statistics.clicks;
    document.getElementById("timeText").innerHTML = "Time: " + statistics.wholeTime;


}

// ! Show

// ! Statistics
function log(){

    console.log("<---------Logs-------->")
    console.log(" ")

    console.log("gameRunning: " + gameRunning); 
    console.log("upgrade.clicks: " + upgrade.clicks);  
    console.log("upgrade.autoClicker: " + upgrade.autoClicker);  

    console.log("statistics.clicks: " + statistics.clicks)
    console.log("statistics.clickSpeed: " + statistics.clickSpeed)
    console.log("statistics.clickSpeedAvarge: " + statistics.clickSpeedAvarge / statistics.clicks)
    console.log("statistics.wholeTime: " + statistics.wholeTime)
    
    console.log(" ")
    console.log("<---------!Logs-------->" )

   

}



console.log("::Script Activ")