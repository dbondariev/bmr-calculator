import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmr, setBmr] = useState<number | null>(null);

    const handleClear = () => {
        setAge("");
        setGender("");
        setHeight("");
        setWeight("");
        setBmr(null);
    };

    const handleCalculate = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/calculate`, {
                age: Number(age),
                gender,
                height: Number(height),
                weight: Number(weight),
            });
            setBmr(response.data.bmr);
        } catch (err) {
            alert("Error calculating BMR.");
        }
    };

    const isFormFilled = age || gender || height || weight;

    return (
        <div className="container">
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCalculate();
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Basal Metabolic Rate Calculator</h1>

                <input
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    required
                />
                <input
                    placeholder="Gender (male/female)"
                    value={gender}
                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                    required
                    pattern="male|female"
                    title="Please enter 'male' or 'female'"
                />
                <input
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    required
                />
                <input
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    required
                />

                <div style={{ marginTop: "1rem" }}>
                    <button type="submit" disabled={!isFormFilled}>
                        Calculate
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={!isFormFilled}
                        style={{ marginLeft: "1rem" }}
                    >
                        Clear
                    </button>
                </div>

                {bmr !== null && <div className="result">Your Basal Metabolic Rate: {bmr}</div>}
            </form>
        </div>
    );
}

export default App;
