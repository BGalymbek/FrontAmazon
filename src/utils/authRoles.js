export function isAdminLikeUser(user) {
  if (!user) {
    return false;
  }
  return Boolean(user.is_staff || user.role === 'admin' || user.role === 'dorm_staff');
}
