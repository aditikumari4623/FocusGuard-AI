from fastapi import FastAPI

from app.database import Base, engine
from app.routers import auth
from app.routers import users
from app.routers import admin
from app.routers import activity
from app.email_service import send_email
from app.routers import analytics
from app.routers import organization
from app.routers import ai
from app.routers import notifications
from app.routers import planner
from fastapi.middleware.cors import CORSMiddleware
from app.routers import translation


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FocusGuard AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(admin.router)
app.include_router(activity.router)
app.include_router(analytics.router)
app.include_router(
    organization.router
)
app.include_router(ai.router)
app.include_router(notifications.router)
app.include_router(planner.router)
app.include_router(translation.router)



@app.get("/")
def home():
    return {
        "message": "Welcome to FocusGuard AI Backend"
    }


@app.get("/send-test-email")
def send_test_email():

    success = send_email(

        recipient_email="kumariaditi0406@gmail.com",

        subject="FocusGuard AI Test",

        body="""
Congratulations!

Your email service is working successfully.

Regards,
FocusGuard AI
"""

    )

    if success:

        return {

            "message":"Email Sent Successfully"

        }

    return {

        "message":"Email Failed"

    }