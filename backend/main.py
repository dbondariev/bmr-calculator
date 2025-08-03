from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS: Allow frontend to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define valid activity level multipliers
activity_multipliers = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very active": 1.9
}

# Updated model to include activity_level
class BMRInput(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    activity_level: str  # new field

@app.post("/calculate")
def calculate_bmr(data: BMRInput):
    if data.gender.lower() == "male":
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
    else:
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161

    multiplier = activity_multipliers.get(data.activity_level.lower(), 1.2)
    tdee = bmr * multiplier

    return {
        "bmr": round(bmr, 2),
        "tdee": round(tdee, 2),
        "activity_level": data.activity_level.lower()
    }
