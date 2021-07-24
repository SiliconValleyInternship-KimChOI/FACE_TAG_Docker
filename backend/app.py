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
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

# celery
from worker import celery

# import celery.states as states
import mysql.connector

# Convert sec_to_time
from time import strftime, gmtime

# Sound synthesis
# import imageio_ffmpeg

# os.environ["IMAGEIO_FFMPEG_EXE"] = "/usr/bin/ffmpeg"
from moviepy.editor import *


# s3 connection
from connection import s3_connection, BUCKET_NAME, BUCKET_URL
import boto3

Upload_URL = "./input_video/"
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = Upload_URL
video_path = "./output_video/"
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
        # 파일이 존재하지 않을 경우
        if "file" not in request.files:
            flash("no file part")
            return redirect(request.rul)
        video_file = request.files["file"]
        # 파일 내용이 없을 경우
        if video_file == "":
            flash("No selected file")
            return redirect(request.url)
        # 파일 안정성 확인
        filename = secure_filename(video_file.filename)
        path = os.path.join(Upload_URL, filename)
        # input_video 폴더가 없을 경우 폴더 생성
        if not (os.path.exists(Upload_URL)):
            os.mkdir(Upload_URL)
        # input_video 폴더에 저장
        video_file.save(path)
        # 소리 합성
        return jsonify({"success": True, "file": "Received", "name": filename})


# DB저장
def insertTimeline(timeline):
    # Timeline table 전에 저장된 정보 삭제
    db = getMysqlConnection()
    cursor = db.cursor()
    sql = """TRUNCATE TABLE Timeline;"""
    cursor.execute(sql)
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
        cursor = db.cursor()
        sql = "INSERT INTO timeline(cid,start,end) VALUES (%s, %s, %s);"
        cursor.executemany(sql, val)
        db.commit()
        val.clear()
    return "Timeline update"


@app.route("/fileDown", methods=["POST"])
def post_video():
    if request.method == "POST":
        # 파일 이름 가져오기
        file_list = os.listdir(app.config["UPLOAD_FOLDER"])
        filename = "".join(file_list)
        # 영상 처리
        audioclip = VideoFileClip("./input_video/" + filename).audio
        video = celery.send_task(
            "processing", args=[app.config["UPLOAD_FOLDER"] + filename]
        )

        # 등장인물 타임라인 DB 저장
        global timeline
        data = str(video.get())
        timeline = eval(data)
        # db 저장
        insertTimeline(timeline)

        # 소리 합치기
        videoclip = VideoFileClip("./output_video/output/" + filename)
        videoclip.audio = audioclip
        videoclip.write_videofile(video_path + filename)
        # S3 버킷에 영상 저장
        s3 = s3_connection()
        if not (os.path.exists(video_path)):
            os.mkdir(video_path)
        s3.upload_file(video_path + filename, BUCKET_NAME, "{BUCKET_URL}/{filename}")
        # 영상 url
        url = "https://{BUCKET_URL}/{filename}"
        return jsonify(url)


# @app.route("/getCharacter", methods=["POST"])
# def get_Character():
#     db = getMysqlConnection()
#     if request.method == "POST":
#         cursor = db.cursor()
#         # timeline 가져오기
#         sql = """
# 		SELECT name,img,start,end from Characters
# 		RIGHT JOIN Timeline ON Characters.id = Timeline.cid
# 		ORDER BY name, start;"""
#         cursor.execute(sql)
#         result = cursor.fetchall()
#         return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)

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
