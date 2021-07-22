from flask import (
    Flask,
    flash,
    render_template,
    request,
    jsonify,
    redirect,
    url_for,
    abort,
)
from werkzeug.utils import secure_filename
from flask_cors import CORS
from worker import celery

# import celery.states as states
import mysql.connector

import os

# 다른 폴더의 *.py을 참조하기 위한 절대경로 설정
from connection import s3_connection, BUCKET_NAME
import boto3
from time import strftime, gmtime

Upload_URL = "./input_video/"
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = Upload_URL
output_video_path = "./output_video/"
CORS(app)

app.config.update(
    CELERY_BROKER_URL="redis://localhost:6379/0",
    CELERY_RESULT_BACKEND="redis://localhost:6379/0",
)


def getMysqlConnection():
    config = {
        "user": "root",
        "host": "db",
        "port": "3306",
        "password": "password",
        "database": "test",
        "auth_plugin": "mysql_native_password",
    }
    return mysql.connector.connect(**config)


@app.route("/fileUpload", methods=["POST"])
def get_video():
    if request.method == "POST":
        if "file" not in request.files:
            flash("no file part")
            return redirect(request.rul)
        video_file = request.files["file"]
        if video_file == "":
            flash("No selected file")
            return redirect(request.url)
        filename = secure_filename(video_file.filename)
        path = os.path.join(Upload_URL, filename)
        if not (os.path.exists(Upload_URL)):
            os.mkdir(Upload_URL)
        video_file.save(path)

    # 영상 처리
    video = celery.send_task("processing", args=["input_video/abc.mp4"], kwargs={}).delay()
    # 등장인물 타임라인
    if video.ready() == True:
        with open("list/appear_list.txt", "r", encoding="utf-8") as f:
            global timeline
            data = f.read()
            timeline = eval(data)
        # DB저장
        key = timeline.keys()
        for i in key:
            if i == "harrypotter":
                cid = 1
            elif i == "ron":
                cid = 2
            elif i == "hermione":
                cid = 3

            timeline_value = timeline[i]
            val = []
            for j in timeline_value:
                start = strftime("%H:%M:%S", gmtime(j[0]))
                end = strftime("%H:%M:%S", gmtime(j[1]))
                val.append((cid, start, end))
            print(val)
            db = getMysqlConnection()
            cursor = db.cursor()
            sql = "INSERT INTO Timeline(cid,start,end) VALUES (%s, %s, %s);"
            cursor.executemany(sql, val)
            db.commit()
            val.clear()
            os.remove("list/appear_list.txt")
        return jsonify({"success": True, "file": "Received", "name": filename})


@app.route("/fileDown", methods=["POST"])
def post_video():
    if request.method == "POST":
        # 파일 이름 가져오기
        file_list = os.listdir(output_video_path)
        filename = "".join(file_list)
        # S3 버킷에 영상 저장
        s3 = s3_connection()
        s3.upload_file(output_video_path + filename, BUCKET_NAME, filename)
        # 영상 url
        url = "https://{BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/{filename}"
        return jsonify(url)


@app.route("/getCharacter", methods=["POST"])
def get_Character():
    db = getMysqlConnection()
    if request.method == "POST":
        cursor = db.cursor()

        # timeline table 전에 저장된 정보 삭제
        # sql = '''TRUNCATE TABLE timeline;'''
        # cursor.execute(sql)

        # timeline 가져오기
        sql = """
		SELECT name,img,start,end from Characters 
		RIGHT JOIN Timeline ON Characters.id = Timeline.cid
		ORDER BY name;"""
        cursor.execute(sql)
        result = cursor.fetchall()
        return jsonify(result)


# @app.route("/add/<int:param1>/<int:param2>")
# def add(param1: int, param2: int) -> str:
#     task = celery.send_task("tasks.add", args=[param1, param2], kwargs={})
#     response = f"<a href='{url_for('check_task', task_id=task.id, external=True)}'>check status of {task.id} </a>"
#     return response


# @app.route('/check/<string:task_id>')
# def check_task(task_id: str) -> str:
#     res = celery.AsyncResult(task_id)
#     if res.state == states.PENDING:
#         return res.state
#     else:
#         return str(res.result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)
