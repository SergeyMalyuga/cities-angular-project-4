import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY_NAME } from '../constants/const';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string | null {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    } catch (error) {
      console.error('Error getting token to localStorage:', error);
      return null;
    }
  }

  public setToken(token: Token): boolean {
    if (!token || token.trim() === '') {
      return false;
    }
    try {
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
      return true;
    } catch (error) {
      console.error('Error set token to localStorage:', error);
      return false;
    }
  }

  public removeToken(): boolean {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
      return true;
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
      return false;
    }
  }
}
