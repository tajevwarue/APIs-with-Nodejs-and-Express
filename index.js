// Setting up the app
const express = require("express")
app = express()

// Setting a port and middleware for post requests
const PORT = process.env.PORT || 5000
app.use(express.json())

// Setting up Drugs Array
const drugs = [

    { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
    
    { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
    
    { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
    
    { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
    
    { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
    
    { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
    
    { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
    
    { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
    
    { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
    
    { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
    
    { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
    
    { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
    
    { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
    
    { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
    
    { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
    
    { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
    
    { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
    
    { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
    
    { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
    
    { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
    
    ];

// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// Testing Server
app.get("/", (request, response)=>{
    response.send("Welcome to our Drugs Information Server!")
})

// 1. API getting all drugs that are antibiotics
app.get("/drugs/antibiotics", (request, response)=>{
    const antibiotics = drugs.filter((drug)=>{
        return drug.category == "Antibiotic"
    })
    response.json(antibiotics)
})

// 2. API returning an array of drug names in lowercase
app.get("/drugs/names", (request, response)=>{
    const drugNames = drugs.map((drug)=>{
        return drug.name.toLocaleLowerCase()
    })
    response.json(drugNames)     
})

// 3. API category function
app.post("/drugs/by-category", (request, response) => {
    const {category} = request.body

    const drugCategories = (category) => {
        return drugs.filter((drug) => {
            return drug.category == category
        })
    }

    const filteredDrugs = drugCategories(category)

    if (filteredDrugs.length == 0) {
        response.status(404).json({ message: "Drug category not in our database." })
    } else {
        response.json(filteredDrugs)
    }
})

// 4. API logging Each drug name and manufacturer
app.get("/drugs/names-manufacturers", (request, response)=>{
    const nameManufacturer = drugs.map(drug => ({
      name: drug.name,
      manufacturer: drug.manufacturer
    }))
    response.json(nameManufacturer)
})

// 5. API filtering drugs that requires  only precription
app.get("/drugs/prescription", (request, response)=>{
    const precisionRequired = drugs.filter((drug)=>{
        return drug.isPrescriptionOnly == true
    })
    response.json(precisionRequired)
})

// 6. API that returns array of drug name and dosage in mg
app.get("/drugs/names-dosages", (request, response)=>{
    const nameDosage = drugs.map((drug)=>{
        return `Drug: ${drug.name} - ${drug.dosageMg}mg`
    })
    response.json(nameDosage)
})

// 7. API for drugs with a stock less than 50
app.get("/drugs/low-stocks", (request, response)=>{
    const stockLessThan50 = (drugsArray)=>{
        return drugs.filter((drug) => {
            return drug.stock < 50
        })
    }
    response.json(stockLessThan50(drugs))
})

// 8. API for drugs that doesn't require only prescription
app.get("/drugs/non-prescription", (request, response)=>{
    const prescriptionNotRequired = drugs.filter((drug)=>{
        return drug.isPrescriptionOnly != true
    })
    response.json(prescriptionNotRequired)
})

// 9. API number of drugs from a manufacturer function with error message
app.post("/drugs/manufacturer-count", (request, response) => {
    const { manufacturer } = request.body

    const manufacturerTotalDrugs = (manufacturer) => {
        return drugs.filter((drug) => {
            return drug.manufacturer === manufacturer
        })
    }

    const filtered = manufacturerTotalDrugs(manufacturer)

    if (filtered.length === 0) {
        response.status(404).json({ message: "Manufacturer not in our database." })
    } else {
        response.json({
            manufacturer,
            drugsProduced: filtered.length
        })
    }
})

// 10. API of total Analgesics drugs 
app.get("/drugs/analgesics-count", (request, response) => {
    const totalAnalgesics = drugs.filter((drug) => {
        return drug.category === "Analgesic"
    }).length

    response.json({ totalAnalgesics: totalAnalgesics })
})
