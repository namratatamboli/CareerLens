from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import analyze_job

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():

    job = request.json

    result = analyze_job(job)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)