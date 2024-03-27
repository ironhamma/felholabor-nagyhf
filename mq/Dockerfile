# Use the official RabbitMQ image from Docker Hub
FROM rabbitmq:latest

# Expose ports for AMQP and RabbitMQ Management interface
EXPOSE 5672 15672

# Set up the RabbitMQ plugins to enable the management interface
RUN rabbitmq-plugins enable rabbitmq_management

# Set environment variables if needed
# ENV RABBITMQ_CONFIG_FILE=/path/to/config/file

# Add any custom configuration files
# COPY rabbitmq.conf /etc/rabbitmq/

# Set up the RabbitMQ plugins if needed
# RUN rabbitmq-plugins enable rabbitmq_plugin_name

# You can add additional setup instructions as necessary

# By default, the RabbitMQ image runs the RabbitMQ server
# You don't need to specify CMD or ENTRYPOINT here
