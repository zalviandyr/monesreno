import CryptoJS from 'crypto-js';
import moment from 'moment';

export const generateToken = (username: string): string => {
  const token = CryptoJS.HmacSHA1(username, Date.now().toString());
  return token.toString();
};

export const encPassword = (password?: string): string => {
  if (password && process.env) {
    const secretKey: string = process.env.SECRET_KEY ?? '';
    const enc = CryptoJS.HmacMD5(password.toString(), secretKey).toString();

    return enc;
  }

  return '';
};

export const getNow = (): string => moment().format('YYYY-MM-DD HH:mm:ss');
