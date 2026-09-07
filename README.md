# CloseBY — Empathetic Family Eldercare Hub

> **Detect → De-escalate → Connect**

CloseBY is a student innovation project focused on improving emergency support for elderly people, especially people living with dementia.

The proposed system combines wearable sensing, familiar family-voice guidance, location awareness and automatic caregiver communication in one safety-oriented neckband concept.

---

## 🌐 Live Website

**CloseBY Caregiver Platform**

https://closeby-website.vercel.app/

---

## 💡 Why CloseBY?

Conventional safety wearables generally focus on detecting an event and notifying a caregiver.

CloseBY adds an **immediate response layer** between detection and caregiver assistance:

**Event Detection → Familiar Family Voice → Automatic Caregiver Connection**

For example, after a detected fall, a locally stored family recording can provide a calm instruction such as:

> "Dad, please stay still. Help is on the way."

At the same time, the system is designed to initiate an emergency cellular call so that a caregiver can respond.

The familiar-voice approach is a research-informed design concept and requires real-world validation before it can be considered clinically established.

---

# 🎯 Project Objectives

- Detect possible falls and abnormal movement.
- Detect possible neckband removal.
- Provide familiar and personalized voice guidance.
- Share location information with caregivers.
- Initiate an automatic emergency caregiver connection.
- Support two-way voice communication.
- Monitor heart rate as a prototype feature.
- Provide reminders and personalized family voice messages.
- Give caregivers a simple web-based monitoring interface.
- Keep safety-critical voice playback local so it does not depend on cloud connectivity.

---

# 🧠 Core Innovation

### Most conventional approach

**Detect → Alert Caregiver**

### CloseBY approach

**Detect → De-escalate → Connect**

The key idea is to combine **technical detection** with an **empathetic human-centered response**.

CloseBY does not attempt to replace caregivers. It is designed to help bridge the time between an emergency event and human assistance.

---

# ⚙️ System Architecture

The proposed system is organized into four stages:

## 1. SENSE

The wearable collects information from multiple sensors.

| Component | Purpose |
|---|---|
| **MPU6050** | 3-axis acceleration and gyroscope data for motion/fall detection |
| **BMP280** | Barometric pressure and vertical movement support |
| **MAX30102** | Heart-rate monitoring |
| **Clasp + Body-Proximity Sensing** | Neckband removal detection |

Multiple sensor inputs are intended to reduce dependence on a single sensor reading.

## 2. THINK

The **ESP32-S3** acts as the main controller.

It is responsible for:

- Sensor data collection
- Sensor fusion
- Event classification
- Fall-event processing
- Heart-rate data processing
- Wear/removal detection
- Reminder scheduling
- Voice-prompt control
- Audio and communication control
- Power management
- Local voice storage management

Critical voice prompts are intended to be stored locally so that emergency voice playback does not depend on an internet connection.

## 3. RESPOND

The response system provides personalized audio guidance.

### Audio path

**SPI Flash → ESP32-S3 → I²S → MAX98357A → Speaker**

The speaker can provide a pre-recorded familiar family message.

Example:

> "Dad, please stay still. Help is on the way."

The goal is to provide immediate, familiar guidance while the caregiver connection is being established.

## 4. CONNECT

The communication layer is designed around cellular connectivity.

### Proposed flow

**Emergency Event → A7670C → Automatic Call → Caregiver**

Once the caregiver answers, the system is designed to support two-way voice communication.

The **INMP441 microphone** is intended for capturing the user's voice during the two-way call.

Location availability depends on the selected cellular/GNSS hardware variant and network conditions.

---

# 🚨 Emergency Event Flow

```text
        FALL / ABNORMAL EVENT
                 │
                 ▼
       MPU6050 + BMP280
                 │
                 ▼
            ESP32-S3
       Event Classification
                 │
        ┌────────┴────────┐
        ▼                 ▼
 Familiar Voice      Emergency Call
   Playback              │
        │                ▼
        │          Caregiver Phone
        │                │
        └────────► Two-Way Voice
```

