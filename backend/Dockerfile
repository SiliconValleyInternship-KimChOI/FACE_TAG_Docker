# FROM python:3.6-alpine
FROM python:3.7

# link to redis
ENV CELERY_BROKER_URL redis://redis:6379/0
ENV CELERY_RESULT_BACKEND redis://redis:6379/0
ENV C_FORCE_ROOT true

ENV HOST 0.0.0.0
ENV PORT 5000
ENV DEBUG true

# Expose ports
EXPOSE 5000

# Tell Python to not generate .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Turn off buffering
ENV PYTHONUNBUFFERED 1

# Install requirements using pip
ADD requirements.txt .

# RUN python -m pip install -r requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn

# ffmpeg 설치 오류
RUN apt-get update
RUN apt-get -y install ffmpeg

# Set working directory and addour Flask API files
WORKDIR /app
ADD . /app

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "-t", "600", "app:app"]
