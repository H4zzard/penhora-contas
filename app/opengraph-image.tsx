import { ImageResponse } from "next/og";

export const alt = "Dr. Samuel Santos — Bloqueio Judicial de Conta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b0b", color: "#fff", padding: "76px 86px", position: "relative", fontFamily: "serif" }}>
      <div style={{ position: "absolute", top: 0, left: 86, width: 2, height: 630, background: "#d4a72c" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: 20, letterSpacing: 3, color: "#d4a72c" }}><span>DIREITO CIVIL • EXECUÇÕES</span><span>OAB/SP 349.894</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div style={{ display: "flex", flexDirection: "column", fontSize: 73, lineHeight: 1.04, maxWidth: 990 }}><span>Bloqueio Judicial</span><span>de Conta Bancária</span></div><div style={{ fontFamily: "sans-serif", fontSize: 28, color: "#cfcfcf" }}>Informação jurídica clara. Análise individualizada.</div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "sans-serif", fontSize: 26 }}><span style={{ width: 46, height: 46, background: "#d4a72c", color: "#0b0b0b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>SS</span><span>Dr. Samuel Santos</span></div>
      </div>
    </div>,
    size,
  );
}
