document.addEventListener("DOMContentLoaded", function () {
    const predictButton = document.getElementById("predictButton");
    const recentMultiplierInput = document.getElementById("recentMultiplier");
    const numPredictionsInput = document.getElementById("numPredictions");
    const resultContainer = document.getElementById("resultContainer");

    predictButton.addEventListener("click", function () {
        const recentMultiplier = parseFloat(recentMultiplierInput.value);
        const numPredictions = parseInt(numPredictionsInput.value);

        if (!isNaN(recentMultiplier)) {
            const predictedMultipliers = predictMultipliers(recentMultiplier, numPredictions);
            displayPredictedMultipliers(predictedMultipliers);
        } else {
            displayErrorMessage("Please enter a valid multiplier signal.");
        }
    });

    function predictMultipliers(recentMultiplier, numPredictions) {
        const resultHtml = [];
        for (let i = 0; i < numPredictions; i++) {
            let predictedMultiplier;
            do {
                predictedMultiplier = Math.random() * 1.5 + 1.0;
                predictedMultiplier = parseFloat(predictedMultiplier.toFixed(2));
            } while (predictedMultiplier >= recentMultiplier);
            
            const color = getRandomColor();
            resultHtml.push(`<div class="result-box" style="background-color: ${color}">${predictedMultiplier.toFixed(2)}</div>`);
        }
        return resultHtml.join("");
    }

    function displayPredictedMultipliers(resultHtml) {
        resultContainer.innerHTML = resultHtml;
    }

    function displayErrorMessage(message) {
        resultContainer.innerHTML = `<div class="error-box">${message}</div>`;
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
