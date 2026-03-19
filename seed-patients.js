const mongoose = require("mongoose");
const Patient = require("./models/patient.js");
const Room = require("./models/Room.js");

const patients = [
    // Room 1 - General (flu, minor illness, non-urgent)
    { firstName: "James", lastName: "Harrison", dateOfBirth: new Date("1985-03-12"), medicalCondition: "Flu", roomNumber: "1", notes: "Resting, responding well to medication" },
    { firstName: "Sophie", lastName: "Clarke", dateOfBirth: new Date("1992-07-24"), medicalCondition: "Pneumonia", roomNumber: "1", notes: "On antibiotics, monitoring oxygen levels" },
    { firstName: "Daniel", lastName: "Wright", dateOfBirth: new Date("1978-11-05"), medicalCondition: "Asthma Attack", roomNumber: "1", notes: "Stabilised, on nebuliser treatment" },
    { firstName: "Emily", lastName: "Thompson", dateOfBirth: new Date("2001-02-18"), medicalCondition: "Appendicitis", roomNumber: "1", notes: "Pre-op observation, surgery scheduled" },
    { firstName: "George", lastName: "Bennett", dateOfBirth: new Date("1965-09-30"), medicalCondition: "Gastroenteritis", roomNumber: "1", notes: "IV fluids administered, improving" },
    { firstName: "Olivia", lastName: "Morgan", dateOfBirth: new Date("1998-04-14"), medicalCondition: "Migraine", roomNumber: "1", notes: "Pain management ongoing" },
    { firstName: "Harry", lastName: "Edwards", dateOfBirth: new Date("1955-12-01"), medicalCondition: "Urinary Tract Infection", roomNumber: "1", notes: "On antibiotics, improving" },
    { firstName: "Charlotte", lastName: "Hughes", dateOfBirth: new Date("1989-06-22"), medicalCondition: "Food Poisoning", roomNumber: "1", notes: "Rehydration therapy in progress" },
    { firstName: "William", lastName: "Foster", dateOfBirth: new Date("2003-08-09"), medicalCondition: "Flu", roomNumber: "1", notes: "High fever, monitoring closely" },
    { firstName: "Amelia", lastName: "Price", dateOfBirth: new Date("1972-01-27"), medicalCondition: "Bronchitis", roomNumber: "1", notes: "Chest physiotherapy prescribed" },
    { firstName: "Thomas", lastName: "Cook", dateOfBirth: new Date("1945-05-16"), medicalCondition: "Dehydration", roomNumber: "1", notes: "Elderly patient, IV fluids ongoing" },
    { firstName: "Grace", lastName: "Bailey", dateOfBirth: new Date("1995-10-03"), medicalCondition: "Tonsillitis", roomNumber: "1", notes: "On antibiotics, throat very swollen" },
    { firstName: "Oliver", lastName: "Reed", dateOfBirth: new Date("1980-03-28"), medicalCondition: "Ear Infection", roomNumber: "1", notes: "Prescribed antibiotics and pain relief" },

    // Room 2 - Emergency (serious/urgent conditions)
    { firstName: "Jack", lastName: "Turner", dateOfBirth: new Date("1975-07-11"), medicalCondition: "Broken Leg", roomNumber: "2", notes: "Fracture to tibia, awaiting surgery" },
    { firstName: "Isla", lastName: "Walker", dateOfBirth: new Date("1988-02-05"), medicalCondition: "Heart Attack", roomNumber: "2", notes: "Stabilised after cardiac event, under close observation" },
    { firstName: "Noah", lastName: "White", dateOfBirth: new Date("1962-09-19"), medicalCondition: "Severe Burns", roomNumber: "2", notes: "Burns to 30% of body, specialist team involved" },
    { firstName: "Freya", lastName: "Hall", dateOfBirth: new Date("1999-12-30"), medicalCondition: "Head Injury", roomNumber: "2", notes: "CT scan completed, monitoring for concussion" },
    { firstName: "Ethan", lastName: "Green", dateOfBirth: new Date("1991-04-07"), medicalCondition: "Broken Arm", roomNumber: "2", notes: "Compound fracture, surgery completed" },
    { firstName: "Poppy", lastName: "Adams", dateOfBirth: new Date("2005-08-23"), medicalCondition: "Severe Allergic Reaction", roomNumber: "2", notes: "Anaphylaxis treated with epinephrine, stable" },
    { firstName: "Liam", lastName: "Baker", dateOfBirth: new Date("1958-06-14"), medicalCondition: "Stroke", roomNumber: "2", notes: "Thrombolysis administered, speech affected" },
    { firstName: "Ava", lastName: "Nelson", dateOfBirth: new Date("1983-11-02"), medicalCondition: "Chest Pain", roomNumber: "2", notes: "ECG monitoring ongoing, possible angina" },
    { firstName: "Mason", lastName: "Carter", dateOfBirth: new Date("1970-03-25"), medicalCondition: "Internal Bleeding", roomNumber: "2", notes: "Post RTA, emergency surgery performed" },
    { firstName: "Lily", lastName: "Mitchell", dateOfBirth: new Date("1996-01-18"), medicalCondition: "Broken Leg", roomNumber: "2", notes: "Femur fracture, in traction" },
    { firstName: "Jacob", lastName: "Perez", dateOfBirth: new Date("1944-07-08"), medicalCondition: "Heart Failure", roomNumber: "2", notes: "Elderly patient, diuretics administered" },
    { firstName: "Mia", lastName: "Roberts", dateOfBirth: new Date("2000-05-31"), medicalCondition: "Seizure", roomNumber: "2", notes: "Anti-epileptic medication given, monitoring" },

    // Room 3 - Isolation (infectious conditions)
    { firstName: "Logan", lastName: "Evans", dateOfBirth: new Date("2010-02-14"), medicalCondition: "Chicken Pox", roomNumber: "3", notes: "Child patient, isolated to prevent spread" },
    { firstName: "Chloe", lastName: "Turner", dateOfBirth: new Date("2008-09-06"), medicalCondition: "Measles", roomNumber: "3", notes: "Rash spreading, parents informed" },
    { firstName: "Alfie", lastName: "Phillips", dateOfBirth: new Date("1990-12-22"), medicalCondition: "Tuberculosis", roomNumber: "3", notes: "On four-drug TB therapy, strict isolation" },
    { firstName: "Ella", lastName: "Campbell", dateOfBirth: new Date("1968-04-17"), medicalCondition: "COVID-19", roomNumber: "3", notes: "Oxygen therapy required, monitoring saturation" },
    { firstName: "Charlie", lastName: "Parker", dateOfBirth: new Date("2007-07-29"), medicalCondition: "Scarlet Fever", roomNumber: "3", notes: "Child patient, responding to penicillin" },
    { firstName: "Lucy", lastName: "Stewart", dateOfBirth: new Date("1953-10-11"), medicalCondition: "Norovirus", roomNumber: "3", notes: "Elderly patient, severe vomiting and diarrhoea" },
    { firstName: "Oscar", lastName: "Morris", dateOfBirth: new Date("2009-03-04"), medicalCondition: "Whooping Cough", roomNumber: "3", notes: "Child, on azithromycin, improving slowly" },
    { firstName: "Hannah", lastName: "Rogers", dateOfBirth: new Date("1977-08-16"), medicalCondition: "Shingles", roomNumber: "3", notes: "Antiviral treatment started, pain managed" },
    { firstName: "Archie", lastName: "Cook", dateOfBirth: new Date("1935-01-09"), medicalCondition: "MRSA", roomNumber: "3", notes: "Strict contact precautions in place" },
    { firstName: "Evie", lastName: "Morgan", dateOfBirth: new Date("2012-06-20"), medicalCondition: "Mumps", roomNumber: "3", notes: "Child patient, parotid swelling noted" },
    { firstName: "Henry", lastName: "Bell", dateOfBirth: new Date("1986-11-28"), medicalCondition: "COVID-19", roomNumber: "3", notes: "High temperature, fatigue, isolated" },
    { firstName: "Daisy", lastName: "Murphy", dateOfBirth: new Date("1963-05-03"), medicalCondition: "Chicken Pox", roomNumber: "3", notes: "Adult case, more severe than typical" },
    { firstName: "Sebastian", lastName: "Bailey", dateOfBirth: new Date("2006-09-15"), medicalCondition: "Scarlet Fever", roomNumber: "3", notes: "Teenager, throat culture taken" },

    // Room 4 - Recovery (post-surgery / recovering)
    { firstName: "Harriet", lastName: "Wood", dateOfBirth: new Date("1950-04-02"), medicalCondition: "Post Hip Replacement", roomNumber: "4", notes: "Physiotherapy started, mobilising with frame" },
    { firstName: "Edward", lastName: "Barnes", dateOfBirth: new Date("1967-08-13"), medicalCondition: "Post Appendectomy", roomNumber: "4", notes: "Surgery successful, wound healing well" },
    { firstName: "Rosie", lastName: "Cooper", dateOfBirth: new Date("1982-02-26"), medicalCondition: "Post Knee Surgery", roomNumber: "4", notes: "Recovering well, pain controlled" },
    { firstName: "Theo", lastName: "Richardson", dateOfBirth: new Date("1974-06-07"), medicalCondition: "Recovering from Stroke", roomNumber: "4", notes: "Speech therapy sessions commenced" },
    { firstName: "Imogen", lastName: "Cox", dateOfBirth: new Date("1959-10-24"), medicalCondition: "Post Chemotherapy", roomNumber: "4", notes: "Fatigue high, bloods monitored daily" },
    { firstName: "Finley", lastName: "Howard", dateOfBirth: new Date("1993-03-19"), medicalCondition: "Post Spinal Surgery", roomNumber: "4", notes: "Bed rest required, neurological checks ongoing" },
    { firstName: "Abigail", lastName: "Ward", dateOfBirth: new Date("1948-12-05"), medicalCondition: "Post Cardiac Surgery", roomNumber: "4", notes: "Recovering from bypass, cardiac monitoring" },
    { firstName: "Reuben", lastName: "Torres", dateOfBirth: new Date("1986-07-31"), medicalCondition: "Post Gallbladder Removal", roomNumber: "4", notes: "Laparoscopic surgery, diet being reintroduced" },
    { firstName: "Phoebe", lastName: "Peterson", dateOfBirth: new Date("2002-04-10"), medicalCondition: "Recovering from Pneumonia", roomNumber: "4", notes: "Oxygen no longer required, eating well" },
    { firstName: "Isaac", lastName: "Gray", dateOfBirth: new Date("1971-09-22"), medicalCondition: "Post Fracture Recovery", roomNumber: "4", notes: "Cast removed, physiotherapy underway" },
    { firstName: "Scarlett", lastName: "James", dateOfBirth: new Date("1938-02-17"), medicalCondition: "Post Hip Replacement", roomNumber: "4", notes: "Elderly patient, slow but steady recovery" },
    { firstName: "Elliot", lastName: "Watson", dateOfBirth: new Date("1979-05-14"), medicalCondition: "Post Knee Surgery", roomNumber: "4", notes: "Swelling reducing, physio twice daily" }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB");

        for (const data of patients) {
            const patient = new Patient(data);
            await patient.save();

            const room = await Room.findOne({ roomNumber: data.roomNumber });
            if (room) {
                room.currentPatients.push(patient._id);
                room.isOccupied = true;
                await room.save();
            }

            console.log(`Created: ${data.firstName} ${data.lastName} -> Room ${data.roomNumber}`);
        }

        console.log("\nAll 50 patients created successfully.");
        process.exit(0);
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });