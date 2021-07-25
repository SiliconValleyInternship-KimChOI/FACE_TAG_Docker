FROM python:3.7

ENV CELERY_BROKER_URL redis://redis:6379/0
ENV CELERY_RESULT_BACKEND redis://redis:6379/0
ENV C_FORCE_ROOT true

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

COPY . /queue
WORKDIR /queue


RUN pip install -r requirements.txt

# prevent cv2 import error (numpy error)
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

# ENV TZ=Asia/Seoul
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# production
# ENTRYPOINT celery -A tasks worker --loglevel=info flower
# ENTRYPOINT celery flower -A tasks --port=5555 --broker=redis://redis:6379/0
# CMD ["celery", "-A", "tasks", "worker", "--loglevel=info"]