The intended sequence is:

1. Sensors detect an abnormal event.
2. ESP32-S3 processes the sensor information.
3. A familiar family voice is played locally.
4. The cellular module initiates an emergency call.
5. The caregiver receives the call.
6. After the caregiver answers, two-way communication can be established.

---

# 📡 Caregiver Website

The current CloseBY website demonstrates the proposed caregiver-side platform.

### Dashboard

The interface includes:

- Device connection status
- Battery status
- 4G connectivity status
- Emergency event controls
- Fall simulation
- Band-removal simulation

### Location & Geofence

The interface provides a proposed caregiver view for:

- Current location
- Safe-zone monitoring
- Geofence status
- Location-related alerts

### Familial Voice Library

Caregivers can manage personalized family voice messages intended for situations such as:

- Emergency guidance
- Reassurance
- Band-removal events
- Daily reminders

### Timers & Reminders

The platform includes a concept for scheduled personalized voice reminders.

### Emergency Alert Log

Caregivers can review simulated/recorded safety events through the dashboard.

### Vitals Analytics

The interface provides a heart-rate monitoring view corresponding to the proposed MAX30102-based sensing feature.

### Caregiver Circle

The platform includes a concept for managing multiple caregivers around the elderly user.

---

# 🖥️ Website Demonstration Features

The current website includes simulated interactions for demonstrating the proposed system.

Examples include:

- **Simulate Fall**
- **Simulate Band Removal**
- Emergency call interface
- Location interface
- Familial voice library
- Reminder controls
- Vitals interface
- Caregiver dashboard

These website simulations represent the proposed system workflow and should not be interpreted as proof of physical hardware performance.

---

# 🔧 Proposed Hardware

| Hardware | Function |
|---|---|
| **Seeed Studio XIAO ESP32-S3** | Main controller |
| **MPU6050** | Accelerometer + gyroscope |
| **BMP280** | Barometric pressure sensing |
| **MAX30102** | Heart-rate sensing |
| **A7670C** | Cellular communication |
| **INMP441** | Voice input for two-way communication |
| **MAX98357A** | Digital audio amplifier |
| **Speaker** | Family voice and call audio |
| **SPI Flash** | Local storage for critical voice clips |
| **3.7 V 1200 mAh Li-Po** | Prototype power source |

---

# 🔋 Prototype Power Target

**Battery:** 3.7 V, 1200 mAh Li-Po

**Target runtime:** 2–3 days*

*Runtime is a design target and requires validation through physical prototype testing.*

Cellular communication can have significant power demands, so final runtime will depend on call frequency, network conditions, sensor sampling and power-management implementation.

---

# 💰 Prototype Bill of Materials

| Component Group | Approx. Cost |
|---|---:|
| XIAO ESP32-S3 | ₹450 |
| MPU6050 + BMP280 | ₹250 |
| MAX98357A + Speakers | ₹300 |
| A7670C 4G / Location Module | ₹1,200 |
| 3.7 V 1200 mAh Li-Po + TP4056 | ₹300 |
| INMP441 | ₹90 |
| MAX30102 | ₹150 |
| **Approximate Prototype BOM** | **₹2,740** |

> The above is a prototype BOM estimate, not a final manufacturing or retail cost.

---

# 🏗️ Prototype Status

### Current Status

**Prototype-ready design**

The current website demonstrates the proposed caregiver platform and system interactions.

### Planned Development

The physical prototype development includes:

1. Sensor integration
2. ESP32-S3 firmware development
3. Local voice playback
4. Cellular call integration
5. Two-way audio integration
6. Location integration
7. Power-management testing
8. Neckband enclosure development
9. Fall-event testing
10. Real-world usability validation

The physical prototype performance will need to be measured and validated before making accuracy, reliability or clinical claims.

---

# 🔬 Research Basis

CloseBY was developed after reviewing research related to:

