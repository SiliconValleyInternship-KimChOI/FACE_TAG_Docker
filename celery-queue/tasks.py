import os
import time
from celery import Celery
from yolov5.detect import Detect_class

CELERY_BROKER_URL = (os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379"),)
CELERY_RESULT_BACKEND = os.environ.get(
    "CELERY_RESULT_BACKEND", "redis://localhost:6379"
)

celery = Celery("tasks", broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)


@celery.task
def get_db(path):
    detect = Detect_class(path)
    source = detect.get_source()
    db = detect.run()

    print(
        "\n\n\n\n######################################### print from tasks - get_db #########################################################"
    )
    print("\nsource_path: ", source)
    print("\ndb: ", db)


@celery.task
def processing(url):
    # 영상처리
    example = (
        "python ./yolov5/detect_test.py --source " + url + " --weights ./yolov5/best.pt"
    )
    os.system(example)
    return "hey"
