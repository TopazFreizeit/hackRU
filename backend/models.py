from typing import List, Union
from pydantic import BaseModel

class Employee(BaseModel):
    id: int
    strengths: Union[List[str], None] = None
    weakneses: Union[List[str], None] = None
