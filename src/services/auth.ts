import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { api } from './api';
import type { LoginPayload, RegisterPayload, AuthSession } from '../types';

export const authService = {
  
  async register(payload: RegisterPayload): Promise<AuthSession> {
    // 1. Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const firebaseUser =
      userCredential.user;

    const token =
      await firebaseUser.getIdToken();

    // Auto-detect role from stored mapping or use provided role as fallback
    const roleMap = JSON.parse(localStorage.getItem('campusos_role_map') || '{}');
    const detectedRole = roleMap[payload.email.toLowerCase()] || payload.role;

    const user: User = {
      id: firebaseUser.uid,

      name:
        firebaseUser.displayName ??
        "Campus User",

      email:
        firebaseUser.email ?? "",

      role: detectedRole,

      club: "",

      year: "",
    };

    return {
      token,
      user,
    };
  },

  async login(payload: LoginPayload): Promise<AuthSession> {
    // 1. Verify credentials with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    await updateProfile(
      userCredential.user,
      {
        displayName:
          payload.name,
      }
    );

    // Store role mapping for auto-detection during login
    const roleMap = JSON.parse(localStorage.getItem('campusos_role_map') || '{}');
    roleMap[payload.email.toLowerCase()] = payload.role;
    localStorage.setItem('campusos_role_map', JSON.stringify(roleMap));

    const token =
      await userCredential.user.getIdToken();

    const user: User = {
      id:
        userCredential.user.uid,

      name:
        payload.name,

      email:
        payload.email,

      role:
        payload.role,

      club:
        payload.club,

      year:
        payload.year,
    };

    return{
      token,
      user
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

      club: "",

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