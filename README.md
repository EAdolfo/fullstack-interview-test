# fullstack-interview-test
Interview test for fullstack Software Engineers

## Hola!
Comparto la información sobre como correr el proyecto, tanto frontend como backend.
Lo que contiene cada carpeta dentro del proyecto es lo siguiente:
-- GitProyect --> se refiere al ambiente virtual con los paquetes necesarios para el backend, este esta en python 3.7.
-- Gitbackend --> es todo el backend del proyecto, dentro de este se encuantra el archivo requirements.txt con todas las paqueterias necesarias para correr el backend.
-- Gitfrontend --> es todo el frontend en Angular CLI 7.0.6, Node js 13.5.0 y TypeScript 3.7.8

## Instalación

Para correr el backend es necesario activar el ambiente virtual (en una terminal dentro del directorio GitProyect escribir el siguiente comando: source bin/activate) que adjunto aqui mismo o crear un ambiente viertual para python 3.7 e instalar las paqueterías que se encuentrar dentro del archivo requirements.txt con el comando pip install -r requirements.txt

Para correr el frontend es necesario tener instaldo Node js, para que no haya conflicto de version recomiendo utilizar Node js 13.5.0 (pagina oficial de descarga: https://nodejs.org/en/download/), también es necesario instalar Angular cli con el siguiente comando dentro de una terminal: npm install @angular/cli, igual recomiendo para que no haya errores de versiones instalar la version de angular cli 7.0.6.

## Iniciar proyecto
Una vez instalado tanto paqueterias como programas.
Dentro de una terminal y con el entorno virtual activado para correr el backend es necesario estar dentro del directorio Gitbakend y después escribir el siguiente comando: python manage.py runserver (es necesario que la url del backend este de la siguiente forma: http://127.0.0.1:8000/, no con localhost) para poder acceder a la base de datos se tiene que crear un superusuario, para la persona que desea ingresar al admin (http://127.0.0.1:8000/admin/) y no este registrado deberá darse de alta con el siguiente comando python manage.py createsuperuser donde se pedirá un nombre al usuario y contraseña para crear el usuario dentro de la base de datos.

Dentro de una nueva terminal se debe estar dentro del directorio Gitfrontend y escribir el siguiente comando: ng serve -open, una vez el programa compile este abrira una ventana del navegador con el proyecto, el puerto que debe tener el frontend es el 4200 (http://127.0.0.1:4200/).

Una vez ambos proyectos se encuentre "corriendo" se pueden comunicar el uno con el otro mediante las api correspondientes.

## Base de datos
La base de datos la adjunto al correo donde se me hizo llegar esta prueba por si es necesaria, de lo contrario al correr el proyecto se debe crear una base de datos nueva.
Esta debe estar dentro del directorio Gitbackend.
Dentro de la base de datos viene el token necesario para hacer los pull requests.
Este token caduca a los 7 días.
De ser necesario otro token este debe ser cargado en la base de datos dentro del modelo GitToken.


## Despedida
Agradezco tanto la oportunidad como el desafío. 
Quedo atento a cualquier duda o comentario.
