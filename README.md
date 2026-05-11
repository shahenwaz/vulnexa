# Vulnexa

![Status](https://img.shields.io/badge/status-final%20submission-2563eb)
![Frontend](https://img.shields.io/badge/frontend-Next.js-111827)
![Backend](https://img.shields.io/badge/backend-FastAPI-059669)
![License](https://img.shields.io/badge/license-MIT-f59e0b)

Vulnexa is an open-source smart vulnerability assessment and business risk reporting tool for web applications. It helps users scan codebases, review security findings, understand severity levels, and generate reports that explain both technical issues and business-level impact.

This project was developed as a final-year university major project with a focus on practical security workflows, clean product design, understandable remediation guidance, and management-friendly reporting.

## Features

- Modern dashboard for recent scans and quick actions
- Scan support for:
  - local project directories
  - public GitHub repositories
  - uploaded ZIP archives
- Saved scan results with backend-driven history
- Scan details view with grouped findings and metadata
- Report page with:
  - executive summary
  - business-level risk translation
  - severity breakdown
  - grouped findings
  - remediation guidance per finding
- Business report profile selection for:
  - Standard company
  - Finance company
- CWE enrichment for findings using MITRE lookup data
- Improved rule-based detection to reduce simple false positives
- Stable project keys for repeated scan tracking
- Run numbering for repeated scans in dashboard history
- Friendly validation and backend-unavailable states
- Responsive UI for desktop and mobile use

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend

- Python
- FastAPI

## Security Data Sources

- CWE
- CVSS-style severity presentation

## Project Structure

```text
vulnexa/
├── frontend/   # Next.js application
└── backend/    # FastAPI backend and scan pipeline
```

## Current Status

Vulnexa is ready for final project submission.

The project includes a connected frontend and backend flow for creating scans, saving results, loading recent history, viewing scan details, and generating security reports. The final version also includes business-level reporting, where technical findings are translated into management-friendly impact explanations.

AI-assisted reporting was considered during the project but left as future work to keep the final implementation stable, reproducible, and easier to evaluate.

## Requirements

Before running the project, make sure you have:

### Frontend

- Node.js 20 or newer
- npm

### Backend

- Python 3.11 or newer
- pip

## How to Run the Project Locally

Run the backend and frontend in **separate terminals**.

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd vulnexa
```

### 2) Start the backend

Open a terminal in the backend folder:

```bash
cd backend
```

Create and activate a virtual environment.

#### Windows PowerShell

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

#### Windows CMD

```cmd
python -m venv .venv
.venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the backend dependencies:

```bash
pip install fastapi uvicorn requests python-multipart
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend should run on:

```text
http://127.0.0.1:8000
```

### 3) Start the frontend

Open a second terminal in the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a local environment file if it does not already exist:

```bash
echo NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000 > .env.local
```

On Windows PowerShell, if the command above does not work, create `.env.local` manually and add:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

Then start the frontend:

```bash
npm run dev
```

Frontend should run on:

```text
http://localhost:3000
```

### 4) Open the app

Open the frontend in your browser:

```text
http://localhost:3000
```

From there, you can start a scan using:

- a public GitHub repository URL
- a local folder path
- a ZIP file upload

## Running a Business Report Test

A simple test sample can be placed in:

```text
test-samples/business-report-scan-sample/security-test-sample.ts
```

Example test content:

```ts
const PASSWORD_LABEL = "Password";
const adminPassword = process.env.ADMIN_PASSWORD;
const password = "admin12345";
const query = "SELECT * FROM users";
```

Expected behaviour:

- `PASSWORD_LABEL` should not be detected
- `process.env.ADMIN_PASSWORD` should not be detected as a hardcoded secret
- `password = "admin12345"` should be detected as a critical hardcoded secret
- `SELECT * FROM users` should be detected as a high severity SQL query pattern

Run the same scan once with **Standard company** and once with **Finance company**. The technical findings should remain the same, but the business-level report wording should change based on the selected profile.

## Important Notes for Running Scans

### Local folder scans

When using **Local folder** scan mode, the folder path must exist on the **machine running the Python backend**.

Example:

```text
C:\Users\YourName\Projects\demo-app
```

This means:

- if the backend is running on your computer, use a path from your computer
- if the backend is running somewhere else, the path must exist there instead

### ZIP upload scans

ZIP upload works through the frontend and sends the archive to the backend for extraction and scanning.

### GitHub repository scans

Repository scan mode expects a **public GitHub repository URL**.

Example:

```text
https://github.com/owner/repository
```

## Quick Troubleshooting

### The dashboard or scan pages say the backend is unavailable

Check these first:

- make sure the backend terminal is still running
- make sure the backend is running on `http://127.0.0.1:8000`
- make sure `NEXT_PUBLIC_BACKEND_URL` in `frontend/.env.local` points to the correct backend URL
- restart the frontend after changing environment variables

### ZIP upload is failing

Check these:

- upload a real `.zip` file
- avoid very large ZIP files
- make sure the ZIP does not contain unsafe paths
- confirm `python-multipart` is installed in the backend environment

### Local folder scan fails

Check these:

- the path is correct
- the path exists on the machine running the backend
- the backend process has permission to read the folder

### Frontend starts but API calls fail

Usually this means one of these:

- backend is not running
- wrong backend URL in `.env.local`
- CORS or dependency issue from an incomplete backend setup

### Next.js Turbopack root warning

If Next.js detects multiple lockfiles, make sure the frontend is being run from:

```text
vulnexa/frontend
```

If needed, set the Turbopack root in `frontend/next.config.ts` so the frontend resolves dependencies from the correct folder.

## Suggested Development Workflow

1. start the backend first
2. start the frontend second
3. test from the browser at `http://localhost:3000`
4. if something fails, check the backend terminal first because most scan errors appear there

## Goals

- Build a professional security project with real-world value
- Make security findings easier to understand and review
- Translate technical issues into business-level impact
- Present risks and remediation in a cleaner, more useful way
- Create a strong final-year project and portfolio piece
- Keep the platform practical for students, developers, and small teams

## Future Work

- Expand vulnerability detection coverage
- Add comparison between previous and latest scans
- Improve tracking of fixed, reduced, and unchanged findings
- Add more business report profiles
- Improve report export and sharing flow
- Explore optional AI-assisted security insights
- Explore optional local LLM support for privacy-focused analysis

## License

This project is licensed under the MIT License.

## Authors

Developed by [Shahenwaz Muzahid](https://github.com/shahenwaz) and team as part of a university final-year project.
