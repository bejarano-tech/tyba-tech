# Tyba Prueba Técnica Backend

Prueba técnica Backend Developer para Tyba.

# Endpoints

- /signin - POST (email, password)
- /signup - POST (email, password)
- /transactions - GET (protected)
- /geocoding - POST (protected)


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
  port: [the port of the server],
  secret: [secret word for JWT]
};

```

Iniciar con Docker:

```
docker-compose up
```

