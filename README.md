# 🏋️ Fitness Factory Gym — Sitio Web

Sitio web completo con chatbot IA integrado para Fitness Factory Gym.

---

## 📁 Estructura del proyecto

```
fitness-factory/
├── index.html                  ← Página web principal
├── netlify.toml                ← Configuración de Netlify
├── netlify/
│   └── functions/
│       └── chat.js             ← Backend seguro del chatbot
└── README.md
```

---

## 🚀 Cómo publicar en Netlify (paso a paso)

### PASO 1 — Obtener tu API Key de Anthropic

1. Ve a **https://console.anthropic.com**
2. Crea una cuenta gratuita (si no tienes)
3. En el menú izquierdo → **"API Keys"** → **"Create Key"**
4. Copia la clave (empieza con `sk-ant-...`)
5. **Guárdala en un lugar seguro**, solo la verás una vez

---

### PASO 2 — Subir el proyecto a Netlify

1. Ve a **https://netlify.com** y crea una cuenta gratuita
2. En el panel principal haz clic en **"Add new site"**
3. Selecciona **"Deploy manually"**
4. **Comprime toda esta carpeta** `fitness-factory/` en un archivo ZIP
5. Arrastra el ZIP a la zona de Netlify
6. ¡Tu sitio ya está publicado! (con una URL como `random-name.netlify.app`)

---

### PASO 3 — Configurar la API Key (para activar el chatbot)

1. En Netlify, entra a tu sitio → **"Site configuration"**
2. En el menú lateral → **"Environment variables"**
3. Haz clic en **"Add a variable"**
4. Pon exactamente:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** (pega tu clave que copiaste en el Paso 1)
5. Haz clic en **"Save"**
6. Ve a **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
7. ¡El chatbot ya funciona! ✅

---

### PASO 4 (Opcional) — Conectar tu propio dominio

1. Compra un dominio en **namecheap.com** (ej: `fitnessfactorygym.mx` ~$150 MXN/año)
2. En Netlify → **"Domain management"** → **"Add a domain"**
3. Sigue las instrucciones para apuntar tu dominio a Netlify
4. Netlify da HTTPS gratis automáticamente ✅

---

## 💰 Costos aproximados

| Servicio | Costo |
|----------|-------|
| Netlify (hosting) | **Gratis** |
| API de Anthropic | ~$0.01–0.05 USD por conversación |
| Dominio .mx | ~$150 MXN / año (opcional) |

La API de Anthropic cobra por uso. Con el tráfico normal de un gym, el costo mensual sería de menos de $5 USD.

---

## 🛟 Soporte

Si tienes dudas sobre la configuración, contacta a tu desarrollador o escríbele a Claude en claude.ai
