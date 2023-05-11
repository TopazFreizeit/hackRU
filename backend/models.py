from typing import Union
from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    manager_input: str
    isSus: bool
    additional_data: Union[str, None] = None

