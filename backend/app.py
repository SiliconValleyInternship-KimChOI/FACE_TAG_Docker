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
from werkzeug.wrappers import Response
from flask_cors import CORS

# celery
from worker import celery

# mysql
import mysql.connector

# Convert sec_to_time
from time import strftime, gmtime

# autio handle
from moviepy.editor import *

# s3 connection
from connection import s3_connection, BUCKET_NAME, BUCKET_URL
import boto3

Upload_URL = "./input_video/"
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = Upload_URL
video_path = "./output_video/"
# filename = ""
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
        # if "file" not in request.files:
        #     flash("no file part")
        #     return redirect(request.rul)
        video_file = request.files["file"]
        # 파일 내용이 없을 경우
        # if video_file == "":
        #     flash("No selected file")
        #     return redirect(request.url)
        # 파일 안정성 확인
        global filename
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
    sql = """TRUNCATE TABLE timeline;"""
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
    return "timeline update"


@app.route("/fileDown", methods=["POST"])
def post_video():
    if request.method == "POST":
        # 파일 이름 가져오기
        # 영상 처리
        data = request.get_json()
        filename = data['name']
        audioclip = VideoFileClip("./input_video/" + filename).audio
        video = celery.send_task(
            "processing", args=[app.config["UPLOAD_FOLDER"] + filename]
        )
        # os.rmdir(app.config["UPLOAD_FOLDER"])
        # 등장인물 타임라인 DB 저장
        global timeline
        data = str(video.get())
        timeline = eval(data)
        # db 저장
        insertTimeline(timeline)

        # 소리 합치기
        if not (os.path.exists(video_path+"result/")):
            os.mkdir(video_path+"result/")

        videoclip = VideoFileClip(video_path + filename)
        videoclip.audio = audioclip
        videoclip.write_videofile(video_path+"result/" + filename)
        # S3 버킷에 영상 저장
        s3 = s3_connection()
        s3.upload_file(
            video_path+"result/"+filename,
            BUCKET_NAME,
            filename,
            ExtraArgs={
                "ContentType": 'video/mp4'
            })
        # 영상 url
        url = BUCKET_URL + filename
        db = getMysqlConnection()
        cursor = db.cursor()
        sql = """
        SELECT name,img,start,end from characters 
        RIGHT JOIN timeline ON characters.id = timeline.cid
        ORDER BY name, start;"""
        cursor.execute(sql)
        result = cursor.fetchall()

        return jsonify({"url": url, "timeline": result})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)
