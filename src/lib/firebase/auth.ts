import * as firebaseAuth from 'firebase/auth';
import { firebaseInit } from './init';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

class AuthServiceClass {
  auth: firebaseAuth.Auth;
  constructor() {
    this.auth = firebaseAuth.initializeAuth(firebaseInit(), {
      persistence: (firebaseAuth as any).getReactNativePersistence(
        AsyncStorage,
      ),
    });
    this.auth.languageCode = 'en';
  }

  getAuthUser() {
    return this.auth.currentUser;
  }
  async update(email: string) {
    const user = this.getAuthUser();
    if (user)
      await this.auth.updateCurrentUser({
        ...user,
        email: email,
        emailVerified: false,
      });
  }
  async signInViaEmail(
    email: string,
    password: string,
  ): Promise<firebaseAuth.UserCredential['user']> {
    const creds = await firebaseAuth.signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    return creds.user;
  }

  async signInViaGoogle(): Promise<firebaseAuth.UserCredential['user'] | null> {
    GoogleSignin.configure({
      iosClientId:
        '44336898427-2blcp7c3j96qdm4g4kgldvevckn3brno.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    const token = signInResult.data?.idToken;
    if (!token) return null;

    const credential = firebaseAuth.GoogleAuthProvider.credential(token);

    const creds = await firebaseAuth.signInWithCredential(
      this.auth,
      credential,
    );

    return creds.user;
  }

  async signInViaApple(): Promise<firebaseAuth.UserCredential['user'] | null> {
    const res = await appleAuth.performRequest({});
    const token = res.identityToken;
    if (!token) return null;
    const appleProvider = new firebaseAuth.OAuthProvider('apple.com');
    const credential = appleProvider.credential({ idToken: token });

    const creds = await firebaseAuth.signInWithCredential(
      this.auth,
      credential,
    );
    return creds.user;
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<firebaseAuth.UserCredential['user']> {
    const creds = await firebaseAuth.createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );

    return creds.user;
  }

  async signOut() {
    await this.auth.signOut();
  }
  async destroyUser() {
    const user = this.getAuthUser();
    if (user) await firebaseAuth.deleteUser(user);
  }

  async updatePassword(password: string) {
    const user = this.getAuthUser();
    if (!user) return null;
    firebaseAuth.updatePassword(user, password);
  }
}

export const authService = new AuthServiceClass();
