// Track whether or not the flyout window is open
let flyoutOpen = false;

// Store the flyout window itself for easier handling
let flyoutWindow = document.getElementById("flyout-content");

// Storing the DOM elements for future access
    // Physician Elements
    let physicianNameInput = document.getElementById("pracName"); // Physician name
    let physicianGenderSelector = document.getElementById("pracGender"); // Physician gender
    // Patient Elements
    let patientNameInput = document.getElementById("ptName"); // Patient name
    let patientGenderSelector = document.getElementById("ptGender"); // patient gender
    // Injury Elements
    let bodySelector = document.getElementById("bodyPart"); // body part selector
    let injurySelector = document.getElementById("injuryType"); // injury type selector
    let injuryNotesInput = document.getElementById("notes"); // Injury notes
    // Emote Elements
    let fieldEmoteElement = document.getElementById("field");
    let blueEmoteElement = document.getElementById("blue");

// Physician details
let pName = "";
let pGender = physicianGenderSelector.value.toLowerCase();

// Patient details
let ptName = "";
let ptGender = patientGenderSelector.value.toLowerCase();

// Beginning of user functionality, woo! This is basically where I started
// getting everything ready for the user to interact with the webpage
const equipment = {
    "Haemorrhage Control": {
        "Asst. Chest Seals": "Used to treat penetrating chest wounds, preventing air from entering the chest cavity and causing a collapsed lung.",
        "Asst. Cravats/Slings": "Versatile triangular bandages used for supporting injured limbs, securing splints, or applying pressure to wounds.",
        "Asst. Tourniquets (incl. Junctional/Abdominal)": "Devices used to stop severe bleeding, particularly in limbs and junctional areas.",
        "Biofoam Injector": "Injects expanding foam into wounds to control internal bleeding and stabilize trauma.",
        "Combat Gauze": "Gauze treated with hemostatic agents to promote clotting and stop severe bleeding.",
        "Compressed Gauze": "Used to pack wounds and apply pressure to control bleeding.",
        "Emergency Trauma Bandages": "Pressure bandages designed to control severe bleeding.",
        "Kerlix Antimicrobial Dressings": "Sterile, absorbent dressings with antimicrobial properties.",
        "Occlusive Dressing": "Non-breathable dressing used to seal open wounds.",
        "Polytrauma/Abdominal Dressing": "Large dressings for extensive injuries, including abdominal trauma."
    },

    "Utensils": {
        "Asst. Needle Kit": "A set of needles for various procedures, including injections and IV access.",
        "Bag Valve Mask": "Provides positive pressure ventilation to patients with breathing difficulties.",
        "Cricothyrotomy Kit": "Used to perform an emergency surgical airway incision.",
        "E.D.D (Extremity Displacement Device)": "Stabilizes or realigns dislocated or fractured extremities.",
        "Heated Gigli Saw": "Wire saw used for cutting bone during amputations.",
        "Hemostatic Clamps": "Used to control bleeding by clamping blood vessels.",
        "Intraosseous Vascular Access/Transfusion System": "Delivers fluids/meds into bone marrow when IV access fails.",
        "Nasopharyngeal Airway Kit": "Maintains an open airway via nasal passage in unconscious patients.",
        "Pulse Oximeter": "Measures oxygen saturation and heart rate.",
        "Transfusion/IV Start Kits": "Kits for initiating IV fluids or blood transfusions."
    },

    "Pharmaceuticals": {
        "Augmentin": "Antibiotic used to treat bacterial infections.",
        "Benadryl": "Antihistamine for allergic reactions, including anaphylaxis.",
        "Chlorhexidine Scrub": "Antiseptic solution for skin disinfection before procedures.",
        "Choratazine": "Used for head injuries like concussions.",
        "Epinephrine": "Treats anaphylaxis, cardiac arrest, and asthma.",
        "Hextend": "Plasma expander to treat hypovolemic shock.",
        "Morphine": "Opioid painkiller for severe injuries.",
        "Narcolytic Metabolase": "Neutralizes narcotics and reverses drug effects.",
        "Neuroglasgomycin": "Neuroprotective or pain-relieving drug for brain injuries.",
        "Polymerized Hemoglobin": "Blood substitute used when blood is unavailable.",
        "Polyseudomorphine Autoinjector": "Rapid-acting pain relief, non-addictive synthetic opioid.",
        "Ringer's Lactate Solution": "Rehydrates and restores electrolytes after burns or trauma.",
        "Saline Wound Wash": "Sterile saline for cleaning wounds.",
        "Tranexamic Acid": "Promotes blood clotting and controls severe bleeding."
    },

    "Misc": {
        "Amputation Bags": "Contain and preserve severed limbs for reattachment.",
        "Asst. Biohazard Disposal Packs": "Dispose of medical waste safely.",
        "Asst. Hot / Cold Packs": "For local heat/cold therapy to manage pain or swelling.",
        "Asst. SAM Splints": "Moldable splints to immobilize injured limbs.",
        "Asst. Towels": "Used for hygiene or as sterile barriers.",
        "C-Collar": "Immobilizes the neck/spine after injury.",
        "Cyanoacrylates": "Medical superglue for closing minor wounds.",
        "Duct Tape": "Used for securing dressings, splints, or makeshift fixes.",
        "Exo-Sleeves": "Compression sleeves for muscle support or fracture protection.",
        "Fluorescent Red Marking Tape": "Marks evac points or hazard zones.",
        "Foldable Stretcher Board/Litter": "Portable stretcher for casualty evacuation.",
        "High-Output Battery Operated Torch": "Used for procedures or SAR ops in low light.",
        "Markers": "For writing on patients or labeling supplies.",
        "Medical Tape": "Secures dressings or gear to the body.",
        "Medi-Gel": "Promotes healing and protects wounds.",
        "Medi-Gel Impregnated Bandages": "Infused bandages to accelerate healing.",
        "Nitrile Gloves": "Disposable gloves to maintain hygiene.",
        "Penlight": "Examines pupils or injuries in low light.",
        "Portable Oxygen Bottle": "Used to administer oxygen therapy.",
        "Thermal Blanket": "Retains body heat to prevent hypothermia.",
        "Zip-Stitch Kit": "Non-invasive wound closure alternative to sutures."
    }
};

