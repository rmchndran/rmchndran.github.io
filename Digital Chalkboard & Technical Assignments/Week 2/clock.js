displayTime = document.getElementById("time-output");


function liveTime() {
    const dayToday = new Date();
    const hrs = dayToday.getHours().toString();
    const mins = dayToday.getMinutes().toString();
    const secs = dayToday.getSeconds().toString();

    const timeNow = `${hrs.padStart(2, '0')}:${mins.padStart(2,'0')}:${secs.padStart(2,'0')} CDT`;

    displayTime.innerHTML = timeNow;


}

liveTime();
setInterval(liveTime, 1000);

