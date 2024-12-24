from openai import OpenAI
import sys
import json

if __name__ == "__main__":
    filePath = sys.argv[1]

    with open(filePath, 'r') as configFile:
        configData = json.load(configFile)
        OPEN_AI_KEY = configData["OPEN_AI_KEY"]
        configFile.close()

    client = OpenAI(api_key = OPEN_AI_KEY)

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Say this is a test"}],
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")
