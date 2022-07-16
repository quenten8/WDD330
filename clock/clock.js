// Declare and Initialize your variables and make references to the id defined in the html file, as needed.
const hourhand = document.querySelector("#hour");
const minutehand = document.querySelector("#minute");
const secondhand = document.querySelector("#second");

// Declare and Initialize the inbuilt date function
let date = new Date();

if(JSON.parse(localStorage.getItem("timers")) == undefined) {
    timers = [];
} else {
    timers = JSON.parse(localStorage.getItem("timers"));
}

document.onload = setTime(date), buildTimers();


function setTime(date) {

    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    // Declare and Initialize your variables and create positions for each.
    hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12;
    minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60;
    secPosition = (sec * 360) / 60;
}

//Updates clock every second
function runClock() {
    // Set each position when the function is called
    hrPosition = hrPosition + 3 / 360;
    minPosition = minPosition + 6 / 60;
    secPosition = secPosition + 6;

    // Set the transformation for each arm
    hourhand.style.transform = "rotate(" + hrPosition + "deg)";
    minutehand.style.transform = "rotate(" + minPosition + "deg)";
    secondhand.style.transform = "rotate(" + secPosition + "deg)";
};
//Update clock every second
setInterval(runClock, 1000);


function timeZone() {
    document.getElementById('timeZone-btn').addEventListener('click', () => {
        event.preventDefault();

        let city = document.getElementById('city').value
        let country = document.getElementById('country').value

        fetch(`https://dev.virtualearth.net/REST/v1/TimeZone/?query=${city},${country}&key=ApOt2qEKHyB6K0ymKFfU_jTsYYuEToUbxB3WczrnkTN2mJ0gcNfgvJA58_dC31sU`)
        .then(response => response.json())
        .then( data => {

            let newZone = data.resourceSets[0].resources[0].timeZoneAtLocation;
            if(newZone.length == 0){
                alert('Location not found!')
                return
            }
            let date = new Date(newZone[0].timeZone[0].convertedTime.localTime)
            document.getElementById('position').innerHTML = `${newZone[0].placeName}, ${newZone[0].timeZone[0].genericName}`
            setTime(date)
        })
    })
}


function addTimer() {
    //Add new timer
    document.getElementById('timer-add').addEventListener('click', () => {

        let timerName = document.getElementById("timer-name").value
        let timerHour = Number(document.getElementById("timer-hour").value)
        let timerMinute = Number(document.getElementById("timer-minute").value)
        let timerSecond = Number(document.getElementById("timer-second").value)
        document.getElementById("timer-name").value = ''
        document.getElementById("timer-hour").value = ''
        document.getElementById("timer-minute").value = ''
        document.getElementById("timer-second").value = ''

        if(timerHour + timerMinute + timerSecond == 0) {
            timerMinute = 1
        }

        var total = new Date(new Date().getTime()+((timerHour*3600 + timerMinute*60 + timerSecond)*1000));

        if(timerName == '') {
            timerName = `Timer ${timers.length + 1}`
        }

        let timer = {name:timerName, time:total, complete:'no'}

        timers.push(timer)

        localStorage.setItem("timers", JSON.stringify(timers));

        buildTimers()
    })
}


