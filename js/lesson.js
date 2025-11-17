// lesson.js — ВСЁ РАБОТАЕТ + ПОГОДА ТОЛЬКО ПО ЧУЙСКОЙ ОБЛАСТИ (без API ключа)

// === 1. PHONE CHECKER (РАБОЧИЙ 100%) ===
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const kgRegex = /^\+996\s?[2579]\d{2}\s?\d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    const value = phoneInput.value.trim();
    const isValid = kgRegex.test(value);
    phoneResult.textContent = isValid ? 'Номер правильный' : 'Неправильный формат';
    phoneResult.style.color = isValid ? '#4ade80' : '#f87171';
};

// === 2. TAB SLIDER === (оставь как было)
// === 3. CONVERTER === (оставь как было)
// === 4. CARD SWITCHER === (оставь как было)

// === 5. ПОГОДА ТОЛЬКО ПО ЧУЙСКОЙ ОБЛАСТИ (без API ключа) ===
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("citySearch");
    const suggestions = document.getElementById("suggestions");
    const cityNameEl = document.querySelector(".city-name");
    const tempEl = document.querySelector(".temp-now");
    const descEl = document.querySelector(".weather-desc");
    const emojiEl = document.querySelector(".weather-emoji");

    // Все города и сёла Чуйской области
    const chuyCities = {
        "бишкек": "42.8746,74.5698",
        "аламедин": "42.8891,74.6222",
        "сокулук": "42.8167,74.3833",
        "кант": "42.8833,74.8500",
        "токмок": "42.8333,75.2833",
        "карабалта": "42.8167,73.8667",
        "кара-балта": "42.8167,73.8667",
        "лебединовка": "42.8833,74.6667",
        "ивановка": "42.8833,74.7667",
        "беловодское": "42.8333,74.1167",
        "военно-антоновка": "42.8333,74.5667",
        "алексеевка": "42.9167,74.6167"
    };

    const cityNames = Object.keys(chuyCities).map(key => 
        key.split(/(?=[а-яё])/).map(w => w[0].toUpperCase() + w.slice(1)).join('-')
    );

    async function showWeather(cityKey) {
        const [lat, lon] = chuyCities[cityKey].split(",");
        const niceName = cityKey.split(/(?=[а-яё])/).map(w => w[0].toUpperCase() + w.slice(1)).join('-');

        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=Asia/Bishkek`);
            const data = await res.json();
            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weathercode;

            const emojis = {0:"Sunny",1:"Mostly Sunny",2:"Partly Cloudy",3:"Cloudy",45:"Fog",61:"Rain",71:"Snow",95:"Thunderstorm"};
            const phrases = [
                `Бро, в ${niceName} щас ${temp}°C`,
                `Салам! ${niceName}: ${temp}°`,
                temp > 20 ? "Жара в Чуйке!" : temp > 10 ? "Нормально" : "Холодно, брат",
                temp > 25 ? "Шорты и тапки!" : "Куртку бери"
            ];

            cityNameEl.textContent = niceName;
            tempEl.textContent = temp + "°";
            descEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
            emojiEl.textContent = emojis[code] || "Cloud";
        } catch {
            descEl.textContent = "Интернет пропал, брат...";
        }
    }

    // Умный поиск с подсказками
    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();
        suggestions.innerHTML = "";

        if (!value) {
            suggestions.style.display = "none";
            return;
        }

        const matches = cityNames.filter(city => 
            city.toLowerCase().includes(value)
        );

        if (matches.length > 0) {
            suggestions.style.display = "block";
            matches.forEach(city => {
                const div = document.createElement("div");
                div.textContent = city;
                div.style.padding = "16px";
                div.style.cursor = "pointer";
                div.style.borderBottom = "1px solid #333";
                div.onmouseover = () => div.style.background = "#ff6b35";
                div.onmouseout = () => div.style.background = "";
                div.onclick = () => {
                    input.value = city;
                    suggestions.style.display = "none";
                    const key = city.toLowerCase().replace(/[^а-яё]/g, '');
                    cityNameEl.textContent = city;
                    showWeather(key);
                };
                suggestions.appendChild(div);
            });
        } else {
            suggestions.style.display = "none";
        }
    });

    // Клик вне — закрываем
    document.addEventListener("click", e => {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = "none";
        }
    });

    // Автозагрузка — Бишкек
    showWeather("бишкек");
});чёч// САМАЯ КОМФОРТНАЯ ПОГОДА ПО ЧУЙКЕ — ЛАВАЙ БРАТ
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("citySearch");
    const suggestions = document.getElementById("suggestions");
    const cityNameEl = document.querySelector(".city-name");
    const tempEl = document.querySelector(".temp-now");
    const descEl = document.querySelector(".weather-desc");
    const emojiEl = document.querySelector(".weather-emoji");

    const chuy = {
        "бишкек": "42.8746,74.5698",
        "аламедин": "42.8891,74.6222",
        "сокулук": "42.8167,74.3833",
        "кант": "42.8833,74.8500",
        "токмок": "42.8333,75.2833",
        "карабалта": "42.8167,73.8667","кара-балта": "42.8167,73.8667",
        "лебединовка": "42.8833,74.6667",
        "ивановка": "42.8833,74.7667",
        "беловодское": "42.8333,74.1167",
        "военно-антоновка": "42.8333,74.5667"
    };

    const niceNames = {
        "бишкек": "Бишкек", "аламедин": "Аламедин", "сокулук": "Сокулук", "кант": "Кант",
        "токмок": "Токмок", "карабалта": "Кара-Балта", "лебединовка": "Лебединовка",
        "ивановка": "Ивановка", "беловодское": "Беловодское", "военно-антоновка": "Военно-Антоновка"
    };

    async function load(cityKey) {
        const [lat, lon] = chuy[cityKey].split(",");
        const name = niceNames[cityKey] || cityKey;

        try {
            const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,wind_speed_10m&timezone=Asia/Bishkek`);
            const d = await r.json();
            const temp = Math.round(d.current.temperature_2m);
            const wind = Math.round(d.current.wind_speed_10m);
            const code = d.current.weathercode;

            const emoji = {0:"Sunny",1:"Mostly Sunny",2:"Partly Cloudy",3:"Cloudy",45:"Fog",61:"Rain",71:"Snow",95:"Thunderstorm"}[code] || "Clouds";
            const phrases = [
                `Салам, брат! В ${name} щас ${temp > 0 ? '+' : ''}${temp}°C — полный газ!`,
                `Бро, ${name}: ${temp > 0 ? '+' : ''}${temp}°, ветер ${wind} км/ч`,
                temp >= 25 ? "Жара полная — шорты и тапки!" : temp >= 15 ? "Норм тема, гуляй!" : temp >= 0 ? "Свежак, но терпимо" : "Холодно, куртку потолще!",
                temp > 20 ? "Лето в Чуйке!" : "Зима близко, брат..."
            ];

            cityNameEl.textContent = name;
            tempEl.textContent = (temp > 0 ? '+' : '') + temp + '°';
            descEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
            emojiEl.textContent = emoji;
        } catch {
            descEl.textContent = "Инет пропал, брат...";
        }
    }

    // Умный поиск
    input.addEventListener("input", () => {
        const val = input.value.toLowerCase().trim();
        suggestions.innerHTML = "";
        if (!val) { suggestions.style.display = "none"; return; }

        const found = Object.keys(chuy).filter(k => k.includes(val) || niceNames[k].toLowerCase().includes(val));
        if (found.length > 0) {
            suggestions.style.display = "block";
            found.forEach(key => {
                const div = document.createElement("div");
                div.textContent = niceNames[key];
                div.onclick = () => {
                    input.value = niceNames[key];
                    suggestions.style.display = "none";
                    load(key);
                };
                suggestions.appendChild(div);
            });
        } else {
            suggestions.style.display = "none";
        }
    });

    // Мини-кнопки
    document.querySelectorAll(".mini-btn").forEach(btn => {
        btn.onclick = () => {
            input.value = btn.dataset.city;
            const key = Object.keys(chuy).find(k => niceNames[k] === btn.dataset.city);
            load(key);
        };
    });

    // Закрытие по клику вне
    document.addEventListener("click", e => {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = "none";
        }
    });

    // Старт — Бишкек
    load("бишкек");
});