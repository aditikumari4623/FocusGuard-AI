from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import User
from app.schemas import (
    ChangeRole,
    InviteSubAdmin,
    AcceptInvitation
)
from app.role_checker import require_super_admin
from app.security import (
    create_invitation_token,
    verify_invitation_token,
    hash_password
)
from app.email_service import send_invitation_email


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# -------------------------------------------------
# Database Dependency
# -------------------------------------------------

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# -------------------------------------------------
# Admin Dashboard
# -------------------------------------------------

@router.get("/dashboard")
def admin_dashboard(

    current_user=Depends(require_super_admin)

):

    return {

        "message": "Welcome Super Admin",

        "email": current_user.email,

        "role": current_user.role

    }


# -------------------------------------------------
# View All Users
# -------------------------------------------------

@router.get("/all-users")
def get_all_users(

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    users = db.query(User).all()

    return users


# -------------------------------------------------
# Change User Role
# -------------------------------------------------

@router.put("/change-role/{user_id}")
def change_role(

    user_id: int,

    role_data: ChangeRole,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    user.role = role_data.role

    db.commit()

    db.refresh(user)

    return {

        "message": "Role Updated Successfully.",

        "new_role": user.role

    }


# -------------------------------------------------
# Delete User
# -------------------------------------------------

@router.delete("/delete-user/{user_id}")
def delete_user(

    user_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    db.delete(user)

    db.commit()

    return {

        "message": "User Deleted Successfully."

    }


# -------------------------------------------------
# Statistics
# -------------------------------------------------

@router.get("/statistics")
def statistics(

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    total_users = db.query(User).count()

    total_admins = db.query(User).filter(
        User.role == "SUPER_ADMIN"
    ).count()

    total_subadmins = db.query(User).filter(
        User.role == "SUB_ADMIN"
    ).count()

    total_users_only = db.query(User).filter(
        User.role == "USER"
    ).count()

    return {

        "Total Users": total_users,

        "Super Admins": total_admins,

        "Sub Admins": total_subadmins,

        "Users": total_users_only

    }


# -------------------------------------------------
# Invite Sub Admin
# -------------------------------------------------

@router.post("/invite-sub-admin")
def invite_sub_admin(

    invitation: InviteSubAdmin,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    # Check whether email already exists

    existing_user = db.query(User).filter(
        User.email == invitation.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists."
        )

    # Generate Invitation Token

    token = create_invitation_token(

        {

            "email": invitation.email,

            "name": invitation.full_name,

            "role": "SUB_ADMIN"

        }

    )

    # Invitation Link

    invitation_link = (
        f"http://127.0.0.1:8000/admin/accept-invitation?token={token}"
    )

    # Send Email

    success = send_invitation_email(

        invitation.email,

        invitation.full_name,

        invitation_link

    )

    if success:

        return {

            "message": "Invitation Email Sent Successfully."

        }

    raise HTTPException(

        status_code=500,

        detail="Unable to send invitation email."

    )

@router.post("/accept-invitation")
def accept_invitation(

    token: str,

    data: AcceptInvitation,

    db: Session = Depends(get_db)

):

    payload = verify_invitation_token(token)

    if payload is None:

        raise HTTPException(

            status_code=400,

            detail="Invalid or Expired Invitation."

        )

    existing_user = db.query(User).filter(

        User.email == payload["email"]

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="User already exists."

        )

    new_user = User(

        full_name=payload["name"],

        email=payload["email"],

        hashed_password=hash_password(

            data.password

        ),

        role=payload["role"]

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message":"Invitation Accepted Successfully.",

        "role":new_user.role

    }