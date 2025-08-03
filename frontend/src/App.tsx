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
} from "@mui/material";

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
                    />

                    <FormControl component="fieldset" margin="normal" required>
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
                    />

                    <TextField
                        label="Weight (kg)"
                        type="number"
                        fullWidth
                        required
                        margin="normal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />

                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!age || !gender || !height || !weight}
                        >
                            Calculate
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleClear}
                            disabled={!age && !gender && !height && !weight}
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
