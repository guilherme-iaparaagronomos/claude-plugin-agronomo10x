<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# Trechos de código (numpy, scipy e GDAL — o que o Python do QGIS tem)

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

**Gravar feições com tipos Python e conferir**

```python
def py(v):
    if isinstance(v, np.integer): return int(v)
    if isinstance(v, np.floating): return float(v)
    return v
# f.setAttributes([py(v) for v in valores])
# depois de gravar no GPKG, reabra a camada e confira: camada.featureCount() == len(feicoes)
```
