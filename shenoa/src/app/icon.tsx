import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0E5E4A",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: "#FDFDFB",
            fontFamily: "serif",
            marginTop: -2,
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
