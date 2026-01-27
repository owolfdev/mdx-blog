const splitCsv = (value?: string | null) =>
  (value ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

export const getAdminEmailAllowlist = () => splitCsv(process.env.ADMIN_EMAILS);

export const getAdminDomainAllowlist = () =>
  splitCsv(process.env.ADMIN_EMAIL_DOMAINS);

export const isAuthorizedAdminEmail = (email?: string | null) => {
  if (!email) {
    return false;
  }

  const normalized = email.trim().toLowerCase();
  const allowedEmails = getAdminEmailAllowlist();
  if (allowedEmails.length && allowedEmails.includes(normalized)) {
    return true;
  }

  const allowedDomains = getAdminDomainAllowlist();
  if (!allowedDomains.length) {
    return false;
  }

  const domain = normalized.split("@")[1] ?? "";
  return allowedDomains.includes(domain);
};