function buildTimers(){
    let timerList = document.getElementById('timers')

    timerList.innerHTML = ''

    timers.forEach(timer => {
        let a = document.createElement('div')
        let delBtn = document.createElement('button')
        let title = document.createElement('h2')
        let countdown = document.createElement('h3')

        a.setAttribute('class', 'timer')
        a.setAttribute('data-id', timer)

        delBtn.innerHTML = 'Delete Timer'
        title.innerHTML = timer.name

        timerCountdown()

        a.appendChild(delBtn)
        a.appendChild(title)
        a.appendChild(countdown)
        timerList.appendChild(a)

        delBtn.addEventListener('click', ()=>{
            removeTimer(interval, timer)
        })

        if(timer.complete == 'yes') {
            countdown.innerHTML = 'Completed'
            return
        }

        let interval = setInterval(timerCountdown, 1000);

        function timerCountdown() {
            let c = Math.floor((new Date(new Date(timer.time).getTime() - new Date().getTime()))/1000)

            h = Math.floor(c / 3600);
            m = Math.floor(c % 3600 / 60)
            s = Math.floor(c % 3600 % 60)

            hDisplay = h > 0 ? h + (h == 1 ? " hour, ": " hours, "):"";
            mDisplay = m > 0 ? m + (m == 1 ? " minute, ": " minutes, "):"";
            sDisplay = s > 0 ? s + (s == 1 ? " second": " seconds"):"";

            countdown.innerHTML = `${hDisplay}${mDisplay}${sDisplay}`

            if (c == 0) {
                alert('A timer has finished!')
                countdown.innerHTML = 'Completed'
                timer.complete='yes'
                localStorage.setItem("timers", JSON.stringify(timers));
                clearInterval(interval)
                interval = null
            }
        }
    })
}
function removeTimer(interval, timer) {
    event.target.parentElement.remove()
    let index = timers.findIndex(object => {
        return object == timer;
    });
    timers.splice(index, 1);

    clearInterval(interval)
    interval = null

    localStorage.setItem("timers", JSON.stringify(timers));
}

function stopwatch() {
    let watchMinutes = document.getElementById('watchMinutes')
    let watchSeconds = document.getElementById('watchSeconds')
    let watchMili = document.getElementById('watchMili')
    let savedStopwatch;
    let watchSwitch = 1;

    if(JSON.parse(localStorage.getItem("savedStopwatch")) == undefined) {
        countMili = 0;
        countSeconds = 0;
        countMinutes = 0;
    } else {
        savedStopwatch = JSON.parse(localStorage.getItem("savedStopwatch"));
        countMili = "00";
        countSeconds = savedStopwatch.seconds;
        countMinutes = savedStopwatch.minutes;
        watchMili.innerHTML = countMili;
        watchSeconds.innerHTML = countSeconds;
        watchMinutes.innerHTML = countMinutes;
    }
runWatch()
watchMili.innerHTML = "00"
    //Start and pause stopwatch
    document.getElementById('stopwatch-start').addEventListener('click', () => {

        if(watchSwitch == 1) {
            watchSwitch = 0
            watchInterval = setInterval(runWatch,10)
            document.getElementById('stopwatch-start').innerHTML = "Pause Stopwatch"
        } else {
            watchSwitch = 1
            clearInterval(watchInterval)
            document.getElementById('stopwatch-start').innerHTML = "Start Stopwatch"
        }
    })

    //Reset stopwatch
    document.getElementById('stopwatch-reset').addEventListener('click', () => {
        countMili = 0;
        countSeconds = 0;
        countMinutes = 0;
        watchMili.innerHTML = "00";
        watchSeconds.innerHTML = "00";
        watchMinutes.innerHTML = "00";
        savedStopwatch = {minutes:0, seconds:0}
        localStorage.setItem("savedStopwatch", JSON.stringify(savedStopwatch));
        clearInterval(watchInterval)
    })


    function runWatch() {
        countMili++;

        if(countMili <= 9) {
            watchMili.innerHTML = "0" + countMili;
        } else {
            watchMili.innerHTML = countMili;
        }

        if(countMili >= 100) {
            countSeconds++;
            countMili = 0;
            savedStopwatch = {minutes:countMinutes, seconds:countSeconds}
            localStorage.setItem("savedStopwatch", JSON.stringify(savedStopwatch));
        }
        if(countSeconds <= 9) {
            watchSeconds.innerHTML = '0' + countSeconds;
        } else {
            watchSeconds.innerHTML = countSeconds;
        }

        if(countSeconds >= 59) {
            countMinutes++;
            countSeconds = 0;
        }
        if(countMinutes <= 9) {
            watchMinutes.innerHTML = '0' + countMinutes;
        } else {
            watchMinutes.innerHTML = countMinutes;
        }
    }
}

timeZone()
addTimer()
stopwatch()
