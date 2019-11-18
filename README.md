# Tyba Prueba Técnica Backend

Prueba técnica Backend Developer para Tyba.

# Endpoints

- /signin - POST (email, password) ---> Retorna el token que debe ir como header authorization en los request protegidos
- /signup - POST (email, password) ---> Crea un usuario y retorna el token que debe ir como header authorization en los request protegidos
- /transactions - GET (protected)
- /geocoding - POST (city || latitude, longitude) (protected) ---> Requiere header 'authorization' con el token devuelto al hacer login


# Iniciar:

Descargue el repositorio e instale todas las dependencias.

```
git clone https://github.com/bejarano-tech/tyba-tech.git
cd tyba-tech
npm install
```

Configure el servidor


```
touch config.js

# La configuración debe ser algo así:

module.exports = {
  google_api_key: [your api key],
  secret: [secret word for JWT]
};

```

Iniciar con Docker:

```
docker-compose up
```

