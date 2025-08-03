from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS: Allow frontend to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with Vercel/Netlify URL
    allow_methods=["*"],
    allow_headers=["*"],
)

class BMRInput(BaseModel):
    age: int
    gender: str
    height: float
    weight: float

@app.post("/calculate")
def calculate_bmr(data: BMRInput):
    if data.gender.lower() == "male":
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
    else:
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161
    return {"bmr": round(bmr, 2)}
