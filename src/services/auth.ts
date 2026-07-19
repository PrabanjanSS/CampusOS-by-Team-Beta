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

    // 2. Send the newly created Firebase user data to your backend database
    console.log("PAYLOAD LEAVING FRONTEND:", {
  fullName: payload.fullName,
  year: payload.year
});
      const { data } = await api.post('/auth/register', {
        firebaseUid: userCredential.user.uid,
        fullName: payload.fullName,
        email: payload.email,
        department: payload.department,
        year: payload.year,
        password: payload.password,
        role: payload.role
      });

    return data;
  },

  async login(payload: LoginPayload): Promise<AuthSession> {
    // 1. Verify credentials with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    // 2. Fetch the user's profile and JWT token from your backend
    const { data } = await api.post('/auth/login', {
      email: payload.email,
      password: payload.password,
      firebaseUid: userCredential.user.uid
    });

    return data;
  },

  async googleLogin(firebaseUser: any): Promise<AuthSession> {
    // For Google login, the user is already authenticated with Firebase.
    // We just need to sync them with your backend.
    const { data } = await api.post('/auth/google', {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      avatar: firebaseUser.photoURL
    });
    
    return data;
  }
};