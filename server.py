from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    train_time_str = data['train_time']
    
    try:
        train_time = datetime.datetime.strptime(train_time_str, '%H:%M')
    except ValueError:
        return jsonify({'error': 'Invalid time format'}), 400

    current_time = datetime.datetime.now()
    time_difference = (train_time - current_time).total_seconds() / 60  # Difference in minutes
    
    if time_difference < 0:
        prediction = "Train has already departed."
    elif time_difference < 30:
        prediction = "Train will arrive soon."
    elif time_difference < 60:
        prediction = "Train will arrive within an hour."
    else:
        prediction = "Train arrival time is more than an hour away."

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
