"""
Genera components/layout/mapaDatos.ts: el mapa del bloque Contacto.

Datos abiertos, no de Google, para poder redibujarlos y publicarlos:
  - calles y el perímetro de Polo Hudson: OpenStreetMap (© colaboradores de OSM, ODbL)
  - edificios: Microsoft Global ML Building Footprints (ODbL)

El encuadre replica la captura de Google Maps que eligió el cliente (mismo norte,
misma escala, misma posición del local): se obtuvo registrando las calles de OSM
contra esa captura, con un error medio de ~3 px.

Uso, desde la raíz del repo:  python scripts/generar_mapa.py
Opcional: --osm osm.json y --edificios edificios.geojson para no volver a descargar.
"""

from __future__ import annotations

import argparse
import csv
import gzip
import io
import json
import math
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
SALIDA = WEB / "components" / "layout" / "mapaDatos.ts"
AGENTE = {"User-Agent": "paul-roger-web/1.0"}

ANCHO, ALTO = 1307, 983
MARCO = {"norte": -34.7730566, "oeste": -58.1677113, "sur": -34.7788616, "este": -58.1583146}
# Paul Roger, Calle 47 6750: la punta del pin de Google en la captura de referencia.
LOCAL = {"lat": -34.7757849, "lon": -58.1636780}
# Polo Hudson (30 ha, industrial + Polo Design Open Mall). En OSM figura con su
# nombre anterior, "Parque Industrial COCEMA": mismo cerco, entre la colectora del
# peaje y Calle 47, con la entrada por la rotonda.
POLO_WAY = 295138268

MARGEN = 60  # px fuera del cuadro que igual se dibujan, para que nada corte en seco

# Nombres sobre calles: (texto, ways de OSM, inicio y fin aproximados, corrimiento
# perpendicular). Adentro del Polo no hay calles con nombre.
ETIQUETAS = [
    ("Calle 47", [323082969], (706, 744), (884, 537), 0),
    ("Calle 47", [136667968, 323082972], (972, 434), (1190, 190), 0),
    ("Au. Ricardo Balbín", [23019383], (958, 540), (1262, 811), 30),
]
# Nombre del Polo: va sobre la franja libre entre la colectora y la calle interna.
ZONA = ("Polo Hudson", (212, 180), (462, 393))
# Escudos de la RN 1 sobre la autopista: (way, punto aproximado).
ESCUDOS = [(173108274, (700, 343)), (48334347, (1190, 712))]

CLASES_CALLE = {
    "motorway": "autopista",
    "motorway_link": "ramal",
    "trunk": "autopista",
    "primary": "principal",
    "secondary": "principal",
    "tertiary": "local",
    "residential": "local",
    "unclassified": "local",
    "living_street": "servicio",
    "service": "servicio",
}


def mercator(lat: float, lon: float) -> tuple[float, float]:
    s = math.sin(math.radians(lat))
    return (lon + 180) / 360, 0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)


X0, Y0 = mercator(MARCO["norte"], MARCO["oeste"])
X1, Y1 = mercator(MARCO["sur"], MARCO["este"])


def px(lat: float, lon: float) -> tuple[float, float]:
    x, y = mercator(lat, lon)
    return (x - X0) / (X1 - X0) * ANCHO, (y - Y0) / (Y1 - Y0) * ALTO


def caja(margen: float) -> tuple[float, float, float, float]:
    return MARCO["sur"] - margen, MARCO["oeste"] - margen, MARCO["norte"] + margen, MARCO["este"] + margen


OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter"]


def pedir_osm() -> dict:
    s, o, n, e = caja(0.004)
    q = f'[out:json][timeout:60];(way["highway"]({s},{o},{n},{e});way(id:{POLO_WAY}););out geom tags;'
    datos = urllib.parse.urlencode({"data": q}).encode()

    def pedir(url: str) -> dict:
        with urllib.request.urlopen(urllib.request.Request(url, data=datos, headers=AGENTE), timeout=120) as r:
            return json.load(r)

    try:
        return pedir(OVERPASS[0])
    except urllib.error.HTTPError:  # el servidor principal suele saturarse (504)
        return pedir(OVERPASS[1])


