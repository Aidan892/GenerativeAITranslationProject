from openai import OpenAI
import sys
import json
import flask
import logging
from flask import Flask, request, jsonify

app = Flask(__name__)
app.config.from_object(__name__)

#decorator - creates endpoint
#1/5/24
#Use endpoint to send frontend text over to backend
@app.route("/chat", methods = ["POST"])
def chat():
    requestBody = request.json
    message = requestBody["message"] 
    logging.info(message)
    systemPrompt = "Job is to return translated code from one programming language to another based on user input, only return code output"
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": systemPrompt},{"role": "user", "content": message}],
        stream=True,
    )
    response = ""
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            response += chunk.choices[0].delta.content
    logging.info(response)
    return {"response":response, "success": true}


if __name__ == "__main__":
    filePath = sys.argv[1]

    with open(filePath, 'r') as configFile:
        configData = json.load(configFile)
        OPEN_AI_KEY = configData["OPEN_AI_KEY"]
        configFile.close()
        message = "Spell Hi"

    client = OpenAI(api_key = OPEN_AI_KEY)
    app.run(host="0.0.0.0", port = 5000)

    