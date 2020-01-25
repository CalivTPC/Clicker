var gameRunning = false;
var clickSpeedInterval;
var time = {
    all: [],
    sec: 0,
    min: 0,
    h: 0,
}

var upgrade = {
    money: 1,
    moneyCost: 100,

    autoClicker: 1,
    autoClickerCost: 500,
    AutoClickerInterval: 0,
}

var statistics = {
    money: 0,
    clickSpeed: 0,
    clickSpeedAvarge: 0,
    clicksReal: 0,
}

if (document.getElementById("clickMe").mouseover) {
    gameRunning = false
    console.log("gameRunning: " + gameRunning)
}


function isGameRunning(state) {
    if (statistics.money == 0) {
        getStatisticclickSpeed()
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
        statistics.money += upgrade.money * upgrade.money;

        statistics.clicksReal++
        getStatisticclickSpeed()
        showStatistics();
    }
}


// Statistics

function getStatisticclickSpeed() {


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

function giveTime() {
    setInterval(() => {
        if (gameRunning == true) {
            time.sec++;
            showStatistics();
            giveH()
            giveMin()
            console.log("time.sec: " + time.sec)
        }
    }, 1000);
}

giveTime()

function giveMin() {
    if (time.sec >= 60){
        time.sec -= 60
        time.min++
    }
}

function giveH() {
    if (time.min >= 60){
        time.min -= 60
        time.h++
    }
}   


// ! Time

// Show

function showStatisticsClickSpeed() {
    document.getElementById("clickSpeedText").innerHTML = "clickSpeed: " + statistics.clickSpeed * 10 + " ms";
    document.getElementById("clickSpeedAvargeText").innerHTML = "clickSpeedAvarge: " + Math.round(statistics.clickSpeedAvarge / statistics.clicksReal) + " ms";
}

function showStatistics() {
    if (time.h >= 1) {
        document.getElementById("timeText").innerHTML = "Time: " + time.h + " h " + time.min + " min " + time.sec + " sec";
    }
    if (time.min >= 1 && time.h <= 0) {
        document.getElementById("timeText").innerHTML = "Time: " + time.min + " min " + time.sec + " sec";
    }
    if (time.sec >= 1 && time.min <= 0 && time.h <= 0) {
        document.getElementById("timeText").innerHTML = "Time: " + time.sec + " sec";
    }

    document.getElementById("moneyText").innerHTML = "money: " + statistics.money;
    document.getElementById("clicksText").innerHTML = "Clicks: " + statistics.clicksReal;

}

showStatistics()
getStatisticclickSpeed()

// ! Show

// ! Statistics



// Shop

function giveAutoClickerPrice() {
    upgrade.autoClickerCost *= upgrade.autoClicker;

    showPrice()
}

function giveUpgrademoneyPrice() {
    upgrade.moneyCost *= upgrade.money;

    showPrice()
}

function buyAutoClicker() {
    if (upgrade.autoClickerCost <= statistics.money) {
        statistics.money -= upgrade.autoClickerCost
        upgrade.autoClicker++

        clearInterval(upgrade.AutoClickerInterval)

        giveAutoClickerPrice()
        autoClicker()
    } else {
        document.getElementById("notEnoughmoneyText").style.visibility = "visible"
        let intervalNotEnoughmoney
        let timeBeforDisappear = 0
        clearInterval(intervalNotEnoughmoney)

        intervalNotEnoughmoney = setInterval(function () {
            timeBeforDisappear++
            if (timeBeforDisappear > 40) {
                document.getElementById("notEnoughmoneyText").style.visibility = "hidden"
                clearInterval(intervalNotEnoughmoney)
            }
        }, 100)
    }
}


function buyUpgrademoney() {
    if (upgrade.moneyCost <= statistics.money) {
        statistics.money -= upgrade.moneyCost
        upgrade.money++

        giveUpgrademoneyPrice()

    } else {
        document.getElementById("notEnoughmoneyText").style.visibility = "visible"
        let intervalNotEnoughmoney
        let timeBeforDisappear = 0
        clearInterval(intervalNotEnoughmoney)

        intervalNotEnoughmoney = setInterval(function () {
            timeBeforDisappear++
            if (timeBeforDisappear > 40) {
                document.getElementById("notEnoughmoneyText").style.visibility = "hidden"
                clearInterval(intervalNotEnoughmoney)
            }
        }, 100)
    }
}

function showPrice() {
    document.getElementById("upgrade1").innerHTML = "Upgrade money <br> cost: " + upgrade.moneyCost;
    document.getElementById("upgrade2").innerHTML = "Autoclicker <br> cost: " + upgrade.autoClickerCost;

    showStatistics()
}

giveAutoClickerPrice()
giveUpgrademoneyPrice()



// Upgrades

function autoClicker() {
    upgrade.AutoClickerInterval = setInterval(function () {
        statistics.money += upgrade.autoClicker * upgrade.autoClicker
        showStatistics()
    }, 10000 / upgrade.autoClicker)

}

// ! Upgrades

// !Shop

//Log

function log() {

    console.log("<---------Logs-------->")
    console.log(" ")

    console.log("gameRunning: " + gameRunning);

    console.log(" ")

    console.log("upgrade.money: " + upgrade.money);
    console.log("upgrade.money: " + upgrade.moneyCost);
    console.log("upgrade.autoClicker: " + upgrade.autoClicker);
    console.log("upgrade.autoClicker: " + upgrade.autoClickerCost);

    console.log(" ")

    console.log("statistics.money: " + statistics.money)
    console.log("statistics.clickSpeed: " + statistics.clickSpeed * 10)
    console.log("statistics.clickSpeedAvarge: " + statistics.clickSpeedAvarge / statistics.clicksReal)
    console.log("time.sec: " + time.sec)
    console.log("time.min: " + time.min)
    console.log("time.h: " + time.h)


    console.log(" ")
    console.log("<---------!Logs-------->")



}

// ! Log


console.log("::Script Activ")