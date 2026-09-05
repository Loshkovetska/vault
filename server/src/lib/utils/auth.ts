export function setCookie(uid: string) {
  const cookie = {
    "": uid,
    sameSite: "lax",
    httpOnly: "",
    secure: "",
    domain: "vault.com",
    path: "/",
  };

  return Object.entries(cookie)
    .map(([k, v]) => `${k}${v?.length ? `=${v}` : ""}`)
    .join("; ");
}
