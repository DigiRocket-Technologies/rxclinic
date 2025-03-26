import express from "express";
import cors from "cors"; // Import cors
import { submitForm } from "./controllers/formController.js";

const app = express();

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: "http://localhost:8080", // Allow requests from this origin
    methods: ["POST"], // Allow only POST requests (or add others like GET if needed)
    allowedHeaders: ["Content-Type"], // Allow Content-Type header
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submission
app.post("/submitForm", submitForm);

app.listen(3000, () => console.log(`Server listening at port 3000`));
