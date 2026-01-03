from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import json

# Try to load the dataset for analytical endpoints
try:
    full_df = pd.read_csv('WA_Fn-UseC_-Telco-Customer-Churn.csv')
except FileNotFoundError:
    print("Warning: 'WA_Fn-UseC_-Telco-Customer-Churn.csv' not found. Analytical endpoints will not work.")
    full_df = None

#Create the FastAPI app instance FIRST
app = FastAPI(title="Churn Prediction & Analysis API", description="API for predicting and analyzing customer churn.")


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved assets
churn_model = joblib.load('churn_model.joblib')
scaler = joblib.load('scaler.joblib')
with open('model_columns.json', 'r') as f:
    model_columns = json.load(f)



class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float




@app.get("/")
def read_root():
    return {"message": "Welcome! The Churn Prediction API is running."}


@app.post('/predict', tags=["Prediction"])
def predict(data: CustomerData):
    """Takes a single customer's data and returns a churn prediction."""
    input_df = pd.DataFrame([data.dict()])
    input_df_encoded = pd.get_dummies(input_df)
    input_df_aligned = input_df_encoded.reindex(columns=model_columns, fill_value=0)
    input_df_scaled = scaler.transform(input_df_aligned)
    prediction = churn_model.predict(input_df_scaled)
    probability = churn_model.predict_proba(input_df_scaled)[0][1]
    churn_status = "Will Churn" if prediction[0] == 1 else "Will Not Churn"
    return {
        "prediction": churn_status,
        "churn_probability": round(float(probability), 4)
    }


@app.get("/churn_rate/by_gender", tags=["Analysis"])
def get_churn_rate_by_gender():
    """Calculates and returns the historical churn rate for males and females."""
    if full_df is None:
        raise HTTPException(status_code=503, detail="Dataset not loaded. This feature is unavailable.")

    gender_churn = full_df.groupby('gender')['Churn'].value_counts(normalize=True).unstack()
    result = gender_churn.apply(lambda x: round(x * 100, 2)).to_dict(orient='index')
    return result


@app.get("/churn_rate/by_senior_citizen", tags=["Analysis"])
def get_churn_rate_by_senior_citizen():
    """Calculates and returns the historical churn rate for senior and non-senior citizens."""
    if full_df is None:
        raise HTTPException(status_code=503, detail="Dataset not loaded. This feature is unavailable.")

    full_df['IsSenior'] = full_df['SeniorCitizen'].map({0: 'Non-Senior', 1: 'Senior Citizen'})

    senior_churn = full_df.groupby('IsSenior')['Churn'].value_counts(normalize=True).unstack()
    result = senior_churn.apply(lambda x: round(x * 100, 2)).to_dict(orient='index')
    return result