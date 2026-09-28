"""
Importa las fotos finales retocadas (img/final/*.webp) al sitio (public/img/).

Las WebP se copian tal cual, sin recomprimir ni retocar: lo que está en
img/final/ es lo que se ve en el sitio. Next.js genera AVIF/WebP y los tamaños
del srcset automáticamente.

También genera dos derivados de las finales:
  public/img/pr-contacto-fachada.webp   recorte vertical del neón de la fachada (bloque Contacto)
  app/opengraph-image.jpg                imagen para compartir en redes (1200 × 630)

Requiere: pip install pillow pymupdf
Uso, desde la raíz del repo:  python scripts/importar_fotos.py
"""

from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageFilter

WEB = Path(__file__).resolve().parents[1]
FINAL = WEB / "img" / "final"
OUT = WEB / "public" / "img"
VECTORES = Path(__file__).with_name("marca-vectores.json")

ROJO = (229, 37, 33)  # #e52521
NEGRO = (29, 29, 27)  # #1d1d1b


def mascara_logo(parte: str, ancho: int) -> Image.Image:
    """Rasteriza el logo del manual (trazos reales, no una fuente) como máscara."""
    datos = json.loads(VECTORES.read_text(encoding="utf-8"))["horizontal"]
    w, h = datos["w"], datos["h"]
    trazos = datos["paths"]["red"] if parte == "script" else datos["paths"]["black"]
    escala = max(4, ancho * 3 / w)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
        f'width="{w * escala:.0f}" height="{h * escala:.0f}"><path fill="#ffffff" d="{trazos}"/></svg>'
    )
    pix = pymupdf.open(stream=svg.encode(), filetype="svg")[0].get_pixmap(alpha=True)
    alfa = Image.frombytes("RGBA", (pix.width, pix.height), pix.samples).getchannel("A")
    alfa = alfa.crop(alfa.getbbox())
    return alfa.resize((ancho, round(alfa.height * ancho / alfa.width)), Image.LANCZOS)


def contacto_fachada() -> None:
    """Recorte vertical 4:5 del neón de la entrada, para el bloque de Contacto."""
    im = Image.open(OUT / "pr-eventos-fachada.webp").convert("RGB")
    w, h = im.size
    # Fracciones tomadas del recorte original (1370, 0, 2522, 1440) sobre una fachada de 2560x1440,
    # centrado en el neón: se escalan al tamaño real por si la fachada cambia de resolución.
    caja = (round(w * 1370 / 2560), 0, round(w * 2522 / 2560), h)
    recorte = im.crop(caja)
    recorte.save(OUT / "pr-contacto-fachada.webp", "WEBP", quality=90, method=6)
    print(f"  pr-contacto-fachada.webp (derivado)   {recorte.width}x{recorte.height}")


def opengraph() -> None:
    """Imagen para compartir: el salón en penumbra con el logo del manual."""
    base = Image.open(OUT / "pr-hero-salon-desktop.webp").convert("RGB")
    base = base.crop((300, 140, 2260, 1169)).resize((1200, 630), Image.LANCZOS)
    base = base.filter(ImageFilter.GaussianBlur(2.2))
    base = Image.blend(base, Image.new("RGB", base.size, NEGRO), 0.62)
    script, claim = mascara_logo("script", 620), mascara_logo("claim", 330)
    y = (630 - script.height - claim.height - 34) // 2
    base.paste(Image.new("RGB", script.size, ROJO), ((1200 - script.width) // 2, y), script)
    base.paste(Image.new("RGB", claim.size, (255, 255, 255)), ((1200 - claim.width) // 2, y + script.height + 34), claim)
    base.save(WEB / "app" / "opengraph-image.jpg", "JPEG", quality=86, optimize=True)
    print("  app/opengraph-image.jpg (derivado)    1200x630")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    finales = sorted(FINAL.glob("*.webp"))
    if not finales:
        sys.exit(f"No hay WebP en {FINAL}")

    # Se borran las fotos anteriores de public/img para que no queden versiones viejas.
    for viejo in list(OUT.glob("*.jpg")) + list(OUT.glob("*.webp")):
        viejo.unlink()

    print(f"Fotos finales {FINAL} → {OUT}")
    for f in finales:
        shutil.copy2(f, OUT / f.name)
        print(f"  {f.name}")

    contacto_fachada()
    opengraph()