def pedir_edificios() -> dict:
    """Baja el cuadrante (quadkey nivel 9) de Microsoft que contiene el local y lo recorta al marco."""
    z = 9
    n = 2**z
    mx, my = mercator(LOCAL["lat"], LOCAL["lon"])
    tx, ty = int(mx * n), int(my * n)
    quadkey = "".join(str(((tx >> (z - 1 - i)) & 1) + 2 * ((ty >> (z - 1 - i)) & 1)) for i in range(z))
    base = "https://minedbuildings.z5.web.core.windows.net/global-buildings/dataset-links.csv"
    with urllib.request.urlopen(urllib.request.Request(base, headers=AGENTE), timeout=120) as r:
        filas = [f for f in csv.DictReader(io.TextIOWrapper(r, "utf-8")) if f["QuadKey"] == quadkey]
    s, o, n_, e = caja(0.002)
    features = []
    for fila in filas:
        with urllib.request.urlopen(urllib.request.Request(fila["Url"], headers=AGENTE), timeout=300) as r:
            for linea in gzip.open(r, "rt", encoding="utf-8"):
                if not linea.startswith("{"):
                    continue
                geo = json.loads(linea)["geometry"]
                anillo = geo["coordinates"][0] if geo["type"] == "Polygon" else geo["coordinates"][0][0]
                if any(o <= lon <= e and s <= lat <= n_ for lon, lat in anillo):
                    features.append({"type": "Feature", "properties": {}, "geometry": geo})
    return {"type": "FeatureCollection", "features": features}


def simplificar(pts: list[tuple[float, float]], tol: float = 0.6) -> list[tuple[float, float]]:
    """Douglas-Peucker: saca vértices que no cambian el dibujo a esta escala."""
    if len(pts) < 3:
        return pts
    if pts[0] == pts[-1]:
        # anillo cerrado (rotondas, edificios): con la base en cero se borraría entero
        lejos = max(range(len(pts)), key=lambda i: math.dist(pts[0], pts[i]))
        if math.dist(pts[0], pts[lejos]) == 0:
            return pts[:1]
        return simplificar(pts[: lejos + 1], tol)[:-1] + simplificar(pts[lejos:], tol)
    (ax, ay), (bx, by) = pts[0], pts[-1]
    dx, dy = bx - ax, by - ay
    largo = math.hypot(dx, dy)
    peor, idx = 0.0, 0
    for i, (x, y) in enumerate(pts[1:-1], 1):
        dist = abs(dy * x - dx * y + bx * ay - by * ax) / largo
        if dist > peor:
            peor, idx = dist, i
    if peor <= tol:
        return [pts[0], pts[-1]]
    return simplificar(pts[: idx + 1], tol)[:-1] + simplificar(pts[idx:], tol)


def visible(pts: list[tuple[float, float]]) -> bool:
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return max(xs) >= -MARGEN and min(xs) <= ANCHO + MARGEN and max(ys) >= -MARGEN and min(ys) <= ALTO + MARGEN


def d_path(pts: list[tuple[float, float]], cerrar: bool = False) -> str:
    s = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in pts)
    return s + ("Z" if cerrar else "")


def proyectar(pts: list[tuple[float, float]], q: tuple[float, float]) -> tuple[float, float]:
    """Punto de la polilínea más cercano a q."""
    mejor, dist = pts[0], math.inf
    for (ax, ay), (bx, by) in zip(pts, pts[1:]):
        dx, dy = bx - ax, by - ay
        t = max(0.0, min(1.0, ((q[0] - ax) * dx + (q[1] - ay) * dy) / ((dx * dx + dy * dy) or 1e-9)))
        p = (ax + t * dx, ay + t * dy)
        if math.dist(p, q) < dist:
            mejor, dist = p, math.dist(p, q)
    return mejor


