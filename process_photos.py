# -*- coding: utf-8 -*-
"""Pipeline de retoque para las fotos de Paul Roger, siguiendo guia-retoque-fotos.html"""
import os, cv2, numpy as np, time

IMG = os.path.dirname(os.path.abspath(__file__)) + "/img"
HEIC = "C:/Users/zonev/AppData/Local/Temp/claude/C--Users-zonev-OneDrive-Documentos-Paul-rogers/bab38c28-b0fa-4e15-8834-f48b68d0acd7/scratchpad"
OUT = os.path.dirname(os.path.abspath(__file__)) + "/img/final"
os.makedirs(OUT, exist_ok=True)

_upsampler = None
def get_upsampler():
    global _upsampler
    if _upsampler is None:
        from basicsr.archs.rrdbnet_arch import RRDBNet
        from realesrgan import RealESRGANer
        model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
        _upsampler = RealESRGANer(scale=4, model_path=os.path.dirname(os.path.abspath(__file__)) + "/models/RealESRGAN_x4plus.pth",
                                   model=model, tile=300, half=False)
    return _upsampler

def upscale2x(img):
    up = get_upsampler()
    out, _ = up.enhance(img, outscale=2)
    return out

def denoise(img, strength=8):
    return cv2.fastNlMeansDenoisingColored(img, None, strength, strength, 7, 21)

def levels(img, in_black=0, in_white=255, gamma=1.0):
    img = img.astype(np.float32)
    img = np.clip((img - in_black) * (255.0 / max(1, in_white - in_black)), 0, 255)
    if gamma != 1.0:
        img = 255 * (img / 255) ** (1 / gamma)
    return img.astype(np.uint8)

def contrast(img, amount=10):
    f = 259 * (amount * 2.55 + 255) / (255 * (259 - amount * 2.55))
    img = img.astype(np.float32)
    img = np.clip(f * (img - 128) + 128, 0, 255)
    return img.astype(np.uint8)

def desat_hue_range(img_bgr, h_lo, h_hi, sat_mult):
    hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    h = hsv[..., 0]
    mask = (h >= h_lo) & (h <= h_hi)
    hsv[..., 1][mask] *= sat_mult
    hsv[..., 1] = np.clip(hsv[..., 1], 0, 255)
    return cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

def crush_blacks_neutral(img_bgr, target=29):
    b, g, r = cv2.split(img_bgr.astype(np.float32))
    dark_mask = (cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY) < 60)
    if dark_mask.sum() > 500:
        cur = np.median(img_bgr[dark_mask])
        shift = target - cur
        img_bgr = np.clip(img_bgr.astype(np.float32) + shift * 0.6, 0, 255).astype(np.uint8)
    return img_bgr

def highlights_down(img, amount=20):
    img = img.astype(np.float32)
    mask = img > 180
    img[mask] -= (img[mask] - 180) * (amount / 40.0)
    return np.clip(img, 0, 255).astype(np.uint8)

def warm(img, amount=6):
    b, g, r = cv2.split(img.astype(np.float32))
    r = np.clip(r + amount, 0, 255)
    b = np.clip(b - amount * 0.6, 0, 255)
    return cv2.merge([b, g, r]).astype(np.uint8)

def unsharp(img, amount=0.6, radius=1.2, threshold=2):
    blur = cv2.GaussianBlur(img, (0, 0), radius)
    diff = img.astype(np.int16) - blur.astype(np.int16)
    diff[np.abs(diff) < threshold] = 0
    sharp = img.astype(np.int16) + diff * amount
    return np.clip(sharp, 0, 255).astype(np.uint8)

def inpaint_box(img, box, pad=10):
    x0, y0, x1, y1 = box
    mask = np.zeros(img.shape[:2], np.uint8)
    mask[max(0, y0 - pad):y1 + pad, max(0, x0 - pad):x1 + pad] = 255
    return cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)

def blur_box(img, box, k=25):
    x0, y0, x1, y1 = box
    roi = img[y0:y1, x0:x1]
    img[y0:y1, x0:x1] = cv2.GaussianBlur(roi, (k | 1, k | 1), 0)
    return img

