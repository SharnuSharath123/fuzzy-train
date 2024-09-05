function predictTrainArrival() {
    const trainTimeInput = document.getElementById('train-time').value;
    const predictionResult = document.getElementById('prediction-result');
    
    if (!trainTimeInput.match(/^\d{2}:\d{2}$/)) {
        predictionResult.textContent = "Please enter a valid time in HH:MM format.";
        return;
    }

    // Simulated fuzzy logic prediction
    const currentTime = new Date();
    const [hours, minutes] = trainTimeInput.split(':').map(Number);
    const trainTime = new Date();
    trainTime.setHours(hours, minutes, 0);

    const timeDifference = (trainTime - currentTime) / 60000; // Difference in minutes
    let prediction;

    if (timeDifference < 0) {
        prediction = "Train has already departed.";
    } else if (timeDifference < 30) {
        prediction = "Train will arrive soon.";
    } else if (timeDifference < 60) {
        prediction = "Train will arrive within an hour.";
    } else {
        prediction = "Train arrival time is more than an hour away.";
    }

    predictionResult.textContent = prediction;
}
