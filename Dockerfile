FROM ubuntu:24.04

ARG APP_VERSION="1.0"
ARG APP_NAME="libralib"

# Install dependencies and python3-venv for virtual environment
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    python3 \
    python3-pip \
    python3-venv \
    postgresql-common \
    sudo

# Create a working directory
WORKDIR /app

# Copy dependency file
#COPY src/requirements.txt requirements.txt

# Create a virtual environment and install dependencies
#RUN python3 -m venv venv && \
#    venv/bin/pip install --upgrade pip && \
#    venv/bin/pip install -r requirements.txt

# Copy remaining files
COPY src/ ./

# Create the output and logs directories
RUN mkdir -p /app/output /app/logs

# Set the entry point with output redirection
#ENTRYPOINT ["sh", "-c", "venv/bin/python my-application-1.py > /app/logs/logfile.trc 2>&1"]
#ENTRYPOINT ["sh", "-c", "kash src/backend/setup/setup.sh > /app/logs/logfile.trc 2>&1"]
CMD ["bash", "backend/setup/setup.sh"]
EXPOSE 8080

