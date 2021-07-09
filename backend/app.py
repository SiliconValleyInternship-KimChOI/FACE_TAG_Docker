import datetime
import os
 
from flask import Flask, render_template, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

db = MongoEngine()
db.init_app(app)

class Todo(db.Document):
    title = db.StringField(max_length=60)
    text = db.StringField()
    done = db.BooleanField(default=False)
    pub_date = db.DateTimeField(default=datetime.datetime.now)


#기본 HTML 렌더링
@app.route('/')
def render_file():
   return render_template('index.html')

@app.route("/api")
def index():
    Todo.objects().delete()
    Todo(title="Simple todo A", text="12345678910").save()
    Todo(title="Simple todo B", text="12345678910").save()
    Todo.objects(title__contains="B").update(set__text="Hello world")
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

 #파일 업로드 처리
@app.route('/api/test', methods = ['POST'])
def testcode():
    if request.method == 'POST':
        name = request.args.get('name', 'Guest')
        return name


 #파일 업로드 처리
@app.route('/api/fileUpload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      return f.filename
      #저장할 경로 + 파일명
      #f.save(secure_filename(f.filename))
   
if __name__ == "__main__":
    app.run(debug=True, port=5000)