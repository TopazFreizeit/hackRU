from typing import Union
from pydantic import BaseModel

class Employee(BaseModel):
    id: int
    additional_data: Union[str, None] = None
