let dateStr = document.getElementById("time").textContent;
let year = document.getElementById("year");
let month = document.getElementById("month");
let day = document.getElementById("day");
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

let id = setInterval(() => {
    let data = calc_date(dateStr);
    // console.log(data.second)
    year.textContent = data.year + "年"
    month.textContent = data.month + "月"
    day.textContent = data.day + "日"
    hour.textContent = data.hour + "小时"
    minute.textContent = data.minute + "分钟"
    second.textContent = data.second + "秒"
}, 1000)


function calc_date(dateStr) {
    let regex = /(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分/;
    let match = dateStr.match(regex);
    let past = {
        year: parseInt(match[1]),
        month: parseInt(match[2]),
        day: parseInt(match[3]),
        hour: parseInt(match[4]),
        minute: parseInt(match[5]),
        second: "00"
    }
    let pastDate = new Date(past.year, past.month - 1, past.day, past.hour, past.minute, past.second);

    let currentDate = new Date();

    let ms = currentDate - pastDate;
    let second = Math.floor(ms / 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60);
    let day = Math.floor(hour / 24);

    let year = currentDate.getFullYear() - past.year;

    let month = currentDate.getMonth() + 1 - past.month + 12 * year;

    // console.log(year, month, day, hour, minute, second)
    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
}