def save(img, name, w, h):
    img = cv2.resize(img, (w, h), interpolation=cv2.INTER_LANCZOS4)
    path = f"{OUT}/{name}"
    cv2.imwrite(path, img, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print("saved", name, img.shape)

def load(fn):
    return cv2.imread(f"{IMG}/{fn}", cv2.IMREAD_COLOR)

def crop(img, box):
    x0, y0, x1, y1 = box
    return img[y0:y1, x0:x1]

t_start = time.time()
def step(name):
    print(f"--- {name} @ {time.time()-t_start:.0f}s ---")

# 1. PORTADA (hero)
step("hero")
img = load("foto_hero_desktop.jfif")
img = desat_hue_range(img, 80, 130, 0.35)          # receta B: sacar aguamarina/azul
img = desat_hue_range(img, 5, 25, 0.85)            # naranja sat -10 approx
img = contrast(img, 10)
img = highlights_down(img, 20)
# comensales: a pedido del cliente quedan visibles, sin difuminar
d = crop(img, (10, 0, 2741, 1536))
save(d, "pr-hero-salon-desktop.jpg", 2560, 1440)
m = crop(img, (781, 0, 1645, 1536))
m = upscale2x(m)
save(m, "pr-hero-salon-mobile.jpg", 1080, 1920)

# 2. BIFE
step("bife")
img = load("591147118_17879424573430342_8135658368094989072_n.jpg")
img = highlights_down(img, 10)
img = contrast(img, 6)
d = crop(img, (4, 0, 1435, 1789))
d = unsharp(d, 0.6, 1.2, 2)
save(d, "pr-mosaico-brasas.jpg", 1200, 1500)

# 3. SUSHI (mosaico)
step("sushi")
img = load("602220566_17880966486430342_5529562833402306687_n.jpg")
img = denoise(img, 6)
img = warm(img, 4)
img = highlights_down(img, 15)
d = crop(img, (40, 0, 1299, 1574))
d = unsharp(d, 0.6, 1.2, 2)
save(d, "pr-mosaico-sushi.jpg", 1200, 1500)

# 4. BARRA (coctelería + barra)
step("barra")
img = load("c53d15c8-9f4c-49b8-85af-1bda2bab6ba7.jpg")
img = denoise(img, 8)
img = crush_blacks_neutral(img, 29)
img = highlights_down(img, 15)
c = crop(img, (1000, 100, 2440, 1900))
save(c, "pr-mosaico-cocteleria.jpg", 1200, 1500)
b = crop(img, (0, 1650, 3024, 3351))
save(b, "pr-casa-barra.jpg", 2560, 1440)

# 5. VINOS (mosaico, etiquetas)
step("vinos-etiquetas")
img = load("669630515_17895376686430342_3317093569487055412_n.jpg")
img = highlights_down(img, 10)
d = crop(img, (0, 0, 1440, 1800))
save(d, "pr-mosaico-vinos.jpg", 1200, 1500)

# 6. LIMOUSINE (cartel)
step("limousine")
img = load("642660969_17889827718430342_5878010354755103268_n.jpg")
img = highlights_down(img, 15)
img = upscale2x(img)
img = unsharp(img, 0.4, 1.0, 2)
save(img, "pr-complemento-limousine.jpg", 1200, 1500)

# 7. FLORES
step("flores")
img = load("669681129_17895886383430342_582223711068482936_n.jpg")
img = desat_hue_range(img, 80, 130, 0.4)
img = contrast(img, 8)
d = crop(img, (170, 440, 1090, 1590))
save(d, "pr-complemento-flores.jpg", 800, 1000)

# 8. CHOCOLATES (bombones)
step("bombones")
img = load("WhatsApp Image 2026-09-25 at 13.03.23 (1).jpeg")
img = denoise(img, 5)
img = highlights_down(img, 8)
d = crop(img, (0, 40, 1170, 1503))
d = unsharp(d, 0.8, 0.8, 3)
save(d, "pr-complemento-chocolates.jpg", 800, 1000)

# 9. FACHADA (auto + neon, HEIC ya convertido)
step("fachada")
img = cv2.imread(f"{HEIC}/IMG_4881.jpg", cv2.IMREAD_COLOR)
img = denoise(img, 10)
img = crush_blacks_neutral(img, 29)
img = highlights_down(img, 10)
img = inpaint_box(img, (2560, 1100, 2870, 1460))  # semaforo
d = crop(img, (0, 520, 3024, 2221))
save(d, "pr-eventos-fachada.jpg", 2560, 1440)

# 10. VINOS pared (mozo)
step("pared-vinos")
img = load("660997074_17895376668430342_3203253936657576882_n.jpg")
img = highlights_down(img, 8)
d = crop(img, (0, 60, 1440, 1860))
d = unsharp(d, 0.5, 1.0, 2)
save(d, "pr-casa-vinos.jpg", 1200, 1500)

# 11. SALON de dia
step("salon")
img = load("692079483_17899819548430342_726979057541205504_n.jpg")
img = denoise(img, 5)
img = desat_hue_range(img, 80, 130, 0.35)
img = upscale2x(img)
save(img, "pr-casa-salon.jpg", 1200, 1500)

# 12. CAVA de noche
step("cava")
img = load("WhatsApp Image 2026-09-25 at 13.03.24 (3).jpeg")
img = denoise(img, 6)
img = crush_blacks_neutral(img, 29)
d = crop(img, (330, 420, 1170, 1470))
save(d, "pr-casa-cava.jpg", 800, 1000)

# 13. SASHIMI
step("sashimi")
img = load("WhatsApp Image 2026-09-25 at 13.03.24 (1).jpeg")
img = denoise(img, 6)
img = crush_blacks_neutral(img, 29)
d = crop(img, (0, 20, 1150, 1457))
save(d, "pr-carta-sushi.jpg", 1120, 1400)

# 14. SERVILLETA fondo
step("servilleta")
img = load("WhatsApp Image 2026-09-25 at 13.03.24 (4).jpeg")
img = denoise(img, 5)
img = warm(img, 4)
d = crop(img, (0, 86, 1170, 1549))
save(d, "pr-fondo-reservar.jpg", 1120, 1400)

# 15. BIFE DE CHORIZO
step("chorizo")
img = load("WhatsApp Image 2026-09-25 at 13.03.24 (2).jpeg")
img = denoise(img, 5)
img = warm(img, 4)
img = crush_blacks_neutral(img, 29)
d = crop(img, (0, 0, 1143, 1429))
d = unsharp(d, 0.6, 1.0, 2)
save(d, "pr-card-bife-chorizo.jpg", 800, 1000)

# 16. FLAN
step("flan")
img = load("WhatsApp Image 2026-09-25 at 13.03.23 (2).jpeg")
img = denoise(img, 5)
img = warm(img, 4)
d = crop(img, (40, 0, 1111, 1071))
d = unsharp(d, 0.7, 0.8, 3)
save(d, "pr-card-flan.jpg", 1000, 1000)

# 17. SUSHI PALILLOS
step("palillos")
img = load("641485916_17889010455430342_6445543607894471225_n.jpg")
img = warm(img, 3)
d = crop(img, (0, 50, 1179, 1524))
d = unsharp(d, 0.7, 0.8, 2)
save(d, "pr-card-sushi-palillos.jpg", 800, 1000)

# 18. POLLO + ESPINACA cenital (borrar lata)
step("pollo-cenital")
img = load("702255364_17901415680430342_3089838988312360658_n.jpg")
img = denoise(img, 5)
img = inpaint_box(img, (60, 0, 400, 400))  # lata de 7up
img = highlights_down(img, 30)
save(img, "pr-card-pollo-espinaca.jpg", 800, 1000)

# 19. ESPINACA sola
step("espinaca")
img = load("702589856_17901415671430342_3049656758253430682_n.jpg")
img = denoise(img, 5)
img = crush_blacks_neutral(img, 29)
img = desat_hue_range(img, 35, 85, 0.9)
save(img, "pr-card-espinaca.jpg", 800, 1000)

# 20. POLLO
step("pollo")
img = load("702670242_17901415689430342_6951469104016332054_n.jpg")
img = crush_blacks_neutral(img, 29)
img = upscale2x(img)
save(img, "pr-card-pollo.jpg", 800, 1000)

step("DONE")
print("total", round(time.time() - t_start), "s")
