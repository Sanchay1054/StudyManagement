from flask import Flask, request
from flask_cors import CORS
import pymysql
import json
import google.generativeai as genai
from googletrans import Translator

app = Flask(__name__)
CORS(app)

conn = pymysql.connect(host='localhost',user='root',password='your_password',database='studymanagement')
cursor = conn.cursor()

genai.configure(api_key="your_gemini_api_key")
model = genai.GenerativeModel('gemini-pro')
translator = Translator()

target_language = 'en'


@app.route("/subject",methods=["POST"])
def subject():
    try:
        data = json.loads(str(request.data,'utf-8'))
        print(data)
        studentId = data['studentId']
        current_study = data['current_study']
        cursor.execute("SELECT * FROM student"+str(studentId)+"subject WHERE study='"+str(current_study)+"';")
        subjects = cursor.fetchall()
        print(subjects)
        return {"status":"fetched","subject":subjects}
    except Exception as e:
        print(e)
        return {"status":"not fetched","message":e}
    
@app.route("/topic",methods=["POST"])
def topic():
    try:
        data = json.loads(str(request.data,'utf-8'))
        print(data)
        studentId = data['studentId']
        subjectId = data['subjectId']
        cursor.execute("SELECT * FROM student"+str(studentId)+"topic WHERE subjectId="+str(subjectId)+";")
        topics = cursor.fetchall()
        print(topics)
        return {"status":"fetched","subject":topics}
    except Exception as e:
        print(e)
        return {"status":"not fetched","message":e}
    
@app.route("/study",methods=["POST"])
def study():
    try:
        data = json.loads(str(request.data,'utf-8'))
        print(data)
        studentId = data['studentId']
        topicId = data['topicId']
        cursor.execute("SELECT * FROM student"+str(studentId)+"study WHERE topicId="+str(topicId)+";")
        study = cursor.fetchall()
        cursor.execute("SELECT topic FROM student"+str(studentId)+"topic WHERE topicId="+str(topicId)+";")
        topic = cursor.fetchone()
        print(study)
        return {"status":"fetched","subject":study,"topic":topic}
    except Exception as e:
        print(e)
        return {"status":"not fetched","message":e}
    
@app.route("/answer",methods=["POST"])
def answer():
    try:
        data = json.loads(str(request.data,'utf-8'))
        print(data)
        question = data['question']
        answer = data['answer']
        ans = data['ans']

        q1 = translator.detect(question)
        translation_question = translator.translate(question, src=q1.lang, dest='en').text
        translation_answer1 = translator.translate(answer, src=q1.lang, dest='en').text
        translation_answer2 = translator.translate(ans, src=q1.lang, dest='en').text
        prompt = (f"Question: {translation_question}\n"
                f"Answer1: {translation_answer1}\n"
                f"Answer2: {translation_answer2}\n"
                "Analyze both answers,if the answers are same then appreciate else provide the missing features from the 2nd answer while compared to 1st answer. So tell the students in which area they should improve")

        response = model.generate_content(prompt)
        if response.candidates:
            generated_text = response.candidates[0].content.parts[0].text
            print(generated_text)  # Print the generated response
            return {"status":"fetched","answer":generated_text}
        else:
            print("No candidates found in the response.")
            return {"status":"fetched","answer":"No candidates found in the response."}
    except Exception as e:
        print(e)
        return {"status":"not fetched","answer":e}
    
@app.route("/addsubject",methods=["POST"])
def addsubject():
    try:
        data = json.loads(str(request.data,'utf-8'))
        print(data)
        studentId = data['studentId']
        subject = data['subject']
        description = data['description']
        study = data['study']
        cursor.execute("INSERT INTO student"+str(studentId)+"subject(name,description,study) VALUES ('"+subject+"','"+description+"','"+str(study)+"');")
        conn.commit()
        return {"status":"fetched"}
    except Exception as e:
        print(e)
        return {"status":"not fetched","message":e} 


if __name__=='__main__':
    app.run(port=5000)