- Falls among older adults
- Wearable acceptance in dementia
- Wrist-based fall detection
- Digital technologies for fall prevention
- Personalized dementia-care interventions
- Familiar and simulated-presence approaches

### Selected References

1. **World Health Organization — Falls**  
   https://www.who.int/news-room/fact-sheets/detail/falls

2. **Peterson et al. (2025) — Wearable Adherence in Dementia**  
   DOI: `10.2196/63768`  
   https://pubmed.ncbi.nlm.nih.gov/40743521/

3. **Marques & Moreno (2023) — Online Fall Detection Using Wrist Devices**  
   DOI: `10.3390/s23031146`  
   https://pmc.ncbi.nlm.nih.gov/articles/PMC9920426/

4. **Abraha et al. (2020) — Simulated Presence Therapy for Dementia**  
   DOI: `10.1002/14651858.CD011882.pub3`  
   https://pmc.ncbi.nlm.nih.gov/articles/PMC7170711/

5. **Davison et al. (2016) — Personalized Multimedia for Dementia**  
   DOI: `10.1016/j.gerinurse.2015.08.013`  
   https://pubmed.ncbi.nlm.nih.gov/26412509/

6. **Eost-Telling et al. (2024) — Digital Technologies to Prevent Falls in Dementia/MCI**  
   DOI: `10.1093/ageing/afad238`  
   https://pubmed.ncbi.nlm.nih.gov/38219225/

---

# 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Deployment

- Vercel

### Proposed Embedded System

- ESP32-S3
- C/C++ firmware
- I²C sensor communication
- SPI Flash
- I²S digital audio
- Cellular communication

---

# 🚀 Running the Website Locally

### 1. Clone the repository

```bash
git clone https://github.com/mg626604/closeby-website.git
```

### 2. Enter the project folder

```bash
cd closeby-website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The local development URL will normally be displayed in the terminal.

---

# 🌍 Deployment

The website is deployed using Vercel.

**Live deployment:**

https://closeby-website.vercel.app/

---

# 👥 Intended Users

CloseBY is designed around the needs of:

- Elderly people
- People living with dementia
- Family caregivers
- Professional caregivers
- Care homes and assisted-living environments

The project is currently at the prototype stage and is not intended to replace professional medical care.

---

# 🌱 Future Development

Possible future improvements include:

- More robust fall-event classification
- Larger real-world activity datasets
- Improved false-alarm reduction
- Custom low-power PCB
- Smaller neckband enclosure
- Improved battery optimization
- More flexible voice personalization
- Multi-caregiver notification
- Improved location reliability
- Secure cloud synchronization
- User testing with appropriate ethical approval
- Long-term usability and acceptance studies

---

# ⚠️ Limitations

CloseBY is currently a student prototype-stage project.

The following require further testing and validation:

- Fall-detection accuracy
- False-positive and false-negative rates
- Battery runtime
- Cellular call reliability
- Location accuracy
- Two-way audio quality
- Wearability and comfort
- User acceptance
- Familiar-voice effectiveness
- Long-term reliability

CloseBY should not be considered a clinically validated medical device based on the current prototype.

---

# 🏆 Smart India Hackathon

**Project Name:** CloseBY  
**Theme:** MedTech / BioTech / HealthTech  
**Category:** Hardware  
**Institution:** TKM College of Engineering  
**Concept:** Empathetic Safety Neckband with Local Familial Voice De-Escalation

### Core Message

> **CloseBY doesn't just detect an emergency — it responds with familiarity and connects the caregiver.**

**Detect → De-escalate → Connect**

---

# 🔗 Project Links

### Live Website
https://closeby-website.vercel.app/

### GitHub Repository
https://github.com/mg626604/closeby-website

---

## 📌 Disclaimer

CloseBY is a student innovation and prototype-stage project developed for the Smart India Hackathon.

The system concepts, simulations and proposed hardware architecture require physical testing and validation. No claims of clinical accuracy, medical diagnosis, treatment effectiveness or guaranteed emergency response are made.
