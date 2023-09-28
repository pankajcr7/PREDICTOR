document.addEventListener("DOMContentLoaded", function () {
    const predictButton = document.getElementById("predictButton");
    const recentMultiplierInput = document.getElementById("recentMultiplier");
    const penultimateMultiplierInput = document.getElementById("penultimateMultiplier");
    const numPredictionsInput = document.getElementById("numPredictions");
    const resultContainer = document.getElementById("resultContainer");
    const resultHistoryTable = document.getElementById("resultHistory").getElementsByTagName("tbody")[0];

    const history = []; // Store the last 40 results
    const MAX_HISTORY_LENGTH = 40;

    predictButton.addEventListener("click", function () {
        const recentMultiplier = parseFloat(recentMultiplierInput.value);
        const penultimateMultiplier = parseFloat(penultimateMultiplierInput.value);
        const numPredictions = parseInt(numPredictionsInput.value);

        if (!isNaN(recentMultiplier) && !isNaN(penultimateMultiplier)) {
            const predictedMultipliers = predictMultipliers(recentMultiplier, penultimateMultiplier, numPredictions);
            displayPredictedMultipliers(predictedMultipliers);
            addToHistory(recentMultiplier, penultimateMultiplier);
        } else {
            displayErrorMessage("Please enter valid multiplier signals.");
        }
    });

    function predictMultipliers(recentMultiplier, penultimateMultiplier, numPredictions) {
        const resultHtml = [];
        let prevMultiplier = recentMultiplier;
        let prevPenultimateMultiplier = penultimateMultiplier;
        let consecutiveFactorsA = 0;
        let consecutiveFactorsB = 0;

        for (let i = 0; i < numPredictions; i++) {
            let predictedMultiplier;
            let moveType = "";

            // Check move type and generate multiplier accordingly
            if (consecutiveFactorsA >= 3) {
                predictedMultiplier = Math.random() * 0.25 + 1.25;
                moveType = "A";
                consecutiveFactorsA = 0;
            } else if (prevMultiplier >= 2 && prevMultiplier <= 10) {
                predictedMultiplier = Math.random() * 0.4 + 1.4;
                moveType = "B";
            } else if (prevMultiplier >= 30 && prevMultiplier <= 60) {
                predictedMultiplier = Math.random() * 0.1 + 1.0;
                moveType = "C";
            } else if (prevMultiplier >= 2 && prevMultiplier <= 6) {
                predictedMultiplier = Math.random() * 2 + 2;
                moveType = "D";
            } else if (prevMultiplier >= 1.10 && prevMultiplier <= 1.30) {
                predictedMultiplier = Math.random() * 2.5 + 2;
                moveType = "E";
            } else {
                predictedMultiplier = Math.random() * 1 + 1.0;
            }

            predictedMultiplier = parseFloat(predictedMultiplier.toFixed(2));
            const color = getColorForMove(moveType);
            resultHtml.push(`<div class="result-box" style="background-color: ${color}">${predictedMultiplier.toFixed(2)} (${moveType})</div>`);
            
            // Update move type counters
            if (moveType === "A") {
                consecutiveFactorsA++;
            } else {
                consecutiveFactorsA = 0;
            }

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

    function addToHistory(recentMultiplier, penultimateMultiplier) {
        history.push({ recent: recentMultiplier, penultimate: penultimateMultiplier });
        if (history.length > MAX_HISTORY_LENGTH) {
            history.shift(); // Remove the oldest entry if the history exceeds the maximum length
        }

        // Update the result history table
        const row = resultHistoryTable.insertRow(0);
        const recentCell = row.insertCell(0);
        const penultimateCell = row.insertCell(1);
        const moveTypeCell = row.insertCell(2);
        recentCell.textContent = recentMultiplier.toFixed(2);
        penultimateCell.textContent = penultimateMultiplier.toFixed(2);
        moveTypeCell.textContent = getMoveType(recentMultiplier, penultimateMultiplier);
    }

    function getMoveType(recentMultiplier, penultimateMultiplier) {
        if (recentMultiplier >= 1.00 && recentMultiplier <= 1.25) {
            return "A";
        } else if (recentMultiplier >= 2.00 && recentMultiplier <= 10.00) {
            return "B";
        } else if (recentMultiplier >= 30.00 && recentMultiplier <= 60.00) {
            return "C";
        } else if (recentMultiplier >= 2.00 && recentMultiplier <= 6.00) {
            return "D";
        } else if (recentMultiplier >= 1.10 && recentMultiplier <= 1.30) {
            return "E";
        } else {
            return "";
        }
    }

    function getColorForMove(moveType) {
        switch (moveType) {
            case "A":
                return "#0070ff"; // Blue color for Type A
            case "B":
                return "#0070ff"; // Blue color for Type B
            case "C":
                return "#0070ff"; // Blue color for Type C
            case "D":
                return "#800080"; // Purple color for Type D
            case "E":
                return "#800080"; // Purple color for Type E
            default:
                return "#000"; // Default color
        }
    }

    // Initialize the result history table with any previous history data here

});
