<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# Trechos de código (numpy, scipy e GDAL — o que o Python do QGIS tem)

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
