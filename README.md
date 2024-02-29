## Hacienda App
---------

¡Hola developer! 👋🏻 Hacienda App es la aplicación oficial para el [Club de Golf La Hacienda](https://clubdegolflahacienda.com/).

![Club de Golf La Hacienda](https://www.clubdegolflahacienda.com/images/captura%20de%20pantalla%202019-07-30%20a%20las%20112255.png?crc=467674511 "Club de Golf La Hacienda")

### Links oficiales a las tiendas.
--------

* Google Play Store: [https://apps.apple.com/mx/app/cgh/id1643970785?l=en-GB](https://apps.apple.com/mx/app/cgh/id1643970785)
* Apple AppStore: [https://apps.apple.com/mx/app/cgh/id1643970785](https://apps.apple.com/mx/app/cgh/id1643970785)


### Stack Tecnológico
A continuación presentamos la lista de las tecnologías utilizadas para su construcción.

| Tecnología | Versión |
| :------------| :----------- |
| <span style="color:grey">NodeJs</span>| 18.18 |
| <span style="color:grey">React</span>| 18.1.0 |
| <span style="color:grey">Native Base</span>| 3.4.23 |
| <span style="color:grey">React Native</span>| 0.70.5 |
| <span style="color:grey">Redux</span>| 4.1.0 |
| <span style="color:grey">Expo</span>| 47.0.0 |

> Nota: Si deseas conocer el detalle de las librerías te invitamos a consultar el archivo [package.json](https://bitbucket.org/grupohiuman/hacienda-app/src/master/package.json)

### Instalación
Para poder correr el proyecto siga los siguientes pasos.

```bash
$ nvm use 18.18 # utilizamos versión 18.18 de Node
$ yarn. # instalamos dependencias con yarn
$ npm install -g expo-cli # instalamos el CLI 

# Ahora ejecutamos el proyecto: 
# Si deseamos levantarlo en el flavor La hacienda ejecutamos: 
$ APP_ENV=clublahacienda npx expo start

# Si deseamos probar en flavor La Ceiba ejecutamos: 
$ APP_ENV=laceiba npx expo start
```

### Compilación para iOS
Para poder correr el proyecto siga los siguientes pasos.
# TODO: actualizar esta sección para saber los nuevos pasos para compilar con flavors.
```bash
$ npm install --global eas-cli. # Instalamos CLI de eas
$ eas build --profile production_ios. # para compilar en iOS
```

>Nota: 
> - Es importante tener a la mano nuestras credenciales de la cuenta de Apple ID que tiene acceso a esa App, en mi caso fue alexdzul@me.com.
> - Instalar [Transporter](https://apps.apple.com/mx/app/transporter/id1450874784) para convertir el archivo .ipa y subirlo directo a la cuenta de Apple.


### Compilación para Android
Para poder correr el proyecto siga los siguientes pasos.

```bash
$ npm install --global eas-cli. # Instalamos CLI de eas. -> Nota: Si no está instalado
$ eas build --profile production_android. # para compilar en iOS
```

### Actualización de SDK 46 a SDK 47

Debido a las actualizaciones tanto de Apple como Google en sus sistemas operativos fue requerida la actualización del SDK a la versión 47. El día 7 de Junio 2026 en el commit [b054d95](https://bitbucket.org/grupohiuman/hacienda-app/commits/b054d9510834cc7c04a077d32649fbc6619dc4cf) fueron realizadas las actualizaciones necesarias a dependencias para poder compilar el proyecto con la versión 47 de Expo SDK. Los pasos ejecutados fueron: 

```bash
$ expo-cli upgrade. # Aquí te pregunta si confirmas que deseas hacer el upgrade. Nota: Por default querrá actualizarte a la versión 48, le decimos que "NO" y elegimos la versión 47. 
$ npx expo-doctor  # Este comando valida que no hayan posibles errores, Nota: Lo ejecutamos, nos dió un warning pero no le hicimos caso. 

# ahora corrimos el proyecto para ver si todo estaba OK. 
$ APP_ENV=expo expo start

# Probamos en iOS iPhone 14 todas las funcionalidades y 
# al parecer no se afectó ninguna funcionalidad.
```


### Historial de versiones. 

Si desea conocer el histórico detallado de las versiones que han sido publicadas por favor consulte el archivo [CHANGELOG.md](https://bitbucket.org/grupohiuman/hacienda-app/src/master/CHANGELOG.md).

***Made with 💜 by [Hiumanlab](https://www.hiumanlab.com)***