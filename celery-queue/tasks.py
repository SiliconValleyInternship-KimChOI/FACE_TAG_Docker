import os
from celery import Celery
from yolov5.detect import Detect_class

CELERY_BROKER_URL = (os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379"),)
CELERY_RESULT_BACKEND = os.environ.get(
    "CELERY_RESULT_BACKEND", "redis://localhost:6379"
)

celery = Celery("tasks", broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)
celery.conf.timezone = "Asia/Seoul"


@celery.task(name="processing")
def processing(path):
    detect = Detect_class(path)
    timeline = detect.run()
    print("\nTimeline: ", timeline)
    return timeline
