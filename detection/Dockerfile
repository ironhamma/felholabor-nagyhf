# Use the official Python image as base image
FROM python:3.7.9

RUN apt-get update \
    && apt-get install -y libgl1-mesa-glx libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY detection/requirements.txt /app

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application files into the container
COPY detection /app

# Expose the port that Flask app runs on
EXPOSE 4000

# Command to run the Flask application
CMD [ "python", "detection.py" ]