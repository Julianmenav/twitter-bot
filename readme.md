Bot de twitter el cual tiene una lista de seguimiento de streamers de LOL.
2 Funciones:
  -Cuando es invocado devuelve stats del streamer.
  -Cada hora/media hora, selecciona un streamer de la lista y tweetea sus stats.

La regla para decidir si un streamer es valido para twitear (cada media hora):
-No debe de estar en partida actualmente
-Debe haber jugado una partida en las últimas 2 horas.
-Debe haber jugado almenos 6 partidas en las últimas 12 horas.


Pruebas usando @poofrek.

Cuando alguien tweetee un mensaje en el que ponga @poofrek y @RankedStatsES, devuelve info:

--------------------------------------------------------
Parece que @javierlol está en la poochiqeue

Cuenta: ChicoRebelde
-13 LPs en las últimas 12 horas. 
(4 victorias 5 derrotas)
Rank: Diamante II 23 LPs
---------------------------------------------------------

-Crear el Objeto con {@: lista de cuentas}
-Detector de menciones.
-busca el @en la lista. Si no está responde: "No le sabe 😔"
-Busca información de la cuenta que esté emparejada (LPs actuales, victorias y derrotas las últimas 12 horas. cuantos lps de diferencia?)

Ahora mismo:
[X] La función para sacar información del jugador debe usar puuid en lugar del nombre de invocador. Este último nunca debe usarse para buscar en la api ya que puede cambiar.
[X] Añadir un número de horas en las que buscar (Pasar eso a unix: unix hoy - unix numero horas.)
[X] Tweet para cuando falla el nombre.
[X] Conseguir la diferencia de LPs aunque sea con scraping.
[X] Hacer la lista completa de participantes.
[X] Funciona perfecto el tweet manual, sea cual sea el @.
[] Detector de menciones y respuesta.
[X] Controlar todas las exceptions.
[] Para evitar llamadas innecesarias a la api. Habría alguna forma de comprobar que ha jugado partidas suficientes con una sola llamada?
[] Crear frases según el winrate y numero de partidas. 
[] Si está en 100 puntos añadir un esquema de la promo 🟥🟩🟩🟥⬜.
[] En accounts, todos los nombres deberían estar escritos en minuscula. Cuando se busque se hará en minuscula y se twiteara asi tambien.
[X] Matchear el array de partidas con los LPs para ver si concuerdan. Solo enseñar LPs si concuerdan.