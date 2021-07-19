import os
from flask import Flask, flash,  request, jsonify, redirect, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename
from worker import celery
import celery.states as states
import mysql.connector

Upload_URL = "./video"
# Flask 인스턴스 생성
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = Upload_URL
CORS(app)


def getMysqlConnection():
    config = {
        'user': 'tester',
        'host': 'db',
        'port': '3306',
        'password': 'test',
        'database': 'test',
        'auth_plugin': 'mysql_native_password'  # default는 sha256으로 오류 발생
    }
    return mysql.connector.connect(**config)


@app.route('/test', methods=['GET'])
def get_test():
    db = getMysqlConnection()
    try:
        sql = "SELECT * FROM testtb"
        cur = db.cursor()
        cur.execute(sql)
        output_json = cur.fetchall()
        return jsonify(output_json)
    except Exception as e:
        print("Error in SQL: /n", e)
    finally:
        db.close()


@app.route('/add/<int:param1>/<int:param2>')
def add(param1: int, param2: int) -> str:
    task = celery.send_task('tasks.add', args=[param1, param2], kwargs={})
    response = f"<a href='{url_for('check_task', task_id=task.id, external=True)}'>check status of {task.id} </a>"
    return response


@app.route('/check/<string:task_id>')
def check_task(task_id: str) -> str:
    res = celery.AsyncResult(task_id)
    # res = celery.AsynchronousResult(task_id)
    if res.state == states.PENDING:
        return res.state
    else:
        return str(res.result)


@app.route('/fileUpload', methods=['GET', 'POST'])
def get_video():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('no file part')
            return redirect(request.rul)
        video_file = request.files['file']
        if video_file == '':
            flash('No selected file')
            return redirect(request.url)
        filename = secure_filename(video_file.filename)
        path = os.path.join(Upload_URL, filename)
        # 해당 경로 파일이 존재하지 않을 경우
        if not (os.path.exists(Upload_URL)):
            os.mkdir(Upload_URL)
        video_file.save(path)
        return jsonify({'success': True, 'file': 'Received', 'name': filename})
    if request.method == 'GET':
        return "flask test"


# debug=true를 통해 무엇이 오류인지 알려준다.
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
