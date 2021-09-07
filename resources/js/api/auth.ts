import {
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  TwoFactorDTO,
  UpdatePasswordDTO,
  UpdateProfileDTO,
  AuthUser,
} from '@/types/api';
import config from '@/utils/config';
import req from '@/utils/request';

// Sanctum & Fortify url are not located in api namespace
export const csrf = () => req.get(`${config.appUrl}/sanctum/csrf-cookie`);

/**
 * Authentication
 */

export const login = (credentials: LoginDTO) =>
  req.post<void | { two_factor: boolean }>(`${config.appUrl}/login`, credentials);

export const register = (userData: RegisterDTO) => req.post(`${config.appUrl}/register`, userData);

export const logout = () => req.post(`${config.appUrl}/logout`);

/**
 * User Related
 */

export const user = () => req.get<AuthUser>('user');

export const updatePassword = (passwords: UpdatePasswordDTO) =>
  req.put(`${config.appUrl}/user/password`, passwords);

export const updateProfile = (userData: UpdateProfileDTO) =>
  req.put(`${config.appUrl}/user/profile-information`, userData);

export const isPasswordConfirmed = () =>
  req.get<{ confirmed: boolean }>(`${config.appUrl}/user/confirmed-password-status`);

export const confirmPassword = (password: string) =>
  req.post(`${config.appUrl}/user/confirm-password`, { password });

/**
 * 2FA
 */

export const enable2FA = () => req.post(`${config.appUrl}/user/two-factor-authentication`);

export const disable2FA = () => req.delete(`${config.appUrl}/user/two-factor-authentication`);

export const get2FAQrCode = () =>
  req.get<{ svg: string }>(`${config.appUrl}/user/two-factor-qr-code`);

export const get2FARecoveryCodes = () =>
  req.get<string[]>(`${config.appUrl}/user/two-factor-recovery-codes`);

export const regenerate2FARecoveryCodes = () =>
  req.post(`${config.appUrl}/user/two-factor-recovery-codes`);

export const login2FA = (credentials: TwoFactorDTO) =>
  req.post(`${config.appUrl}/two-factor-challenge`, credentials);

/**
 * Reset Password
 */
export const requestReset = (email: string) =>
  req.post(`${config.appUrl}/forgot-password`, { email });

export const resetPassword = (newCredentials: ResetPasswordDTO) =>
  req.post(`${config.appUrl}/reset-password`, newCredentials);
