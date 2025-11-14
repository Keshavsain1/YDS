/**
 * /src/utils/image.ts
 *
 * Production-hardened utilities for mapping original image paths (under /public/assets)
 * to optimized, root-relative optimized paths and building responsive srcSets.
 *
 * - Normalizes input (strips query/hash, handles backslashes, trims whitespace)
 * - Produces predictable root-relative optimized base paths
 * - Avoids double-slashes
 * - Produces descending-ordered srcSets for AVIF/WebP/JPG
 */

export function optimizedBaseFromOriginal(originalSrc?: string | null): string | null {
  if (!originalSrc) return null;

  try {
    // Trim, remove query/hash, normalize windows backslashes, remove leading slashes
    const cleaned = originalSrc
      .toString()
      .trim()
      .replace(/[?#].*$/, "") // strip query/hash
      .replace(/\\/g, "/") // windows -> unix slashes
      .replace(/^\/+/, ""); // remove leading slashes

    // Ensure path is relative to `assets/`
    const rel = cleaned.startsWith("assets/") ? cleaned.slice("assets/".length) : cleaned;
    const parts = rel.split("/").filter(Boolean);
    if (parts.length === 0) return null;

    const filename = parts.pop() || "";
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const folder = parts.join("/");

    if (!nameWithoutExt) return null;

    // Construct root-relative optimized base and collapse any accidental duplicate slashes
    const raw = `/assets/optimized/${folder}/${nameWithoutExt}/${nameWithoutExt}`;
    return raw.replace(/\/{2,}/g, "/");
  } catch {
    return null;
  }
}

/**
 * Create a srcSet string for a given extension.
 * Sizes default to [1920,1440,1024,768,480] and will be emitted in descending order.
 */
export function makeSrcSet(
  base: string | null,
  ext: string,
  sizes: number[] = [1920, 1440, 1024, 768, 480]
): string {
  if (!base) return "";
  const sorted = [...sizes].sort((a, b) => b - a);
  return sorted.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
}

/**
 * Build full responsive source object for use inside <picture>.
 * Returns { avif, webp, jpg, base } where base is a sensible jpg fallback.
 */
export function buildResponsiveSources(
  originalSrc?: string | null,
  sizes: number[] = [1920, 1440, 1024, 768, 480]
) {
  const base = optimizedBaseFromOriginal(originalSrc);
  if (!base) {
    // fallback to the provided original (if any) or empty strings to avoid undefined
    return { avif: "", webp: "", jpg: "", base: originalSrc || "" };
  }

  return {
    avif: makeSrcSet(base, "avif", sizes),
    webp: makeSrcSet(base, "webp", sizes),
    jpg: makeSrcSet(base, "jpg", sizes),
    // sensible mid-resolution fallback for <img src="...">
    base: `${base}-1024.jpg`.replace(/\/{2,}/g, "/"),
  };
}
