import smtplib
from email.message import EmailMessage

from app.config import (
    EMAIL_ADDRESS,
    EMAIL_PASSWORD
)


# -------------------------------------------------
# Generic Email Sender
# -------------------------------------------------

def send_email(

    recipient_email: str,

    subject: str,

    body: str

):

    message = EmailMessage()

    message["From"] = EMAIL_ADDRESS

    message["To"] = recipient_email

    message["Subject"] = subject

    message.set_content(body)

    try:

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:

            smtp.starttls()

            smtp.login(

                EMAIL_ADDRESS,

                EMAIL_PASSWORD

            )

            smtp.send_message(message)

        return True

    except Exception as e:

        print(e)

        return False


# -------------------------------------------------
# Invitation Email
# -------------------------------------------------

def send_invitation_email(

    recipient_email: str,

    recipient_name: str,

    invitation_link: str

):

    subject = "FocusGuard AI - Sub Admin Invitation"

    body = f"""
Hello {recipient_name},

You have been invited to join FocusGuard AI as a Sub Admin.

Please click the link below to activate your account:

{invitation_link}

This invitation is valid for 24 hours.

Regards,
FocusGuard AI Team
"""

    return send_email(

        recipient_email,

        subject,

        body

    )