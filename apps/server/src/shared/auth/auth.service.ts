export class AuthService {
  async validateUser(username: string, password: string) {
    if (
      username !== process.env.AUTH_USER ||
      password !== process.env.AUTH_PASSWORD
    )
      return false;

    return true;
  }
}
