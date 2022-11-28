export function success(payload: any = null) {
  if (!payload) return { ok: true };
  return { ok: true, payload };
}

export function failure(message: string) {
  return { ok: false, message };
}