const pronouns = {
    "male": {
        subject: "he", Subject: "He",
        object: "him", Object: "Him",
        possessive: "his", Possessive: "His",
        reflexive: "himself", Reflexive: "Himself"
    },
    "female": {
        subject: "she", Subject: "She",
        object: "her", Object: "Her",
        possessive: "hers", Possessive: "Hers",
        reflexive: "herself", Reflexive:"Herself"
    },
    "non-binary": {
        subject: "they", Subject: "They",
        object: "them", Object: "Them",
        possessive: "theirs", Possessive: "Theirs",
        reflexive: "themselves", Reflexive: "Themselves"
    }
}

//Injuries!!
const boneInjuries = {
    "bone_frac_close": "Fracture (Close)",
    "bone_frac_open": "Fracture (Open)",
    "bone_comminuted": "Comminuted Fracture",
    "bone_greenstick": "Greenstick Fracture",
    "bone_transverse": "Transverse/Oblique Fracture",
    "bone_impacted": "Impacted Fracture",
    "bone_stress": "Stress Fracture",
    "bone_dislocation": "Dislocated"
}
const shoulderInjuries = {
    "amp_forequarter": "Forequarter Amputation",
    "amp_shoulder": "Shoulder Disarticulation"
}
const upperArmInjuries = {
    "amp_above_elbow": "Above Elbow Amputation",
    "amp_elbow": "Elbow Disarticulation"
}
const lowerArmInjuries = {
    "amp_below_elbow": "Below Elbow Amputation",
    "amp_hand": "Hand Disarticulation"
}
const handInjuries = {
    "amp_transcarpal": "Transcarpal Disarticulation",
    "amp_thumb": "Thumb Amputation",
    "amp_finger_index": "Index Finger Amputation",
    "amp_finger_middle": "Middle Finger Amputation",
    "amp_finger_ring": "Ring Finger Amputation",
    "amp_finger_little": "Little Finger Amputation"
}
const burnInjuries = {
    "burn_1deg": "Burn (1st Degree)",
    "burn_2deg": "Burn (2nd Degree)",
    "burn_3deg": "Burn (3rd Degree)",
    "burn_4deg": "Burn (4th Degree)",
    "burn_chemical": "Chemical Burn"
}
const penetratingTraumaInjuries = {
    "pen_gunshot": "Gunshot Wound (GSW)",
    "pen_spiker": "Spiker Wound",
    "pen_needler": "Needle Wound",
    "pen_carbine": "Covenant Carbine Wound",
    "pen_shrapnel": "Shrapnel Injury"
}
const bluntTraumaInjuries = {
    "blunt_contusion": "Contusion",
    "blunt_crush_injury": "Crush Injury"
}
const bleedingInjuries = {
    "bleed_laceration": "Laceration",
    "bleed_artery": "Severed Artery",
    "bleed_internal": "Internal Haemorrhaging"
}
const headInjuries = {
    "head_concussion": "Concussion",
    "head_edema": "Edema",
    "head_skull_fracture": "Skull Fracture",
    "head_jaw_fracture": "Jaw Fracture",
    "head_jaw_dislocation": "Jaw Dislocation",
    "head_teeth": "Missing Teeth",
    "head_eye": "Eye Injury",
    "head_dumpshock": "Dumpshock"
}
const spinalInjuries = {
    "spinal_lumbar_fracture": "Lumbar Fracture (low)",
    "spinal_thoracic_fracture": "Thoracic Fracture (middle)",
}
const neckInjuries = {
    "spinal_cervical_fracture": "Cervical Fracture (high)"
}
const allInjuries = {
    ...boneInjuries,
    ...shoulderInjuries,
    ...upperArmInjuries,
    ...lowerArmInjuries,
    ...handInjuries,
    ...burnInjuries,
    ...penetratingTraumaInjuries,
    ...bluntTraumaInjuries,
    ...bleedingInjuries,
    ...headInjuries,
    ...spinalInjuries,
    ...neckInjuries
}

