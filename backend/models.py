from typing import Union
from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    manager_input: str
    isSus: bool
    category: str
    additional_data: Union[str, None] = None

