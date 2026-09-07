# CloseBY — Empathetic Family Eldercare Hub

> **Detect → De-escalate → Connect**

[![Live Website](https://img.shields.io/badge/Live%20Website-CloseBY-0b5cab?style=for-the-badge)](https://closeby-website.vercel.app/)
[![Smart India Hackathon](https://img.shields.io/badge/SIH-2026-orange?style=for-the-badge)](https://www.sih.gov.in/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

CloseBY is a student innovation project focused on improving emergency support for elderly people, especially people living with dementia.

The proposed system combines wearable sensing, familiar family-voice guidance, location awareness and automatic caregiver communication in one safety-oriented neckband concept.

## 🌐 Project Resources

### Live Caregiver Platform
**https://closeby-website.vercel.app/**

The web platform demonstrates the proposed caregiver experience, including:

- Caregiver dashboard
- Fall-event simulation
- Band-removal simulation
- Live location / geofence interface
- Familial voice library
- Timers and reminders
- Emergency alert log
- Vitals analytics
- Caregiver circle
- Simulated incoming emergency call with two-way communication flow

> **Prototype note:** The website is a demonstration interface. Hardware integration and real-time validation are planned as part of the physical prototype development.

---

## 💡 Why CloseBY?

Conventional safety wearables generally focus on **detecting an event and notifying a caregiver**.

CloseBY adds an **immediate response layer** between detection and caregiver assistance:

**Event Detection → Familiar Family Voice → Automatic Caregiver Connection**

For example, after a detected fall, a locally stored family recording can provide a calm instruction such as:

> “Dad, please stay still. Help is on the way.”

The goal is not to replace the caregiver. It is to provide immediate, familiar guidance while the caregiver connection is being established.

---

## ✨ Core Innovation

### 1. Familiar Family-Voice De-escalation
Instead of relying only on a harsh alarm or synthetic notification, CloseBY proposes locally stored recordings from a familiar family member.

### 2. Local-First Emergency Response
Safety-critical voice prompts are intended to play from local storage, reducing dependence on cloud connectivity for the immediate audio response.

### 3. Sensor-Fusion Based Event Detection
Multiple signals can be combined to improve event classification rather than depending on a single sensor.

### 4. Automatic Caregiver Connection
After an emergency event is confirmed, the proposed system initiates an automatic cellular call so that the caregiver can answer and establish two-way voice communication.

### 5. Wearable Safety + Caregiver Platform
The neckband concept and caregiver website are designed as one connected system rather than isolated hardware and software components.

---

# 🧠 System Architecture

CloseBY follows four functional layers:

```text
┌─────────────────────────────────────────────────────────────┐
│                         SENSE                               │
│  MPU6050  •  BMP280  •  MAX30102  •  Clasp/Proximity       │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                         THINK                               │
│              ESP32-S3 • Sensor Fusion • Event Logic        │
│       HR Processing • Voice Control • Power Management      │
│                    Local SPI Flash Storage                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
┌──────────────────────────┐  ┌───────────────────────────────┐
│        RESPOND           │  │            CONNECT            │
│ MAX98357A → Speaker      │  │ A7670C → Cellular / Location │
│ Familiar Family Voice    │  │ INMP441 → User Voice Input   │
│ Local Playback           │  │ Caregiver Phone              │
└──────────────────────────┘  └───────────────────────────────┘
```

### Emergency Flow

```text
Fall / Emergency Event
        ↓
Sensor Detection
        ↓
ESP32-S3 Event Confirmation
        ↓
Familiar Family Voice Plays Locally
        ↓
Automatic Emergency Cellular Call
        ↓
Caregiver Answers
        ↓
Two-Way Voice Communication
        ↓
Caregiver Dashboard / Location Awareness
```

---

# 🔧 Proposed Hardware

| Component | Purpose |
|---|---|
| **Seeed Studio XIAO ESP32-S3** | Main controller, edge processing and audio/control logic |
| **MPU6050** | 3-axis acceleration + gyroscope sensing |
| **BMP280** | Barometric pressure / vertical movement support |
| **MAX30102** | Heart-rate / optical PPG monitoring |
| **A7670C** | 4G cellular communication; location capability depends on module variant |
| **INMP441** | Microphone input for two-way call audio |
| **MAX98357A** | I²S audio amplifier |
| **Speaker** | Family voice prompts and call audio |
| **SPI Flash** | Local storage for critical voice recordings |
| **3.7 V 1200 mAh Li-Po** | Prototype power source |

### Prototype BOM

| Item | Estimated Cost |
|---|---:|
| XIAO ESP32-S3 | ₹450 |
| MPU6050 + BMP280 | ₹250 |
| MAX98357A + Speaker | ₹300 |
| A7670C 4G / GPS | ₹1,200 |
| 3.7 V 1200 mAh Li-Po + TP4056 | ₹300 |
| INMP441 | ₹90 |
| MAX30102 | ₹150 |
| **Approx. prototype BOM** | **₹2,740** |

> **Important:** ₹2,740 is a prototype BOM estimate, not a final manufacturing or retail cost.

---

# 🔋 Prototype Power Target

**Battery:** 3.7 V, 1200 mAh Li-Po

**Target runtime:** 2–3 days*

\*Runtime is a design target and must be validated during physical prototype testing. Actual runtime will depend strongly on cellular transmission, call duration, audio playback, sensor sampling and power-management implementation.

---

# 🖥️ Caregiver Platform

The web application is designed as the caregiver-facing control and monitoring interface.

### Main Demonstration Modules

- **Dashboard** — device connection and system status
- **Fall Simulation** — demonstrates the emergency workflow
- **Band Removal Simulation** — demonstrates wear-state events
- **Live Location & Geofence** — location-awareness interface
- **Familial Voice Library** — personalized voice prompt management
- **Timers & Reminders** — scheduled personalized guidance
- **Emergency Alert Log** — event history
- **Vitals Analytics** — visualization of available sensor data
- **Caregiver Circle** — caregiver coordination concept
- **Emergency Call Interface** — simulated incoming automatic emergency call

---

# 🧪 Prototype Status

### Current
**Prototype-ready design + caregiver software demonstration**

### Planned during hackathon
1. Hardware assembly
2. Sensor integration
3. ESP32-S3 firmware integration
4. Local voice playback
5. Cellular communication integration
6. Fall-event testing
7. Band-removal testing
8. End-to-end caregiver communication testing
9. Battery/runtime validation

> The physical hardware should not be considered validated until these tests are completed.

---

# 📚 Research Basis

CloseBY is informed by research covering falls, wearable adherence, dementia-related digital technologies and personalized interventions.

### Selected References

- **WHO — Falls**
  https://www.who.int/news-room/fact-sheets/detail/falls

- **Peterson et al. (2025) — Enhancing Enrollment and Adherence in Long-Term Wearable Research on Dementia**
  DOI: `10.2196/63768`
  https://pubmed.ncbi.nlm.nih.gov/40743521/

- **Marques & Moreno (2023) — Online Fall Detection Using Wrist Devices**
  DOI: `10.3390/s23031146`
  https://pmc.ncbi.nlm.nih.gov/articles/PMC9920426/

- **Abraha et al. (2020) — Simulated Presence Therapy for Dementia**
  DOI: `10.1002/14651858.CD011882.pub3`
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7170711/

- **Davison et al. (2016) — Personalized Multimedia for Dementia**
  DOI: `10.1016/j.gerinurse.2015.08.013`
  https://pubmed.ncbi.nlm.nih.gov/26412509/

- **Eost-Telling et al. (2024) — Digital Technologies for Falls in Dementia/MCI**
  DOI: `10.1093/ageing/afad238`
  https://pubmed.ncbi.nlm.nih.gov/38219225/

### Research Gap

From the studies reviewed, CloseBY identifies a practical gap between:

**Detecting an emergency**  
and  
**providing immediate, reassuring assistance while connecting the caregiver.**

CloseBY proposes:

**Fall Detection → Familiar Family Voice → Automatic Caregiver Connection**

> Prototype-stage, research-informed solution requiring real-world validation.

---

# 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Proposed Embedded System
- ESP32-S3
- MPU6050
- BMP280
- MAX30102
- A7670C
- INMP441
- MAX98357A
- Local SPI Flash

### Deployment
- Vercel

---

# 📁 Repository Structure

```text
closeby-website/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# 🚀 Run Locally

### Requirements

- Node.js
- npm

### Installation

```bash
git clone https://github.com/mg626604/closeby-website.git
cd closeby-website
npm install
npm run dev
```

The development server will provide a local URL in the terminal.

---

# 🌍 Deployment

The caregiver platform is deployed using Vercel.

**Live:**  
https://closeby-website.vercel.app/

---

# 👥 Intended Users

- Elderly people living independently
- People living with dementia or cognitive impairment
- Family caregivers
- Care homes and assisted-living environments
- Caregiver networks

---

# 🔮 Future Development

- Physical neckband enclosure
- Custom PCB
- Improved sensor-fusion algorithms
- Real-world fall-event validation
- Better false-positive handling
- Low-power cellular operation
- More flexible caregiver management
- Secure cloud synchronization
- Expanded personalized voice library
- Accessibility-focused caregiver interface
- Larger-scale usability and adherence studies

---

# ⚠️ Limitations & Responsible Use

CloseBY is a **student prototype and research-informed concept**.

It is not currently presented as a clinically validated medical device.

The project does not claim:

- clinical diagnostic accuracy
- guaranteed emergency response
- guaranteed fall detection in every situation
- guaranteed battery runtime
- proven reduction in injuries or hospitalizations
- proven therapeutic effects of familiar voice prompts

Real-world testing with appropriate safety, privacy and ethical controls is required before clinical or commercial deployment.

---

# 🏆 Smart India Hackathon

**Project:** CloseBY  
**Theme:** MedTech / BioTech / HealthTech  
**Category:** Hardware  
**Team:** CloseBY  
**Institution:** TKM College of Engineering, Kerala

---

# 🔗 Links

🌐 **Live Website**  
https://closeby-website.vercel.app/

💻 **GitHub Repository**  
https://github.com/mg626604/closeby-website

---

## ❤️ CloseBY

> **Empathetic Eldercare: Familiar Voice • Calm Guidance • Real-Time Safety Support**

**Detect → De-escalate → Connect**
