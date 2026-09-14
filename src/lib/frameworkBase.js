export const FRAMEWORK_BASE = "/framework";

/** In-app hash on the Framework site (`/framework/#pricing`). */
export function fwHash(hash = "") {
  const h = hash.startsWith("#") ? hash : hash ? `#${hash}` : "";
  return `${FRAMEWORK_BASE}/${h}`;
}
