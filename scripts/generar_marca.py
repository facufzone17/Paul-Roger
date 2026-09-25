"""
Genera los archivos de marca del sitio a partir de los vectores del Manual de
Identidad Visual (extraídos del PDF, trazos originales, sin redibujar):

  public/brand/logo-horizontal.svg          script rojo + claim blanco (sobre negro, manual pág. 13)
  public/brand/logo-horizontal-blanco.svg   versión negativa, todo blanco (sobre rojo o foto)
  public/brand/logo-vertical.svg            vertical completa, script rojo + claim blanco
  public/brand/iconos.svg                   sprite con los íconos de "Elementos gráficos" (pág. 19)
  app/icon.svg y app/apple-icon.png         monograma PR para la pestaña y el celular
  public/brand/grano.png                    textura de grano para los placeholders oscuros

Se reemplazan por los .svg oficiales cuando el cliente mande los vectoriales.
Uso, desde la carpeta web/:  python scripts/generar_marca.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import pymupdf
from PIL import Image

WEB = Path(__file__).resolve().parents[1]
VECTORES = json.loads(Path(__file__).with_name("marca-vectores.json").read_text(encoding="utf-8"))
ICONOS = json.loads(Path(__file__).with_name("marca-iconos.json").read_text(encoding="utf-8"))
BRAND = WEB / "public" / "brand"

ROJO = "#e52521"
NEGRO = "#1d1d1b"

# Celda de la grilla de la pág. 19 del manual -> nombre del ícono en el sitio.
# (Se excluye WhatsApp a propósito: el sitio no deriva a WhatsApp.)
ICONOS_USADOS = {
    "0_0": "servicio",
    "1_0": "plato",
    "2_0": "fuego",
    "5_0": "coctel",
    "6_0": "vino",
    "2_1": "bife",
    "3_1": "torta",
    "4_1": "sushi",
    "5_1": "cafe",
    "6_1": "cerveza",
    "0_2": "chef",
    "1_2": "ubicacion",
    "3_2": "instagram",
    "4_2": "mail",
    "6_2": "regalo",
    "0_3": "flor",
    "6_3": "reserva",
}


def logo(nombre: str, datos: dict, script: str, claim: str, titulo: str) -> None:
    w, h = datos["w"], datos["h"]
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" role="img">'
        f"<title>{titulo}</title>"
        f'<path fill="{script}" d="{datos["paths"]["red"]}"/>'
        f'<path fill="{claim}" d="{datos["paths"]["black"]}"/>'
        "</svg>"
    )
    (BRAND / nombre).write_text(svg, encoding="utf-8")
    print(f"  brand/{nombre}  ({len(svg) // 1024} KB)")


def compactar(d: str) -> str:
    """Redondea a 1 decimal: a tamaño de ícono la diferencia no se ve y el sprite pesa la mitad."""
    return re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.1f}".rstrip("0").rstrip("."), d)


def sprite() -> None:
    simbolos = []
    for celda, nombre in ICONOS_USADOS.items():
        ic = ICONOS[celda]
        simbolos.append(
            f'<symbol id="{nombre}" viewBox="0 0 {ic["w"]:.1f} {ic["h"]:.1f}">'
            f'<path fill="currentColor" d="{compactar(ic["d"])}"/></symbol>'
        )
    svg = '<svg xmlns="http://www.w3.org/2000/svg">' + "".join(simbolos) + "</svg>"
    (BRAND / "iconos.svg").write_text(svg, encoding="utf-8")
    print(f"  brand/iconos.svg  ({len(ICONOS_USADOS)} íconos, {len(svg) // 1024} KB)")
    proporciones = {n: round(ICONOS[c]["w"] / ICONOS[c]["h"], 3) for c, n in ICONOS_USADOS.items()}
    print("  proporciones:", proporciones)


def monograma() -> None:
    m = VECTORES["monogram"]
    w, h = m["w"], m["h"]
    lado = max(w, h) * 1.36
    dx, dy = (lado - w) / 2, (lado - h) / 2
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado:.2f} {lado:.2f}">'
        f'<rect width="{lado:.2f}" height="{lado:.2f}" rx="{lado * 0.18:.2f}" fill="{NEGRO}"/>'
        f'<path transform="translate({dx:.2f} {dy:.2f})" fill="{ROJO}" d="{m["paths"]["red"]}"/>'
        "</svg>"
    )
    (WEB / "app" / "icon.svg").write_text(svg, encoding="utf-8")
    pix = pymupdf.open(stream=svg.replace(f'rx="{lado * 0.18:.2f}" ', "").encode(), filetype="svg")[0]
    img = pix.get_pixmap(matrix=pymupdf.Matrix(180 / lado, 180 / lado))
    Image.frombytes("RGB", (img.width, img.height), img.samples).resize((180, 180)).save(WEB / "app" / "apple-icon.png")
    print("  app/icon.svg + app/apple-icon.png")


def grano() -> None:
    """Textura de grano para los placeholders tratados en oscuro (PNG: mucho más liviano de pintar que un filtro SVG)."""
    import numpy as np

    rng = np.random.default_rng(29)
    alfa = (rng.random((128, 128)) ** 3 * 34).astype(np.uint8)  # puntos claros dispersos, alfa máx. ~13%
    rgba = np.dstack([np.full((128, 128), 255, np.uint8)] * 3 + [alfa])
    Image.fromarray(rgba).save(BRAND / "grano.png", optimize=True)
    print(f"  brand/grano.png  ({(BRAND / 'grano.png').stat().st_size // 1024} KB)")


if __name__ == "__main__":
    BRAND.mkdir(parents=True, exist_ok=True)
    print("Archivos de marca →", BRAND)
    titulo = "Paul Roger — Brasas &amp; Cocktail"
    logo("logo-horizontal.svg", VECTORES["horizontal"], ROJO, "#ffffff", titulo)
    logo("logo-horizontal-blanco.svg", VECTORES["horizontal"], "#ffffff", "#ffffff", titulo)
    logo("logo-vertical.svg", VECTORES["vertical"], ROJO, "#ffffff", titulo)
    sprite()
    monograma()
    grano()
