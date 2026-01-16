import { useState, useEffect } from "react";

export function useFingerprint() {
  const [fingerprintHash, setFingerprintHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        // Collect signals
        const signals = [
          navigator.userAgent,
          navigator.language,
          new Date().getTimezoneOffset(),
          screen.width + "x" + screen.height,
          screen.colorDepth,
          // Canvas Fingerprint
          getCanvasFingerprint(),
        ].join("||");

        // Hash using Web Crypto API
        const encoder = new TextEncoder();
        const data = encoder.encode(signals);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        setFingerprintHash(hashHex);
      } catch (err) {
        console.error("Fingerprinting failed", err);
        // Fallback or handle error - though for this app we likely just want to fail silently or generate a random one if strict security isn't critical
        setFingerprintHash("fallback-" + Math.random().toString(36).substring(7));
      } finally {
        setLoading(false);
      }
    };

    generateFingerprint();
  }, []);

  return { fingerprintHash, loading };
}

function getCanvasFingerprint() {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";

    canvas.width = 200;
    canvas.height = 50;

    // Text with different styles
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("NordicMagic", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("NordicMagic", 4, 17);

    return canvas.toDataURL();
  } catch (e) {
    return "canvas-error";
  }
}
