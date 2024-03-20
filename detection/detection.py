from flask import Flask, request, jsonify
import cv2
import numpy as np

app = Flask(__name__)

app.config['PYTHON_HOST'] = os.environ.get('PYTHON_HOST', 'localhost')

# Load pre-trained car detection model
car_cascade = cv2.CascadeClassifier('./cars.xml')

@app.route('/detect_cars', methods=['POST'])
def detect_cars():
    # Check if image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    # Read the image file from the request
    image_file = request.files['image']

    # Convert image file to numpy array
    np_img = np.fromfile(image_file, np.uint8)
    image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Detect cars in the image
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cars = car_cascade.detectMultiScale(gray, 1.1, 3)

    # Extract bounding rectangles of detected cars
    cars_rectangles = []
    for (x, y, w, h) in cars:
        cars_rectangles.append({'x': int(x), 'y': int(y), 'width': int(w), 'height': int(h)})

    # Return the bounding rectangles as response
    return jsonify({'cars': cars_rectangles})

if __name__ == '__main__':
    port_number = 4000
    app.run(debug=True, port=port_number, host=app.config['PYTHON_HOST'])
