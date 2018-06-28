
# Fuzzy-Search

Se ha implementado una busqueda difusa mediante el algoritmo Hamming Distance. [https://en.wikipedia.org/wiki/Hamming_distance]

 
**Razón del uso:**

 - Fácil implementación.
 - En el algoritmo no necesita mas memoria de la que ya se ha utilizado en el flujo del programa para poder determina una distancia.
 - Es un algoritmo lineal, ya que solo recorre hasta la longitud n de la palabra a buscar.
 
**Instrucciones.**  
 - Clonar el repo
>git clone -b develop git@github.com:emaldonadoc/fuzzy-search.git
-	Instalar dependencias
> npm install ó npm i
-	Compilar el proyecto y poder utilizar el CLI
> npm run build
> cd dist/
>./cli.js [option] [data]
>./cli.js list
>./cli.js add {'name':'Juan Perez'}
>./cli.js search {'name':'Juan'}

**Correr Pruebas**
-	Si se quiere ejecutar todo el set de pruebas
> npm run test

-	Visualizar el coverage
> npm run coverage
