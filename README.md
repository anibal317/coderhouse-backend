
![Logo](https://static.wixstatic.com/media/54b904_b602133d7264469eaed5083d62913cee~mv2.gif)

# Trabajo practico final

> Se tarta de un ecommerce, donde no sólo se puede realizar compras, sino que también cuenta con un servicio de Chat para comunicarse directamente con los propios vendedores para que puedan asesorarte de la mejor manera.

<br>
<br>

# Instalacion
>Ejecutar los siguietnes comandos para inicializar el repo

<br>

## Clonar el repositorio
```bash
    git clone git@github.com:anibal317/coderhouse-backend.git
```
<br>

## Instalar dependencias
>Los siguientes comandos permitiran inicializar el repor con todas sus dependencias
```bash
  npm i
  cd Tp-final
```
<br>

## Iniciar el servidor
```bash
  npm run start
```

<br>
<br>

# Inicialización de datos
## Crear la Base de datos general
```bash
npx knex migrate:up
```
<br>

## Actualizar los archivos de datos
```bash
npx knex migrate:latest
```
<br>

## Eliminar la ultima migration
```bash
npx knex migrate:down
```
<br>

## Crear data mock
```bash
npx knex seed:run
```

<br>
<br>

# Ver otros comandos
## Documentación Oficial de knex
[Knex](https://knexjs.org/guide/migrations.html#migration-cli)

<br>
<br>

# Documentation
## Usuarios

|    userName     |  Pass | Es admin | 
| --------------- |  ---- | -------- |
| admin@admin.com | admin |    Si    |

<br>
<br>

# Variables de Entorno 
<details><summary>Ver</summary> 
<p> 

    `PASSWORD` = "password"

    `TOKEN`="token" 

    `SERVER_PORT`=8080

    `MESSAGE_SERVER_PORT`=3000

</p>
</details>
