# Secuela - prototipo Phaser

Prototipo rustico para probar habitaciones topdown sin disparos.
Ahora incluye un item levantable, inventario simple y una puerta cerrada que se
desbloquea con llave. Tambien tiene enemigos simples que persiguen al jugador
si se acerca y bajan vida al tocarlo. Los enemigos conservan su posicion al salir
y volver a entrar a la habitacion. El mapa ya tiene una bifurcacion vertical
desde el pasillo bloqueado hacia un deposito y una sala de generador. El complejo
empieza semi a oscuras hasta activar el generador con un fusible.

## Como probarlo

Doble click en `iniciar-prototipo.bat`.

Tambien se puede abrir desde un servidor local en `http://127.0.0.1:5173`.

## Controles

- WASD / flechas: mover
- Barra espaciadora: usar puerta cercana
- Barra espaciadora: agarrar item cercano
- Q: usar medikit
- Click izquierdo: disparar
- R / click derecho: recargar
- G: guardar partida
- C: cargar partida
- M: abrir/cerrar mapa
- I: abrir/cerrar inventario

## Idea del prototipo

El juego usa una sola escena y cambia de habitacion con datos. Cada pantalla puede
convertirse mas adelante en un fondo 800x600, pero por ahora son rectangulos
simples para validar el flujo.

## Archivos principales

- `src/game.js`: logica de la escena y sistemas del prototipo
- `src/inventory.js`: menu de inventario y descripciones de items
- `src/rooms.js`: datos de habitaciones, puertas, items y enemigos
- `src/constants.js`: tamanio del juego y colores base
- `src/enemyTypes.js`: colores y tamanios por tipo de enemigo
- `src/saveSystem.js`: estado inicial, normalizacion y guardado local
