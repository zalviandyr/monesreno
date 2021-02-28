export class UserData {
  public static setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public static getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public static clear(): void {
    sessionStorage.clear();
  }
}
