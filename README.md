# Prueba tecnica turbotraffic
* Aplicacion de frontend hecha en next con proteccion de rutas 
* Aplicacion de backend hecha con nest con ruta de registro, login, rutas protegidas, lista de usuarios

## Para correr el frontend
```
npm i
npm run build && npm start
```


# Para correr las pruebas unitarias

```
npm run test 
```


Las rutas de acceso al frontend son:

Ruta raiz:  [http://localhost:3000/login](http://localhost:3000/login)

Ruta registro:  [http://localhost:3000/register](http://localhost:3000/register)

Ruta dashboard:  [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

Ruta dashboard para usuario admin:  [http://localhost:3000/dashboard/admin](http://localhost:3000/dashboard/admin)

## Para correr el backend
```
npm run build && npm start
```

## Para correr el backend con docker
```
docker-compose up -d 
```