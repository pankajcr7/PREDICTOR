document.addEventListener("DOMContentLoaded", function () {
    const predictButton = document.getElementById("predictButton");
    const recentMultiplierInput = document.getElementById("recentMultiplier");
    const penultimateMultiplierInput = document.getElementById("penultimateMultiplier");
    const numPredictionsInput = document.getElementById("numPredictions");
    const resultContainer = document.getElementById("resultContainer");

    predictButton.addEventListener("click", function () {
        const recentMultiplier = parseFloat(recentMultiplierInput.value);
        const penultimateMultiplier = parseFloat(penultimateMultiplierInput.value);
        const numPredictions = parseInt(numPredictionsInput.value);

        if (!isNaN(recentMultiplier) && !isNaN(penultimateMultiplier)) {
            const predictedMultipliers = predictMultipliers(recentMultiplier, penultimateMultiplier, numPredictions);
            displayPredictedMultipliers(predictedMultipliers);
        } else {
            displayErrorMessage("Please enter valid multiplier signals.");
        }
    });

    function predictMultipliers(recentMultiplier, penultimateMultiplier, numPredictions) {
        const resultHtml = [];
        let prevMultiplier = recentMultiplier;
        let prevPenultimateMultiplier = penultimateMultiplier;

        for (let i = 0; i < numPredictions; i++) {
            let predictedMultiplier;
            
            // Check if the previous multiplier was very high (above 10X)
            if (prevMultiplier > 10) {
                // Generate a multiplier between 1.30X and 2.00X
                predictedMultiplier = Math.random() * 0.7 + 1.3;
            } else {
                // Generate a normal multiplier between 1.00X and 2.00X
                predictedMultiplier = Math.random() * 1 + 1.0;
            }

            predictedMultiplier = parseFloat(predictedMultiplier.toFixed(2));
            const color = getRandomColor();
            resultHtml.push(`<div class="result-box" style="background-color: ${color}">${predictedMultiplier.toFixed(2)}</div>`);
            
            prevPenultimateMultiplier = prevMultiplier;
            prevMultiplier = predictedMultiplier;
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
