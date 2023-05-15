
![Logo](https://static.wixstatic.com/media/54b904_b602133d7264469eaed5083d62913cee~mv2.gif)

# Trabajo practico final

> Se tarta de un ecommerce, donde no sólo se puede realizar compras, sino que también cuenta con un servicio de Chat para comunicarse directamente con los propios vendedores para que puedan asesorarte de la mejor manera.


# Instalacion
>Ejecutar los siguietnes comandos para inicializar el repo



## Clonar el repositorio
```bash
    git clone git@github.com:anibal317/coderhouse-backend.git
```

## Instalar dependencias
>Los siguientes comandos permitiran inicializar el repor con todas sus dependencias
```bash
  npm i
  cd Tp-final
```


## Iniciar el servidor
```bash
  npm run start
```



# Inicialización de datos
## Crear la Base de datos general
```bash
npx knex migrate:up
```


## Actualizar los archivos de datos
```bash
npx knex migrate:latest
```


## Eliminar la ultima migration
```bash
npx knex migrate:down
```


## Crear data mock
```bash
npx knex seed:run
```



# Ver otros comandos
## Documentación Oficial de knex
[Knex](https://knexjs.org/guide/migrations.html#migration-cli)



# Documentation
## Usuarios

|    userName     |  Pass | Es admin | 
| --------------- |  ---- | -------- |
| admin@admin.com | admin |    Si    |



# Variables de Entorno 
<details><summary>Ver</summary> 
<p> 

    `PASSWORD` = "password"

    `TOKEN`="token" 

    `SERVER_PORT`=8080

    `MESSAGE_SERVER_PORT`=3000

</p>
</details>