// Injury treatments
const injuryTreatments = {
    "bone_frac_close": {
        field: [
            "step one",
            "step two",
            "step three"
        ],
        blueside: [
            "step one",
            "step two",
            "step three",
            "step four"
        ]
    },
    "bone_frac_open": {

    },
    "bone_communited": {

    },
    "bone_greenstick": {

    },
    "bone_transverse": {

    },
    "bone_impacted": {

    },
    "bone_stress": {

    },
    "bone_dislocation": {

    },
    "amp_forequarter": {

    },
    "amp_shoulder": {

    },
    "amp_above_elbow": {

    },
    "amp_elbow": {

    },
    "amp_below_elbow": {

    },
    "amp_hand": {

    },
    "amp_transcarpal": {

    },
    "amp_thumb": {

    },
    "amp_finger_index": {

    },
    "amp_finger_middle": {

    },
    "amp_finger_ring": {

    },
    "amp_finger_little": {

    },
    "burn_1deg": {

    },
    "burn_2deg": {

    },
    "burn_3deg": {

    },
    "burn_4deg": {

    },
    "burn_chemical": {

    },
    "pen_gunshot": {

    },
    "pen_spike": {

    },
    "pen_needler": {

    },
    "pen_carbine": {

    },
    "pen_shrapnel": {

    },
    "blunt_contusion": {

    },
    "blunt_crush_injury": {

    },
    "bleed_laceration": {

    },
    "bleed_artery": {

    },
    "bleed_internal": {

    },
    "head_concussion": {

    },
    "head_edema": {

    },
    "head_skull_fracture": {

    },
    "head_jaw_fracture": {

    },
    "head_jaw_dislocation": {

    },
    "head_teeth": {

    },
    "head_eye": {

    },
    "head_dumpshock": {

    },
    "spinal_lumbar_fracture": {

    },
    "spinal_thoracic_fracture": {

    },
    "spinal_cervical_fracture": {

    }
};

// for (const [key, value] of Object.entries(allInjuries)){
//     console.log(`${key}: ${value}`);
// }