def falso_positivo(pts: list[tuple[float, float]], autopista: list[list[tuple[float, float]]]) -> bool:
    """Las huellas detectadas por IA a veces marcan como edificio el cantero de la autopista."""
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    grande = math.hypot(max(xs) - min(xs), max(ys) - min(ys)) > 120
    centro = (sum(xs) / len(xs), sum(ys) / len(ys))
    cerca = min(math.dist(centro, proyectar(r, centro)) for r in autopista) < 90
    return grande and cerca


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--osm", help="respuesta de Overpass ya descargada")
    ap.add_argument("--edificios", help="GeoJSON de edificios ya descargado")
    ap.add_argument("--guardar", help="carpeta donde dejar lo descargado, para reusarlo")
    args = ap.parse_args()

    osm = json.load(open(args.osm, encoding="utf-8")) if args.osm else pedir_osm()
    huellas = json.load(open(args.edificios, encoding="utf-8")) if args.edificios else pedir_edificios()
    if args.guardar:
        Path(args.guardar, "osm.json").write_text(json.dumps(osm), encoding="utf-8")
        Path(args.guardar, "edificios.geojson").write_text(json.dumps(huellas), encoding="utf-8")

    calles: dict[str, list[str]] = {c: [] for c in sorted(set(CLASES_CALLE.values()))}
    por_id: dict[int, list[tuple[float, float]]] = {}
    es_ruta: dict[int, bool] = {}
    polo = ""

    for e in osm["elements"]:
        if e["type"] != "way" or "geometry" not in e:
            continue
        t = e.get("tags", {})
        pts = [px(p["lat"], p["lon"]) for p in e["geometry"]]
        por_id[e["id"]] = pts
        es_ruta[e["id"]] = t.get("highway") in ("motorway", "trunk")
        if e["id"] == POLO_WAY:
            polo = d_path(simplificar(pts, 0.8), cerrar=True)
        elif t.get("highway") in CLASES_CALLE and visible(pts):
            calles[CLASES_CALLE[t["highway"]]].append(d_path(simplificar(pts)))

    autopista = [pts for i, pts in por_id.items() if es_ruta[i]]
    edificios = []
    for f in huellas["features"]:
        geo = f["geometry"]
        for anillos in [geo["coordinates"]] if geo["type"] == "Polygon" else geo["coordinates"]:
            for anillo in anillos:
                pts = [px(lat, lon) for lon, lat in anillo]
                if visible(pts) and not falso_positivo(pts, autopista):
                    edificios.append(d_path(simplificar(pts, 0.4), cerrar=True))

    etiquetas = []
    for i, (texto, ways, desde, hasta, corrimiento) in enumerate(ETIQUETAS):
        a = min((proyectar(por_id[w], desde) for w in ways), key=lambda p: math.dist(p, desde))
        b = min((proyectar(por_id[w], hasta) for w in ways), key=lambda p: math.dist(p, hasta))
        if a[0] > b[0]:
            a, b = b, a  # que se lea de izquierda a derecha
        largo = math.dist(a, b)
        nx, ny = -(b[1] - a[1]) / largo, (b[0] - a[0]) / largo
        a = (a[0] + nx * corrimiento, a[1] + ny * corrimiento)
        b = (b[0] + nx * corrimiento, b[1] + ny * corrimiento)
        tipo = "ruta" if es_ruta[ways[0]] else "calle"
        etiquetas.append({"id": f"calle-{i}", "texto": texto, "tipo": tipo, "d": d_path([a, b])})
    etiquetas.append({"id": "zona", "texto": ZONA[0], "tipo": "zona", "d": d_path([ZONA[1], ZONA[2]])})

    escudos = []
    for way, cerca in ESCUDOS:
        x, y = proyectar(por_id[way], cerca)
        escudos.append({"x": round(x), "y": round(y)})

    lx, ly = px(LOCAL["lat"], LOCAL["lon"])
    datos = {
        "ancho": ANCHO,
        "alto": ALTO,
        "polo": polo,
        "calles": {k: " ".join(v) for k, v in calles.items()},
        "edificios": " ".join(edificios),
        "etiquetas": etiquetas,
        "escudos": escudos,
        "local": {"x": round(lx), "y": round(ly)},
    }
    SALIDA.write_text(
        "// Generado por scripts/generar_mapa.py. No editar a mano.\n"
        "// Calles y perímetro de Polo Hudson: © colaboradores de OpenStreetMap (ODbL).\n"
        "// Edificios: Microsoft Global ML Building Footprints (ODbL).\n\n"
        f"export const MAPA = {json.dumps(datos, ensure_ascii=False, indent=2)} as const\n",
        encoding="utf-8",
    )
    print(f"local {datos['local']} | {len(edificios)} edificios | {SALIDA.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
