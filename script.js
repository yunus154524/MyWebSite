const apiKey = "AIzaSyAa0U0wTvXXBP3xw7BT8Zs4k63JQlAfgKM";
const channelId = "UCOcxudaZDUvB9BzkaKAefqw";

// Kanal Bilgisi
async function fetchChannelInfo() {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
        const data = await res.json();
        const channel = data.items[0];
        document.getElementById("channel-thumb").src = channel.snippet.thumbnails.medium.url;
        document.getElementById("channel-title").innerText = channel.snippet.title;
        document.getElementById("subscriber-count").innerText = `${channel.statistics.subscriberCount} Subscribers`;
    } catch (err) {
        console.error(err);
    }
}

// Sadece Watch Latest Video butonunu ayarla
async function setLatestVideoButton() {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&type=video&key=${apiKey}`);
        const data = await res.json();
        const video = data.items.find(item => item.id.videoId);
        if (!video) return;
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        document.getElementById("latest-video-link").href = videoUrl;
    } catch(err){
        console.error(err);
    }
}

// Araçlar
async function showWeather() {
    const city = prompt("Enter city name:");
    if(!city) return;
    try {
        const res = await fetch(`https://wttr.in/${city}?format=3`);
        const text = await res.text();
        document.getElementById("tool-output").innerText = "🌦 Weather: " + text;
    } catch(err){
        document.getElementById("tool-output").innerText = "Failed to fetch weather.";
    }
}

async function showCurrencies() {
    try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        document.getElementById("tool-output").innerText = `💱 USD Rates:\nEUR: ${data.rates.EUR}\nUSD: ${data.rates.USD}\nTRY: ${data.rates.TRY}`;
    } catch(err){
        document.getElementById("tool-output").innerText = "Failed to fetch rates.";
    }
}

function getDailyAdvice() {
    const advices = ["Think twice, code once.","Practice makes perfect, but breaks keep you sane.","Stay curious, stay creative.","Be yourself — unless you can be a programmer, then be a programmer.","Today is a good day to learn something new."];
    document.getElementById("tool-output").innerText = "💡 Advice: " + advices[Math.floor(Math.random()*advices.length)];
}

// Mini Araçlar
function showNotes() {
    const note = prompt("Write a quick note:");
    if(note) document.getElementById("tool-output").innerText = "📝 Note: " + note;
}
function showTimer() {
    const sec = prompt("Enter seconds for timer:");
    if(!sec) return;
    let t = parseInt(sec);
    const interval = setInterval(()=>{
        document.getElementById("tool-output").innerText = `⏱ Timer: ${t}s remaining`;
        t--;
        if(t < 0) { clearInterval(interval); document.getElementById("tool-output").innerText = "⏰ Timer ended!"; }
    },1000);
}
function showColorPicker() {
    const color = prompt("Enter a color code (e.g., #ff0000):");
    if(color) document.body.style.background = color;
}

// Başlangıç
fetchChannelInfo();
setLatestVideoButton();
