
import React, { useState } from 'react';
import axios from 'axios';
import './PredictionForm.css'; 

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        gender: 'Female',
        SeniorCitizen: 0,
        Partner: 'Yes',
        Dependents: 'No',
        tenure: 1,
        PhoneService: 'No',
        MultipleLines: 'No phone service',
        InternetService: 'DSL',
        OnlineSecurity: 'No',
        OnlineBackup: 'Yes',
        DeviceProtection: 'No',
        TechSupport: 'No',
        StreamingTV: 'No',
        StreamingMovies: 'No',
        Contract: 'Month-to-month',
        PaperlessBilling: 'Yes',
        PaymentMethod: 'Electronic check',
        MonthlyCharges: 29.85,
        TotalCharges: 29.85,
    });


    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = e.target.type === 'number' ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevention from default browser submission
        setLoading(true);
        setError('');
        setPrediction(null);

        try {
            const API_URL = "http://127.0.0.1:8000/predict";
            const response = await axios.post(API_URL, formData);
            setPrediction(response.data);
        } catch (err) {
            setError('Failed to get prediction. Please ensure the backend server is running and accessible.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Enter Customer Details</h2>
                <div className="form-grid">
                    {/* Column 1 */}
                    <div className="form-column">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>

                        <label>Senior Citizen</label>
                        <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleChange}>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>

                        <label>Partner</label>
                        <select name="Partner" value={formData.Partner} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                        <label>Dependents</label>
                        <select name="Dependents" value={formData.Dependents} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>

                        <label>Tenure (Months)</label>
                        <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} min="0" />
                    </div>

                    {/* Column 2 */}
                    <div className="form-column">
                        <label>Phone Service</label>
                        <select name="PhoneService" value={formData.PhoneService} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                        <label>Multiple Lines</label>
                        <select name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}>
                            <option value="No phone service">No phone service</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>

                        <label>Internet Service</label>
                        <select name="InternetService" value={formData.InternetService} onChange={handleChange}>
                            <option value="DSL">DSL</option>
                            <option value="Fiber optic">Fiber optic</option>
                            <option value="No">No</option>
                        </select>

                        <label>Online Security</label>
                        <select name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="No internet service">No internet service</option>
                        </select>

                        <label>Online Backup</label>
                        <select name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="No internet service">No internet service</option>
                        </select>
                    </div>

                    {/* Column 3 */}
                    <div className="form-column">
                        <label>Device Protection</label>
                        <select name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="No internet service">No internet service</option>
                        </select>

                        <label>Tech Support</label>
                        <select name="TechSupport" value={formData.TechSupport} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="No internet service">No internet service</option>
                        </select>

                        <label>Streaming TV</label>
                        <select name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="No internet service">No internet service</option>
                        </select>

                        <label>Streaming Movies</label>
                        <select name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="No internet service">No internet service</option>
                        </select>
                    </div>

                    {/* Column 4 */}
                    <div className="form-column">
                        <label>Contract</label>
                        <select name="Contract" value={formData.Contract} onChange={handleChange}>
                            <option value="Month-to-month">Month-to-month</option>
                            <option value="One year">One year</option>
                            <option value="Two year">Two year</option>
                        </select>

                        <label>Paperless Billing</label>
                        <select name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                        <label>Payment Method</label>
                        <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleChange}>
                            <option value="Electronic check">Electronic check</option>
                            <option value="Mailed check">Mailed check</option>
                            <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                            <option value="Credit card (automatic)">Credit card (automatic)</option>
                        </select>

                        <label>Monthly Charges ($)</label>
                        <input type="number" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleChange} step="0.01" min="0" />

                        <label>Total Charges ($)</label>
                        <input type="number" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange} step="0.01" min="0" />
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict Churn'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {prediction && (
                <div className="result-container">
                    <h3>Prediction Result</h3>
                    <p className={prediction.prediction === 'Will Churn' ? 'churn' : 'no-churn'}>
                        Prediction: <strong>{prediction.prediction}</strong>
                    </p>
                    <p>
                        Churn Probability: <strong>{(prediction.churn_probability * 100).toFixed(2)}%</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;