"use client";

import Image from "next/image";
import { buildCloudinaryURL, isCloudinaryUrl } from "@/utils/buildCloudinaryURL";

/**
 * CImage v2
 * - Wraps next/image
 * - Auto-optimizes Cloudinary URLs
 * - Leaves local/static images as-is
 * - Good defaults for sizes + lazy-loading
 *
 * NOTES:
 * - Use `priority` for hero/above-the-fold images
 * - For everything else, it defaults to lazy
 */
export default function CImage({
  src,
  alt = "",
  width = 200,
  height = 200,
  sizes = "(max-width: 768px) 50vw, 200px",
  className = "",
  style = {},
  priority = false,
  optimizeCloudinary = true, // turn off if you ever need raw URL
  ...props
}) {
  let finalSrc = src;

  // Only transform Cloudinary URLs when enabled
  if (optimizeCloudinary && isCloudinaryUrl(src)) {
    finalSrc = buildCloudinaryURL(src, { width, height });
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ objectFit: "cover", ...style }}
      priority={priority}
      {...props}
    />
  );
}