// Body parts used for the injury panel
const bodyParts = [
    {
        value: "head",
        label: "Head",
        injuries: {
            ...headInjuries,
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...burnInjuries

        }
    },
    {
        value: "neck",
        label: "Neck",
        injuries: {
            ...neckInjuries,
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "chest",
        label: "Upper Torso",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "stomach",
        label: "Lower Torso",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "pelvis",
        label: "Pelvis",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "spine",
        label: "Spine",
        injuries: {
            ...spinalInjuries,
            ...bluntTraumaInjuries,
            ...neckInjuries
        }
    },
    
    {
        value: "left_shoulder",
        label: "Left Shoulder",
        injuries: {
            ...shoulderInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_brachium",
        label: "Left Brachium",
        injuries: {
            ...upperArmInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_forearm",
        label: "Left Forearm",
        injuries: {
            ...lowerArmInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_hand",
        label: "Left Hand",
        injuries: {
            ...handInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_thigh",
        label: "Left Thigh",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_calf",
        label: "Left Calf",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "left_foot",
        label: "Left Foot",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_shoulder",
        label: "Right Shoulder",
        injuries: {
            ...shoulderInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_brachium",
        label: "Right Brachium",
        injuries: {
            ...upperArmInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_forearm",
        label: "Right Forearm",
        injuries: {
            ...lowerArmInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_hand",
        label: "Right Hand",
        injuries: {
            ...handInjuries,
            ...bluntTraumaInjuries,
            ...bleedingInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_thigh",
        label: "Right Thigh",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_calf",
        label: "Right Calf",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    },
    {
        value: "right_foot",
        label: "Right Foot",
        injuries: {
            ...bleedingInjuries,
            ...bluntTraumaInjuries,
            ...penetratingTraumaInjuries,
            ...burnInjuries
        }
    }
];

let injuries = {};

document.getElementById("toggleFlyout").addEventListener("click", () => {
    if(flyoutOpen){
        flyoutOpen = false;
        document.getElementById("flyoutPanel").classList.add("close");
        document.getElementById("flyoutPanel").classList.remove("open");
    } else{
        flyoutOpen = true;
        document.getElementById("flyoutPanel").classList.add("open");
    }
});

document.getElementById("closeFlyout").addEventListener("click", () => {
    flyoutOpen = false;
    document.getElementById("flyoutPanel").classList.add("close");
    document.getElementById("flyoutPanel").classList.remove("open");
});

// Enjoy this my Halo Believers, this is for you!
function initialise()
{
    fillFlyoutPanel();
    populateInjuryPanel();
    updateInjuryTypeList();
}

function populateInjuryPanel()
{
    const dropdown = document.getElementById("bodyPart");
    bodyParts.forEach(part => {
        const option = document.createElement("option");
        option.value = part.value;
        option.textContent = part.label;
        dropdown.appendChild(option);
    });

    // const injuryDropdown = document.getElementById("injuryType");
    // allInjuries.forEach(category => {
    //     const injury = document.createElement("option");
    //     injury.value = category.value;
    //     injury.textContent = category.label;
    //     injuryDropdown.appendChild(injury);
    // });
}

function fillFlyoutPanel()
{
    // Let's go ahead and load all of the default medications up!
    Object.entries(equipment).forEach(([category, tool]) => {
        // Create a box around the current genre
        let medEquipment = document.createElement("div");
        medEquipment.classList.add("genre");

        let equipmentTitle = document.createElement("h3");
        equipmentTitle.innerText = category;

        medEquipment.appendChild(equipmentTitle);

        flyoutWindow.appendChild(medEquipment);
        Object.entries(tool).forEach(([toolName, description]) => {
            let wholeTool = document.createElement("div");
            let equipTool = document.createElement("div");
            let equipDesc = document.createElement("p");

            equipTool.innerText = toolName;
            equipTool.classList.add("tool-title");
            equipDesc.innerText = description;
            equipDesc.classList.add("tool-description");

            wholeTool.classList.add("tool-highlight");
            wholeTool.appendChild(equipTool);
            wholeTool.appendChild(equipDesc);

            medEquipment.appendChild(wholeTool);
        })
    });
}

function updateGender(gender, who = "literally anything else")
{
    if(who === "prac"){
        // This is the physician's gender
        pGender = gender.toLowerCase();
    } else {
        // This is the patient's gender
        ptGender = gender.toLowerCase();
    }
    updateEmoteGenerators();
}

function updateEmoteGenerators()
{
    // Shorthand pronoun usage | pg = physician | ptg = patient
    const pg = pronouns[pGender];
    const ptg = pronouns[ptGender];
    
    // The emotes themselves
    fieldEmoteElement.value = `${pName} is proud of ${pg.reflexive}.`;
    blueEmoteElement.value = `${ptName} is proud of ${ptg.reflexive}.`;
}

function updateInjuryTypeList(){
    const selected = bodyParts.find(part => part.value === bodySelector.value);

    // Clear previous options
    injurySelector.innerHTML = "";

    if (selected && selected.injuries) {
        for (const [value, label] of Object.entries(selected.injuries)) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            injurySelector.appendChild(option);
        }
    }
}

document.getElementById("addInjuryBtn").addEventListener("click", () => {
    const bodyPart = document.getElementById("bodyPart").value;
    const injuryTypeSelect = document.getElementById("injuryType");
    const injuryType = injuryTypeSelect.options[injuryTypeSelect.selectedIndex].text;
    const notes = document.getElementById("notes").value;

    // Track the added injury
    injuries[bodyPart] = injuryTypeSelect.value;
    console.log(`Injuries: ${injuries[bodyPart]}`);

    const log = document.createElement("div");
    log.classList.add("injury-log-entry");
    log.innerHTML = `
        <strong>${injuryType.toUpperCase()}</strong> on <em>${bodyPart}</em><br>
        ${notes}
    `;

    document.getElementById("injuryLog").appendChild(log);

    // Clear inputs
    document.getElementById("notes").value = "";

    // Construct the message flows
    constructEmoteFlow();
});

function constructEmoteFlow()
{
    // emote flow here
}

// ######## Below are all the document items that update as the user types into them ######## //

// NAME UPDATES
// Update as the physician's name is typed in
physicianNameInput.addEventListener("input", (event) => {
    pName = event.target.value;
    updateEmoteGenerators();
});
// Update as the patient's name is typed in
patientNameInput.addEventListener("input", (event) => {
    ptName = event.target.value;
    updateEmoteGenerators();
});

// GENDER UPDATES
// Update when the physician's gender is updated
physicianGenderSelector.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    updateGender(selectedValue, "prac");
});
// Update when the patient's gender is updated
patientGenderSelector.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    updateGender(selectedValue);
});

// INJURY UPDATES
bodySelector.addEventListener("change", () => {
    updateInjuryTypeList();
});

// Wait for all the window content to load before initialising
window.addEventListener('DOMContentLoaded', function(event){
    initialise();
});