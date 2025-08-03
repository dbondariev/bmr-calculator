import { useState } from "react";
import axios from "axios";
import {
    Container,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Typography,
    Box,
    Paper,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";

function App() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("");
    const [bmr, setBmr] = useState<number | null>(null);

    const handleClear = () => {
        setAge("");
        setGender("");
        setHeight("");
        setWeight("");
        setActivity("");
        setBmr(null);
    };

    const handleCalculate = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/calculate`, {
                age: Number(age),
                gender,
                height: Number(height),
                weight: Number(weight),
                activity_level: activity,
            });
            setBmr(response.data.bmr);
        } catch (err) {
            alert("Error calculating BMR.");
        }
    };

    const isValid = () => {
        const a = Number(age);
        const h = Number(height);
        const w = Number(weight);
        return (
            a >= 1 &&
            a <= 100 &&
            h > 0 &&
            h <= 272 &&
            w > 0 &&
            w <= 635 &&
            (gender === "male" || gender === "female") &&
            activity !== ""
        );
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCalculate();
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Basal Metabolic Rate Calculator
                    </Typography>

                    <TextField
                        label="Age"
                        type="number"
                        fullWidth
                        required
                        margin="normal"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        error={!age || Number(age) <= 0 || Number(age) > 100}
                        helperText={
                            !age
                                ? "Age is required"
                                : Number(age) <= 0 || Number(age) > 100
                                    ? "Enter age between 1 and 100"
                                    : ""
                        }
                    />

                    <FormControl
                        component="fieldset"
                        margin="normal"
                        required
                        error={!gender}
                    >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        label="Height (cm)"
                        type="number"
                        fullWidth
                        required
                        margin="normal"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        error={!height || Number(height) <= 0 || Number(height) > 272}
                        helperText={
                            !height
                                ? "Height is required"
                                : Number(height) <= 0 || Number(height) > 272
                                    ? "Enter height between 1 and 272 cm"
                                    : ""
                        }
                    />

                    <TextField
                        label="Weight (kg)"
                        type="number"
                        fullWidth
                        required
                        margin="normal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        error={!weight || Number(weight) <= 0 || Number(weight) > 635}
                        helperText={
                            !weight
                                ? "Weight is required"
                                : Number(weight) <= 0 || Number(weight) > 635
                                    ? "Enter weight between 1 and 635 kg"
                                    : ""
                        }
                    />

                    <FormControl
                        fullWidth
                        required
                        margin="normal"
                        error={!activity}
                    >
                        <InputLabel>Activity Level</InputLabel>
                        <Select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            label="Activity Level"
                        >
                            <MenuItem value="">Select...</MenuItem>
                            <MenuItem value="sedentary">Sedentary (little or no exercise)</MenuItem>
                            <MenuItem value="light">Lightly active (light exercise/sports 1–3 days/week)</MenuItem>
                            <MenuItem value="moderate">Moderately active (3–5 days/week)</MenuItem>
                            <MenuItem value="active">Very active (6–7 days/week)</MenuItem>
                            <MenuItem value="extra">Super active (hard daily training)</MenuItem>
                        </Select>
                    </FormControl>

                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isValid()}
                        >
                            Calculate
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleClear}
                            disabled={!age && !gender && !height && !weight && !activity}
                        >
                            Clear
                        </Button>
                    </Box>

                    {bmr !== null && (
                        <Typography
                            variant="h6"
                            align="center"
                            mt={4}
                            color="primary"
                            fontWeight="bold"
                        >
                            Your Basal Metabolic Rate: {bmr}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Container>
    );
}

export default App;
