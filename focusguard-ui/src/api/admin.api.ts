import api from "./axios";


/* ====================================
   Invite Sub Admin
==================================== */

export interface InviteSubAdminRequest {

  full_name: string;

  email: string;

  organization_id: number;
}


export interface InviteResponse {

  message?: string;

  detail?: string;

}


export const inviteSubAdmin = async (

  data: InviteSubAdminRequest

): Promise<InviteResponse> => {

  const response = await api.post(

    "/admin/invite-sub-admin",

    data

  );

  return response.data;

};


/* ====================================
   All Users
==================================== */

export interface UserResponse {

  id: number;

  full_name: string;

  email: string;

  role:
    | "SUPER_ADMIN"
    | "SUB_ADMIN"
    | "USER";

  age: number | null;

  occupation: string | null;

  organization_id: number | null;

  is_active: boolean;

  created_at: string;

}


export const getAllUsers = async ():

  Promise<UserResponse[]> => {

  const response = await api.get(
    "/admin/all-users"
  );

  return response.data;

};