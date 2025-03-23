import openai
# from openai import OpenAI
import sys
import json
import flask
import logging
import tiktoken
logging.getLogger().setLevel(logging.INFO)
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()
OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")
#Notes:
# Internal server error 500 = backend error
MAX_RESPONSE_TOKEN_LIMIT = 3000
MAX_TOTAL_TOKEN_LIMIT = 9000

#calculates num of tokens in messages array
def numTokens(messages, model = 'gpt-4o-mini'):
    encoding = tiktoken.encoding_for_model(model)
    numTokens = 0
    for item in messages:
        #role fields & content key adds 4 tokens
        numTokens += 4
        for key, value in item.items():
            numTokens += len(encoding.encode(value))
            #example
            #[a,b,c,d,ef]
            #[1,3,2,4,16] -> len = 5
            if key == 'name':
                numTokens -= 1
    numTokens += 2
    return numTokens
app = Flask(__name__)
app.config.from_object(__name__)
CORS(app,resources = {r'/*':{'origins': '*'}})
@app.route('/',methods = ['GET'])
def index():
    return {"success": True}
#decorator - creates endpoint
#1/5/24
#Use endpoint to send frontend text over to backend
@app.route('/chat', methods = ['POST'])
def chat():
    requestBody = request.json
    message = requestBody["message"] 
    initialLanguage = requestBody["initialLanguage"]
    translateLanguage = requestBody["translateLanguage"]
    chatHistory = requestBody["chatHistory"]
    
    
    systemPrompt = f"Job is to return translated code from {initialLanguage} to {translateLanguage}, only return code output, nothing else, not even the programming language specification"
    messages = [{"role": "system", "content": systemPrompt}]
    
    for item in chatHistory:
        messages.append({"role": "user", "content": item["message"]})
        messages.append({"role": "assistant", "content": item["answer"]})

    messages.append({"role": "user", "content": message})
    tokenCount = numTokens(messages) 
    while (tokenCount + MAX_RESPONSE_TOKEN_LIMIT >= MAX_TOTAL_TOKEN_LIMIT):
        del messages[1]
        del messages[1]
        tokenCount = numTokens(messages)
    logging.info(messages)
    logging.info("Open AI Key: " + OPEN_AI_KEY)
    openai.api_key = OPEN_AI_KEY
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=messages,
        # stream=True,
        max_tokens = MAX_RESPONSE_TOKEN_LIMIT
    ) 
    # response = ""
    # for chunk in stream:
    #     if chunk.choices[0].delta.content is not None:
    #         response += chunk.choices[0].delta.content
    response = response["choices"][0]["message"]["content"]
    logging.info(response)
    return {"response": response, "chatHistory": chatHistory, "success": True}



if __name__ == "__main__":
    filePath = "/etc/secrets/config.json"
    # filePath = "C:\\Users\\Aidan\\Documents\\GenerativeAITranslationProject\\backend\\config.json"

    # with open(filePath, 'r') as configFile:
    #     configData = json.load(configFile)
    #     OPEN_AI_KEY = configData["OPEN_AI_KEY"]
    #     configFile.close()
    from dotenv import load_dotenv
    import os
    load_dotenv()  
    OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")

    logging.info("Open AI Key: " + OPEN_AI_KEY)
    # client = OpenAI(api_key = OPEN_AI_KEY)
    from waitress import serve
    #development server
    # app.run(host="0.0.0.0", port = 5000)
    #production server
    serve(app,host = "0.0.0.0",port = 5000)

    