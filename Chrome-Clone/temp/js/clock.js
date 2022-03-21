const clocks = document.querySelectorAll(".clock");

const weekday = ["일", "월", "화", "수", "목", "금", "토", "일"]

function getClock(){
    const date = new Date();
    const week = String(date.getDay());
    const days = String(date.getDate());
    const Months = String(date.getMonth() + 1);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clocks[0].innerText = `${Months}월 ${days}일 (${weekday[week]})`;
    clocks[1].innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);