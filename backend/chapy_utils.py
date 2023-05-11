import openai


def getChapy():
    openai.api_key = "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"
    return openai.ChatCompletion()

def send_and_recive_query_to_chapy(chapy, role, message_content):
    ans = chapy.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": f"{role}", "content": f"{message_content}"},
                ]
            )
    
    return ans['choices'][0]['message']['content']