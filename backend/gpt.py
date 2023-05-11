import openai

with open("data/gpt_api_key.txt") as api_key_file:
    API_KEY = api_key_file.read()

def get_chapy():
    openai.api_key = API_KEY
    return openai.ChatCompletion()

def send_and_recive_query_to_chapy(chapy, message_content, role="user"):
    ans = chapy.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": f"{role}", "content": f"{message_content}"},
                ]
            )
    
    return ans['choices'][0]['message']['content']

def construct_query(employee: dict):
    employee_background_str = _get_employee_background_str(employee_data=employee)
    query = f"Please generate 10 goals, doable in a year,\
          for a {employee['role']} with the following background:\n {employee_background_str}" 
    
    return query

def _get_employee_background_str(employee_data: dict):
    employee_background_str = ""

    for prop_name, prop_val in enumerate(employee_data["properties"]):
        employee_background_str += f"- {prop_name}: {prop_val}\n" 
    
    return employee_background_str