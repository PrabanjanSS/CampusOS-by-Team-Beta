import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types";

export const authService = {
  async login(
    payload: LoginPayload
  ): Promise<AuthSession> {

    const credential =
      await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

    const firebaseUser =
      credential.user;

    const token =
      await firebaseUser.getIdToken();

    const user: User = {
      id: firebaseUser.uid,

      name:
        firebaseUser.displayName ??
        "Campus User",

      email:
        firebaseUser.email ?? "",

      role:
        payload.role,

      department: "",

      year: "",
    };

    return {
      token,
      user,
    };
  },

  async register(
    payload: RegisterPayload
  ): Promise<AuthSession> {

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

    await updateProfile(
      credential.user,
      {
        displayName:
          payload.name,
      }
    );

    const token =
      await credential.user.getIdToken();

    const user: User = {
      id:
        credential.user.uid,

      name:
        payload.name,

      email:
        payload.email,

      role:
        payload.role,

      department:
        payload.department,

      year:
        payload.year,
    };

    return {
      token,
      user,
    };
  },

  async googleLogin(
    firebaseUser: any
  ): Promise<AuthSession> {

    const token =
      await firebaseUser.getIdToken();

    const user: User = {
      id:
        firebaseUser.uid,

      name:
        firebaseUser.displayName ??
        "Google User",

      email:
        firebaseUser.email ?? "",

      role:
        "member",

      department: "",

      year: "",
    };

    return {
      token,
      user,
    };
  },

  async getProfile() {
    throw new Error(
      "Profile endpoint not connected."
    );
  },

  async getDashboard() {
    throw new Error(
      "Dashboard endpoint not connected."
    );
  },
};

export default authService;

