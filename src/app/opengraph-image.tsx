import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#f8fafc",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            color: "#fcd34d",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          CineFoco
        </p>
        <h1 style={{ fontSize: 64, fontWeight: 700, margin: "20px 0" }}>
          Notícias de filmes e séries
        </h1>
        <p style={{ fontSize: 28, color: "#cbd5f5", maxWidth: 760 }}>
          Cobertura diária, críticas e entrevistas exclusivas do universo
          audiovisual.
        </p>
      </div>
    ),
    size
  );
}
