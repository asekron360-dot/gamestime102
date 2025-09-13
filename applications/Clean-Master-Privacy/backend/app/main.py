# backend/app/main.py
import os, tempfile, json, asyncio
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import router as auth_router, verify_api_key
from rclone_wrapper import Rclone
from utils.av import scan_file
from utils.crypto import encrypt_file
import asyncpg

app = FastAPI(title="Clean Master Privacy API")

# ---------- CORS ----------
origins = [
    "https://yourusername.github.io",          # GitHub Pages URL
    "https://clean-master-privacy.vercel.app" # fallback
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Routers ----------
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# ---------- DB ----------
DATABASE_URL = os.getenv("DATABA
