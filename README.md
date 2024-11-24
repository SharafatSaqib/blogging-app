# Blogging App

A full-stack blogging application with a Next.js frontend and Express.js backend.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogging-app.git
2.  Navigate into the project directory:
cd blogging-app
3. Install the dependencies for both frontend and backend:
Frontend:
cd frontend
npm install
Backend:
cd backend
npm install
Running Locally
In the frontend directory, 
start the Next.js application:
npm run dev
In the backend directory, start the Express.js API:
npm run dev

Here is the structure for your README file:

markdown
Copy code
# Blogging App

A full-stack blogging application with a Next.js frontend and Express.js backend.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogging-app.git
Navigate into the project directory:

bash
Copy code
cd blogging-app
Install the dependencies for both frontend and backend:

Frontend:
bash
Copy code
cd frontend
npm install
Backend:
bash
Copy code
cd backend
npm install
Running Locally
In the frontend directory, start the Next.js application:

bash
Copy code
npm run dev
The frontend will be available at http://localhost:3000.

In the backend directory, start the Express.js API:

bash
Copy code
npm run dev
The backend will be available at http://localhost:5000.

The frontend and backend will be running locally for development purposes.

Environment Variables
Backend (backend/.env)
Create a .env file in the backend directory with the following variables:
PORT=your port
MONGO_URI= your db 
JWT_SECRET=your secret

Frontend (frontend/.env.local)
Create a .env.local file in the frontend directory with the following variables:

env
NEXT_PUBLIC_API_BASE_URL=Your base url
NEXT_PUBLIC_API_URL=your api url
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

