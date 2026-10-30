import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const size = { width: 128, height: 128 };
export const contentType = "image/png";

export default async function Icon() {
  const photo = await readFile(
    path.join(process.cwd(), "public", "narjess-profile.jpg"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "128px",
        height: "128px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        borderRadius: "64px",
        background: "#f1f5f9",
      }}
    >
      <img
        src={`data:image/jpeg;base64,${photo.toString("base64")}`}
        alt=""
        width={334}
        height={356}
        style={{
          position: "absolute",
          width: "334px",
          height: "356px",
          left: "-103px",
          top: "-125px",
        }}
      />
    </div>,
    size,
  );
}
