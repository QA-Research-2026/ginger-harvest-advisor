# Ginger Harvest & Market Dispatch Advisor

An intelligent, AI-driven agricultural decision-support web application tailored for ginger farmers in Sri Lanka (demonstrated for farmer Sunil P.'s 0.5-acre plot). The advisor optimizes harvest timing, commercial market dispatching across Dedicated Economic Centres (Dambulla, Meegoda, Pettah, etc.), and seed rhizome retention based on Hector Kobbekaduwa Agrarian Research and Training Institute (HARTI) market dynamics and Google Gemini AI.

---

## Table of Contents
1. [Software Requirements](#software-requirements)
2. [Installation and Execution Instructions](#installation-and-execution-instructions)
3. [Required API & Configuration Information](#required-api--configuration-information)
4. [Sample Login Details](#sample-login-details)
5. [Known Limitations](#known-limitations)
6. [Security and Confidentiality Notice](#security-and-confidentiality-notice)
7. [System Architecture & Features](#system-architecture--features)

---

## Software Requirements

Ensure your environment satisfies the following requirements before running the application:

* **Node.js**: `v18.18.0` or higher (Recommended: Node.js `v20.x` LTS or `v24.x`)
* **Package Manager**: `npm` (v9+ or v10+), `yarn`, `pnpm`, or `bun`
* **Operating System**: macOS, Linux, or Windows (cross-platform compatible)
* **Web Browser**: Any modern browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge)
* **Git**: Installed for version control and repository cloning

---

## Installation and Execution Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ginger-harvest-advisor
```

### 2. Install Dependencies
Install all required project dependencies using `npm`:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the provided `.env.example` file to create your local `.env.local` file:
```bash
cp .env.example .env.local
```
*(See [Required API & Configuration Information](#required-api--configuration-information) below for details on obtaining an API key.)*

### 4. Run the Development Server
Start the Next.js Turbopack development server:
```bash
npm run dev
```

Once started, open your web browser and navigate to:
```
http://localhost:3000
```

### 5. Production Build & Execution (Optional)
To build and verify the optimized production bundle:
```bash
# Build the production application
npm run build

# Start the production server
npm run start
```

### 6. Linting Verification
To execute code quality and ESLint checks:
```bash
npm run lint
```

---

## Required API & Configuration Information

### Environment Variables
The application integrates with the **Google Gemini API** using the `@google/genai` SDK.

| Variable Name | Required | Default / Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional (Recommended) | Google Gemini API key obtained from [Google AI Studio](https://aistudio.google.com/). |

### Setup Steps
1. Visit [Google AI Studio](https://aistudio.google.com/) and generate an API key.
2. In the project root directory, open or create `.env.local`.
3. Add your key in the following format:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

### Graceful Fallback Mode (Offline & Resilient Execution)
* **Zero Crash Policy**: If `GEMINI_API_KEY` is missing, invalid, expired, or left as the placeholder, the backend API automatically switches to an **Agronomic Rule-Based Fallback Mode**.
* When active, the application calculates seed retention and harvest dispatching using standard Sri Lankan Department of Agriculture constants and static HARTI economic models.
* The frontend alerts the user with an amber banner indicating: *"AI inference service unreachable. Output generated via standard agronomic rules."*

---

## Sample Login Details

* **Authentication Required**: **Not Applicable (N/A)**
* The current release does not enforce an authentication wall, user login, passwords, or session tokens. 
* All dashboard variables, seed rhizome calculators, dispatch recommendations, and market analysis tools are directly accessible immediately upon launching the application at `http://localhost:3000`.

---

## Known Limitations

1. **Static Market Dataset**:
   * Wholesale prices, transport tariffs, and market trends are loaded from curated HARTI baseline records in `data/gingerMarketData.json` rather than live, real-time streaming WebSocket/REST feeds from Dedicated Economic Centres.
2. **Agronomic Scope**:
   * Seed rhizome retention calculations default to standard Sri Lankan local ginger varieties (1,500 kg per acre). Exotic varieties (such as Chinese or Rangoon ginger) or non-standard agro-ecological regions may require adjusted retention ratios.
3. **Manual Weather Risk Selection**:
   * Weather risk (`Dry/Stable`, `Moderate Rain`, `Heavy Monsoon Risk`) is configured manually via the dashboard interface rather than synced with live GPS-based meteorological APIs.
4. **Gemini Free-Tier Rate Limits**:
   * When using a free tier Google AI Studio key, requests are governed by Google's Requests-Per-Minute (RPM) quotas. Rapid repetitive queries may temporarily trigger the fallback mode until the quota resets.
5. **Session Ephemeral Storage**:
   * Inputs and generated harvest strategies are held in React client state for the current session. Multi-farm persistent cloud database storage across agricultural seasons is planned for future versions.

---

## Security and Confidentiality Notice

* **No Secret Credentials**: In accordance with security standards, **no passwords, private API keys, database credentials, or confidential secrets are committed or included in this repository or README**.
* All local secrets must reside strictly in `.env.local`, which is ignored by Git via `.gitignore`.
* An untracked template file (`.env.example`) is provided to guide variable configuration safely.

---

## System Architecture & Features

* **Seed Rhizome Retention Engine**: Calculates mandatory seed stock conservation (1,500 kg/acre) to ensure the farmer preserves planting material for the subsequent cultivation cycle before dispatching commercial yields.
* **Multi-Stage Dispatch Strategy**: Staggers crop harvesting across market windows to protect against wholesale price crashes and monsoonal soil-rot risks.
* **Target Economic Centres**: Identifies distribution avenues across major Sri Lankan agricultural hubs including Dambulla, Meegoda, Pettah, and regional central markets.
* **Next.js App Router Architecture**: Built with React 19, Tailwind CSS, Lucide icons, and Framer Motion for responsive, dark-mode agricultural analytics.
