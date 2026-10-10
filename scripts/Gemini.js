// Gemini.js - Модуль для запросов к ИИ
const API_KEY = "???";

export async function askSkeletonBrain(skelX, skelY, skelHP, playerX, playerY) {
    const url = `https://googleapis.com{API_KEY}`;
    
    // Формируем четкий prompt для игрового ИИ
    const prompt = `Ты — враг-скелет в 2D-платформере. Твои координаты: X=${skelX}, Y=${skelY}. Твоё здоровье: ${skelHP}. Координаты Игрока: X=${playerX}, Y=${playerY}. Выбери ОДНО действие из списка и напиши ТОЛЬКО его название маленькими буквами без точек: run_left, run_right, jump, stop.`;

    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        // Забираем текстовый ответ от Gemini и чистим его от пробелов
        const aiDecision = data.candidates[0].content.parts[0].text.trim().toLowerCase();
        return aiDecision;
    } catch (error) {
        console.error("Ошибка ИИ скелета:", error);
        return "stop"; // В случае ошибки просто останавливаем его
    }
}
