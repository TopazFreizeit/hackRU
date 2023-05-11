from fastapi import FastAPI
from models import Employee
from gpt import construct_query, send_and_recive_query_to_chapy, get_chapy
from db import get_employee_data, merge_db_and_request_data

chapy = get_chapy()
app = FastAPI()


# Routes

@app.post("/goals")
async def get_employee_goals(employee: Employee):
    employee_db_data = get_employee_data(employee.id)
    employee_data = merge_db_and_request_data(employee_db_data, employee)

    query = construct_query(employee_data)
    print(f"QUERY: {query}")
    result = send_and_recive_query_to_chapy(chapy, query)

    return result