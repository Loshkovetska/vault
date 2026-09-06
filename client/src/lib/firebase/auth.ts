import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { BASE_URL } from '../store/base';
import { SignInViaProvider } from '../types/auth';

class AuthServiceClass {
  baseUrl: string;
  constructor() {
    this.baseUrl = `${BASE_URL}/auth`;
  }
  async update(email: string) {
    await fetch(`${this.baseUrl}/update/email`, {
      method: 'PATCH',
      body: email,
    });
  }
  async signInViaEmail(
    email: string,
    password: string,
  ): Promise<{ id: string } | null> {
    const creds = await fetch(`${this.baseUrl}/sign-in/credentials`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(c => c.json());

    return creds;
  }

  async signInViaGoogle(): Promise<SignInViaProvider | null> {
    GoogleSignin.configure({
      iosClientId:
        '44336898427-2blcp7c3j96qdm4g4kgldvevckn3brno.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    const token = signInResult.data?.idToken;
    if (!token) return null;

    const creds = await fetch(`${this.baseUrl}/sign-in/google`, {
      method: 'POST',
      body: token,
    }).then(c => c.json());

    return creds;
  }

  async signInViaApple(): Promise<SignInViaProvider | null> {
    const res = await appleAuth.performRequest({});
    const token = res.identityToken;
    if (!token) return null;

    const creds = await fetch(`${this.baseUrl}/sign-in/apple`, {
      method: 'POST',
      body: token,
    }).then(c => c.json());

    return creds;
  }

  async signUp(email: string, password: string): Promise<{ uid?: string }> {
    const creds = await fetch(`${this.baseUrl}/sign-up`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(c => c.json());

    return creds;
  }

  async destroyUser() {
    const creds = await fetch(`${this.baseUrl}/destroy`, {
      method: 'DELETE',
    }).then(c => c.json());

    return creds;
  }

  async updatePassword(password: string) {
    const creds = await fetch(`${this.baseUrl}/update/password`, {
      method: 'PATCH',
      body: password,
    }).then(c => c.json());

    return creds;
  }
}

export const authService = new AuthServiceClass();
