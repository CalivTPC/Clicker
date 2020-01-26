
var saved = localStorage.getItem("timeo.saved")

var gameRunning;
var clickSpeedInterval;
var time = {};
var upgrade = {};
var statistics = {}

function giveValue() {
    if (!saved) {
         gameRunning = false;
         clickSpeedInterval;
         time = {
            sec: 0,
            min: 0,
            h: 0,
        }

         upgrade = {
            money: 1,
            moneyCost: 100,

            autoClicker: 1,
            autoClickerCost: 500,
            AutoClickerInterval: 0,
        }

         statistics = {
            money: 0,
            clickSpeed: 0,
            clickSpeedAvarge: 0,
            clicksReal: 0,
        }
    } else {
         clickSpeedInterval;
         time = {
            sec: +window.localStorage.getItem("timeo.time.sec"),
            min: +window.localStorage.getItem("timeo.time.min"),
            h: +window.localStorage.getItem("timeo.time.h"),
        }

         upgrade = {
            money: +window.localStorage.getItem("timeo.upgrade.money"),
            moneyCost: +window.localStorage.getItem("timeo.upgrade.moneyCost"),

            autoClicker: +window.localStorage.getItem("timeo.upgrade.autoClicker"),
            autoClickerCost: +window.localStorage.getItem("timeo.upgrade.autoClickerCost"),
            AutoClickerInterval: +window.localStorage.getItem("timeo.upgrade.AutoClickerInterval"),
        }

         statistics = {
            money: +window.localStorage.getItem("timeo.statistics.money"),
            clickSpeed: +window.localStorage.getItem("timeo.statistics.clickSpeed"),
            clickSpeedAvarge: +window.localStorage.getItem("timeo.statistics.clickSpeedAvarge"),
            clicksReal: +window.localStorage.getItem("timeo.statistics.clicksReal"),
        }
    }
}

giveValue()

function save() {
    saved = true 
    window.localStorage.setItem("timeo.saved", saved)
    


    window.localStorage.setItem("timeo.time.sec", time.sec)
    window.localStorage.setItem("timeo.time.min", time.min)
    window.localStorage.setItem("timeo.time.h", time.h)


    window.localStorage.setItem("timeo.upgrade.money", upgrade.money)
    window.localStorage.setItem("timeo.upgrade.moneyCost", upgrade.moneyCost)

    window.localStorage.setItem("timeo.upgrade.autoClicker", upgrade.autoClicker)
    window.localStorage.setItem("timeo.upgrade.autoClickerCost", upgrade.autoClickerCost)
    window.localStorage.setItem("timeo.upgrade.autoClickerInterval", upgrade.AutoClickerInterval)

    window.localStorage.setItem("timeo.statistics.money", statistics.money)
    window.localStorage.setItem("timeo.statistics.clickSpeed", statistics.clickSpeed)
    window.localStorage.setItem("timeo.statistics.clickSpeedAvarge", statistics.clickSpeedAvarge)
    window.localStorage.setItem("timeo.statistics.clicksReal", statistics.clicksReal)

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
        save()
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
            save()
            console.log("time.sec: " + time.sec)
        }
    }, 1000);
}

giveTime()

function giveMin() {
    if (time.sec >= 60) {
        time.sec -= 60
        time.min++
    }
}

function giveH() {
    if (time.min >= 60) {
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
    save()
    showStatistics()
}

showPrice()


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
    console.log(" ")
    console.log("<---localStorage--->")
    console.log(" ")
    console.log(" ")

    console.log(" ")
    console.log("--> localStorage time <--")
    console.log(" ")

    console.log("timeo.time.sec: " + window.localStorage.getItem("timeo.time.sec"))
    console.log("timeo.time.min: " + window.localStorage.getItem("timeo.time.min"))
    console.log("timeo.time.h: " + window.localStorage.getItem("timeo.time.h"))
    
    console.log(" ")
    console.log("--> localStorage upgrade <--")
    console.log(" ")

    console.log("timeo.upgrade.money: " + window.localStorage.getItem("timeo.upgrade.money"))
    console.log("timeo.upgrade.moneyCost: " + window.localStorage.getItem("timeo.upgrade.moneyCost"))
    console.log("timeo.upgrade.autoClicker: " + window.localStorage.getItem("timeo.upgrade.autoClicker"))
    console.log("timeo.upgrade.autoClickerCost: " + window.localStorage.getItem("timeo.upgrade.autoClickerCost"))
    console.log("timeo.upgrade.AutoClickerInterval: " + window.localStorage.getItem("timeo.upgrade.AutoClickerInterval"))
    
    console.log(" ")
    console.log("--> localStorage statistics <--")
    console.log(" ")

    console.log("timeo.statistics.money: " + window.localStorage.getItem("timeo.statistics.money"))
    console.log("timeo.statistics.clickSpeed: " + window.localStorage.getItem("timeo.statistics.clickSpeed"))
    console.log("timeo.statistics.clickSpeedAvarge: " + window.localStorage.getItem("timeo.statistics.clickSpeedAvarge"))
    console.log("timeo.statistics.clicksReal: " + window.localStorage.getItem("timeo.statistics.clicksReal"))
    

    console.log(" ")
    console.log(" ")
    console.log("<---!localStorage--->")
    console.log(" ")
    console.log(" ")

    console.log("gameRunning: " + gameRunning);

    console.log(" ")
    console.log("time")
    console.log(" ")

    console.log("time.sec: " + time.sec)
    console.log("time.min: " + time.min)
    console.log("time.h: " + time.h)

    console.log(" ")
    console.log("upgrades")
    console.log(" ")

    console.log("upgrade.money: " + upgrade.money);
    console.log("upgrade.moneyCost: " + upgrade.moneyCost);
    console.log("upgrade.autoClicker: " + upgrade.autoClicker);
    console.log("upgrade.autoClickerCost: " + upgrade.autoClickerCost);

    console.log(" ")
    console.log("statistics")
    console.log(" ")

    console.log("statistics.money: " + statistics.money)
    console.log("statistics.clickSpeed: " + statistics.clickSpeed * 10)
    console.log("statistics.clickSpeedAvarge: " + statistics.clickSpeedAvarge / statistics.clicksReal)
    console.log("statistics.clicksReal: " + statistics.clicksReal )
    
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("<---------!Logs-------->")



}

// ! Log


console.log("::Script Activ")