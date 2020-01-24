var gameRunning = false;
var clickSpeedInterval;

var upgrade = {
    clicks: 1,
    clicksCost: 100,

    autoClicker: 1,
    autoClickerCost: 500,
    AutoClickerInterval: 0,
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
    if (statistics.clicks == 0) {
        getStatisticClickspeed()
    }

    if (state == true) {
        gameRunning = true
        console.log("gameRun: " + gameRunning)
    }
    if (state == false) {
        gameRunning = false
        console.log("gameRun: " + gameRunning)

    }


}

function clickCount() {
    if (gameRunning == true) {
        statistics.clicks += upgrade.clicks * upgrade.clicks;
        getStatisticClickspeed()
        showStatistics();
    }
}


// Statistics

function getStatisticClickspeed() {


    showStatisticsClickSpeed();

    statistics.clickSpeedAvarge += statistics.clickSpeed * 10;

    statistics.clickSpeed = 0;
    clearInterval(clickSpeedInterval);

    clickSpeedInterval = setInterval(() => {
        if (gameRunning == true) {
            statistics.clickSpeed++
        }
    }, 10);
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
    document.getElementById("clickSpeedText").innerHTML = "ClickSpeed: " + statistics.clickSpeed * 10 + " ms";
    document.getElementById("clickSpeedAvargeText").innerHTML = "ClickSpeedAvarge: " + Math.round(statistics.clickSpeedAvarge / statistics.clicks) + " ms";
}

function showStatistics() {
    document.getElementById("clickText").innerHTML = "Clicks: " + statistics.clicks;
    document.getElementById("timeText").innerHTML = "Click Time: " + statistics.wholeTime;
}

showStatistics()
getStatisticClickspeed()

// ! Show

// ! Statistics

//Log

function log() {

    console.log("<---------Logs-------->")
    console.log(" ")

    console.log("gameRunning: " + gameRunning);

    console.log(" ")

    console.log("upgrade.clicks: " + upgrade.clicks);
    console.log("upgrade.clicks: " + upgrade.clicksCost);
    console.log("upgrade.autoClicker: " + upgrade.autoClicker);
    console.log("upgrade.autoClicker: " + upgrade.autoClickerCost);

    console.log(" ")

    console.log("statistics.clicks: " + statistics.clicks)
    console.log("statistics.clickSpeed: " + statistics.clickSpeed * 10)
    console.log("statistics.clickSpeedAvarge: " + statistics.clickSpeedAvarge / statistics.clicks)
    console.log("statistics.wholeTime: " + statistics.wholeTime)

    console.log(" ")
    console.log("<---------!Logs-------->")



}

// ! Log

// Shop
function giveUpgradePrice() {
    upgrade.clicksCost *= upgrade.clicks;
    upgrade.autoClickerCost *= upgrade.autoClicker;

    showPrice()
}


function buyAutoClicker() {
    if (upgrade.autoClickerCost <= statistics.clicks) {
        statistics.clicks -= upgrade.autoClickerCost
        upgrade.autoClicker++

        clearInterval(upgrade.AutoClickerInterval)

        giveUpgradePrice()
        autoClicker()
    }
}

function buyUpgradeClicks() {
    if (upgrade.clicksCost <= statistics.clicks) {
        statistics.clicks -= upgrade.clicksCost
        upgrade.clicks++

        giveUpgradePrice()

    }
}

function showPrice() {
    document.getElementById("upgrade1").innerHTML = "Upgrade Clicks <br> cost: " + upgrade.clicksCost;
    document.getElementById("upgrade2").innerHTML = "Autoclicker <br> cost: " + upgrade.autoClickerCost;

    showStatistics()
}

giveUpgradePrice()

// !Shop

// Upgrades

function autoClicker() {
    upgrade.AutoClickerInterval = setInterval(function () {
        statistics.clicks += upgrade.autoClicker * upgrade.autoClicker
        showStatistics()
    }, 10000 / upgrade.autoClicker)

}

// ! Upgrades




console.log("::Script Activ")