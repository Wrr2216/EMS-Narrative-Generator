const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/generate-narrative", (req, res) => {
    const {
        importantNotes,
        unit,
        location,
        age,
        gender,
        chiefComplaint,
        conditionOnArrival,
        symptoms,
        duration,
        ao,
        informeddecisions,
        medicalHistory,
        gcs,
        skin,
        vitals,
        findings,
        ekgFindings,
        destination,
        gaugeLocation,
        medications,
        transportType,
        hospital,
        communicationMethod,
        eta,
        erRoom,
        signature
    } = req.body;

    const narrative = `
${importantNotes ? `### Important Notes:\n${importantNotes}\n` : ""}

#### Dispatch:
${unit} was dispatched to ${location} for a ${age}-year-old ${gender} with complaints/reports of ${chiefComplaint}. Upon arrival, the patient was found ${conditionOnArrival}.

#### History:
The patient reports experiencing ${symptoms} for ${duration}. The patient is awake, alert, and oriented x${ao}, and ${informeddecisions} of making informed decisions. The patient has ${medicalHistory ? `a history of ${medicalHistory}` : "no pertinent medical history"}.

#### Assessment:
The patient is GCS ${gcs}, AOx${ao}.
- Skin: ${skin}.
- Pupils: PERRL (Pupils Equal, Round, Reactive to Light).
- Vital signs: ${vitals}.
- Differential findings: ${findings}.

#### EKG:
${ekgFindings}.

#### Rx/Treatment:
The patient requested transport to ${destination}.
- The patient was assisted onto the stretcher, secured with straps x4 and rails x2, and positioned comfortably.
- IV access was established with ${gaugeLocation || "N/A"}${gaugeLocation ? " and maintained with a saline lock" : ""}.
- ${medications || "No medications were administered."}
- Ongoing monitoring was conducted en route with regular reassessments of the patient’s condition and vital signs. No changes in the patient’s condition were noted during transport.

#### Transport:
Transport began ${transportType} to ${hospital} per the patient’s choice. A ${communicationMethod} report was provided to the receiving facility with a ${eta}-minute ETA.

Upon arrival, the patient was registered and taken to ER Room ${erRoom}. Handoff report was given to the RN, and patient care was transferred.

At this time, the unit cleared and returned to service.

${signature}
    `;

    res.render("index", { narrative });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
