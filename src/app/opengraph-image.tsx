import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Firewall Grupo RAM | Firewall gerenciado sobre MikroTik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const iconData = await readFile(
  join(process.cwd(), "src/app/icon.png"),
  "base64"
);
const iconSrc = `data:image/png;base64,${iconData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#020617",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={64} height={64} alt="" />
          <span
            style={{
              fontSize: 26,
              color: "#94a3b8",
              letterSpacing: 6,
              fontWeight: 600,
            }}
          >
            GRUPO RAM
          </span>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 48 }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#fbbf24",
              letterSpacing: 5,
              fontWeight: 700,
            }}
          >
            FIREWALL GERENCIADO PARA REDES MIKROTIK
          </span>
          <span
            style={{
              fontSize: 100,
              color: "white",
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 24,
            }}
          >
            Firewall
          </span>
          <span
            style={{
              fontSize: 100,
              color: "#22d3ee",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            as a Service
          </span>
          <span
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              marginTop: 32,
              maxWidth: 820,
            }}
          >
            Firewall gerenciado sobre MikroTik, em um painel web.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
