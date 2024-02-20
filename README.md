<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI intalado
```
npm i -g @nestjs/cli
```
4. Levantar base de datos
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
```
npm run start:dev
```

8. reconstruir la Base de Datos con la semilla
```
http://localhost:3000/api/seed
```

## Stack usado
* MongoDB
* Nest