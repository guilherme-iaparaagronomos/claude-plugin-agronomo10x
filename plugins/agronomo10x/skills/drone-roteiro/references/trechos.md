<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão b133424b) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# Trechos de código (numpy, scipy e GDAL — o que o Python do QGIS tem)

**Otsu sem scikit-image**

```python
import numpy as np
def otsu(x, nb=256):
    x = x[np.isfinite(x)]
    h, e = np.histogram(x, bins=nb); c = (e[:-1] + e[1:]) / 2
    w0 = np.cumsum(h); w1 = w0[-1] - w0
    m0 = np.cumsum(h * c) / np.maximum(w0, 1)
    m1 = (np.sum(h * c) - np.cumsum(h * c)) / np.maximum(w1, 1)
    return float(c[np.argmax(w0 * w1 * (m0 - m1) ** 2)])
```

**Ler um bloco reduzido, sem estourar o raster**

```python
from osgeo import gdal
def ler_bloco(ds, x0, y1, lado_m, px_saida):
    gt = ds.GetGeoTransform()
    c0 = max(0, int((x0 - gt[0]) / gt[1])); r0 = max(0, int((gt[3] - y1) / -gt[5]))
    n = int(lado_m / gt[1])
    nc = min(n, ds.RasterXSize - c0); nr = min(n, ds.RasterYSize - r0)
    if nc <= 0 or nr <= 0: return None
    m = max(1, int(lado_m / px_saida))
    a = ds.ReadAsArray(c0, r0, nc, nr, buf_xsize=max(1, int(m * nc / n)), buf_ysize=max(1, int(m * nr / n)),
                       resample_alg=gdal.GRIORA_Average).astype('float64')
    assert a.ndim == 3 and a.shape[1] > 0 and a.shape[2] > 0
    return a  # (bandas, linhas, colunas)
```

**Gravar feições com tipos Python e conferir**

```python
def py(v):
    if isinstance(v, np.integer): return int(v)
    if isinstance(v, np.floating): return float(v)
    return v
# f.setAttributes([py(v) for v in valores])
# depois de gravar no GPKG, reabra a camada e confira: camada.featureCount() == len(feicoes)
```

**Pareamento um a um com tolerância**

```python
from scipy.optimize import linear_sum_assignment
from scipy.spatial.distance import cdist
def parear(det, ref, tol):
    if len(det) == 0 or len(ref) == 0: return 0, len(det), len(ref)
    D = cdist(det, ref); D = np.where(D <= tol, D, 1e6)
    i, j = linear_sum_assignment(D); tp = int((D[i, j] <= tol).sum())
    return tp, len(det) - tp, len(ref) - tp   # TP, FP, FN
```

**Núcleo do v3 numa linha**

(M = perfil a cada 0,05 m, já suavizado)
```python
from scipy.signal import find_peaks
du = 0.05; th = max(0.05, t2)
pk, _ = find_peaks(M, height=th, distance=max(1, round(0.1 / du)))
falhas = []
for a, b in zip(pk[:-1], pk[1:]):            # só entre plantas: pontas não contam
    if (b - a) * du <= 0.5: continue
    low = np.where(M[a:b + 1] < t2)[0]
    if len(low) == 0: continue               # sem solo exposto entre elas
    ini = (a + low[0]) * du - du / 2; fim = (a + low[-1]) * du + du / 2
    # float() já aqui: np.float64 não grava na camada (erro da camada vazia)
    falhas.append((float(ini), float(fim), float(fim - ini), float((b - a) * du)))  # ini_m, fim_m, comp_solo_m, dist_plantas_m
```
