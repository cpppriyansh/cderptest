// src/utils/buildCloudinaryURL.js

export function isCloudinaryUrl(url) {
  return (
    typeof url === "string" &&
    url.includes("res.cloudinary.com") &&
    url.includes("/upload/")
  );
}

/**
 * Build an optimized Cloudinary URL
 * - Adds width/height/crop + q_auto,f_auto
 * - Respects non-Cloudinary URLs (returns as-is)
 * - Won't crash on unexpected URLs
 */
export function buildCloudinaryURL(
  url,
  {
    width = 300,
    height = width,
    crop = "fill",
    quality = "auto",
    format = "auto",
    dpr = 1,
  } = {}
) {
  if (!url || typeof url !== "string") return url;
  if (!isCloudinaryUrl(url)) return url;

  const [base, rest] = url.split("/upload/");
  if (!rest) return url;

  const params = [
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    quality ? `q_${quality}` : null,
    format ? `f_${format}` : null,
    dpr ? `dpr_${dpr}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return `${base}/upload/${params}/${rest}`;
}
