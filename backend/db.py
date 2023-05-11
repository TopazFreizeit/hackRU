from models import Employee
import json

JSON_DB_PATH = "data/dummy_data.json"

def get_employee_data(employee_id: int):
    with open(JSON_DB_PATH) as json_file:
        db_data = json.load(json_file)
    employee_data = None
    
    try:
        employee_data = [e_data for e_data in db_data if e_data["id"] == employee_id][0]
    except IndexError:
        print(f"ERROR: Employee id {employee_id} not found!")
    except KeyError:
        print(f"ERROR: The 'id' key is missing from one the data entries!")

    return employee_data

def merge_db_and_request_data(employee_db_data, employee: Employee):
    for prop_key, prop_val in employee.dict().items():
        if prop_key != "id" and prop_val is not None:
            employee_db_data["properties"][prop_key] = prop_val

    return employee_db_data
