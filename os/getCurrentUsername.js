import { userInfo } from 'node:os';

export function getCurrentUsername() {
  const userData = userInfo(); // Get information about the current user
  console.log(`Current system username: ${userData.username}`);
}