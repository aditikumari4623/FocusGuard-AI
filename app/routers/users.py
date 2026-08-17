from fastapi import APIRouter, Depends

from app.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_profile(

    current_user=Depends(get_current_user)

):

    return {

        "id": current_user.id,

        "full_name": current_user.full_name,

        "email": current_user.email,

        "age": current_user.age,

        "occupation": current_user.occupation,

        "role": current_user.role

    }