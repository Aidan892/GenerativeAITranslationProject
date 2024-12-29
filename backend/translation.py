from openai import OpenAI
import sys
import json
import flask
from flask import Flask, request, jsonify

app = Flask(__name__)
app.config.from_object(__name__)

#decorator - creates endpoint
@app.route("/chat", methods = ["POST"])
def chat():
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": message}],
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")

if __name__ == "__main__":
    filePath = sys.argv[1]

    with open(filePath, 'r') as configFile:
        configData = json.load(configFile)
        OPEN_AI_KEY = configData["OPEN_AI_KEY"]
        configFile.close()
        message = "Spell Hi"

    client = OpenAI(api_key = OPEN_AI_KEY)
    app.run(host="0.0.0.0", port = 5000)

    