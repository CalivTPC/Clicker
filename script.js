var gameRunning = false;
var upgrade = {
    clicks: 1,
    autoClicker: 1,
}

var statistics = {
    clickSpeed: 0,
    clickSpeedAvarge: 0,
    clicks: 0,
    WholeTime: 0,

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
        clearInterval(statistics.clickSpeedInterval);

    }


}

function clickCount() {
    if (gameRunning == true) {
        statistics.clicks += 1 * upgrade.clicks;
        statistics.clickSpeedClicks += 1
        console.log("clicks: " + statistics.clicks);
        getStatisticClickspeed()
        showStatistics();
    }
}


// Statistics

function getStatisticClickspeed() {
    let clickSpeedInterval;
    showStatisticsClickSpeed();

    statistics.clickSpeedAvarge += statistics.clickSpeed;
    statistics.clickSpeed = 0;

    clearInterval(clickSpeedInterval);

    statistics.clickSpeedInterval = setInterval(() => {
        statistics.clickSpeed++
    }, 1);
}



// Time
function time() {
    let timeInterval
    timeInterval = setInterval(() => {
        if (gameRunning == true) {
            statistics.WholeTime++;
            showStatistics();
            console.log("statistics.WholeTimer: " + statistics.WholeTime)
        }
    }, 1000);
}

time()
// ! Time

// Show
function showStatisticsClickSpeed() {
    document.getElementById("clickSpeedText").innerHTML = "ClickSpeed: " + statistics.clickSpeed;
    document.getElementById("clickSpeedAvargeText").innerHTML = "ClickSpeedAvarge: " + Math.round(statistics.clickSpeedAvarge / statistics.clicks);


}


function showStatistics() {
    document.getElementById("clickText").innerHTML = "Clicks: " + statistics.clicks;
    document.getElementById("timeText").innerHTML = "Time: " + statistics.WholeTime;


}

// ! Show

// ! Statistics




console.log("::Script Activ")