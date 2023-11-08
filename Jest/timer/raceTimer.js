export default function raceTimer(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log("Time's up -- stop!");
        callback && callback();
    }, 1000);
}