/*
*****************************************************************************************************
-----------------------Metodo encargado de guardar la informacion procesada al DOM-------------------
*****************************************************************************************************
*/
const loadAtHtml = (text, node) => {
    if (!node || !text)
        return;
    node.innerHTML = "<textarea rows=\"10\" readonly=\"true\">" + text + "</textarea>";
}

/*
    Metodo que devuelve la suma de todos los numeros hasta el number.
*/
const getSum = number => {
    if (isNaN(number)) return 0;
    return number * (number + 1) / 2;
}

/*
    Metodo que devuelve la posicion del primer numero impar que encuentra correspondiente al siguiente patron:
   -1-  --2--   -----3----  -------4------  ---------5--------
    1   3   5   7   9   11  13  15  17  19  21  23  25  27  29  ...
*/
const getStart = number => {
    number = parseInt(number);
    if (isNaN(number)) return 0;
    const position = getSum(number - 1) + 1;
    return position;
}

/*
    Metodo que devuelve un array paralelo a un diccionario con el siguiente esquema:
    dict = {
        key1: value1,
        key2: value2,
        key3: value3
    }
    array = [key2,key3,key1]

    -->El valor de retorno es un array con los valores del diccionario
    con la misma estructura del diccionario

    result = [value2,value3,value1]
*/
const getParallelArray = (array, dict) => {
    return array.map(key => dict[key]);
}

/*
    Metodo que devuelve un string representando la suma de numeros impares representando la cantidad del numero del parametro al cubo
*/
const getCubicOdds = number => {
    let sum = "";
    number = parseInt(number); //Nos aseguramos que sea un numero

    const start = getStart(number);
    const end = start + number;

    for (let n = start; n < end; n++)
        sum += (2 * n - 1).toString() + "+";

    sum = sum.slice(0, -1);//Elimina el ultimo + innecesario
    return sum;
}

/*
    Metodo que devuelve un diccionario cargado con la informacion de los dos array con KEY=originArray y VALUE=destArray
    -->Pre condicion: Ambos arrays deben contener la misma longitud.
*/
const getDictArray = (originArray, destArray) => {
    const dict = {};
    originArray.slice().sort().map((key, index) => dict[key] = destArray.slice().sort()[index]);
    //Ordenamos ambos arrays y los cargamos (El metodo slice es para que no mute el array a su ordenado)
    return dict;
}

/*
*****************************************************************************************************
        Cada tarea tiene su propia descripcion y sus propias validaciones para directamente
                        cargarlas en el elemento respuesta del DOM
*****************************************************************************************************
*/

const loadTask1 = (task, resp) => {

    //Proceso de extraccion de la informacion
    const inputNumbers = task.value.split(",").filter(exists => exists && !isNaN(exists) && exists >= 1 && exists <= 100);

    //Logica de la tarea
    let response = inputNumbers.map(number => getCubicOdds(number)).filter(number => number);
    if (Array.isArray(response) && response.length > 0)
        response = response.reduce((prev, cur) => prev + "\n\n" + cur);

    //Ejecucion de la tarea
    loadAtHtml(response, resp);
}

const loadTask2 = (task, resp) => {

    //Proceso de extraccion de la informacion
    const inputNumbers = task.value.split(";").filter(exists => exists);
    const [firstNumbers, secondNumbers] = inputNumbers.map(
    numbers => numbers.split(",")                        //Realizamos separacion por ,  
                      .map(number => parseInt(number))   //Realizamos conversion a enteros
                      .filter(number=>!isNaN(number)));  //Realizamos validacion de caracteres validos

    if(firstNumbers.length!=secondNumbers.length) 
        return; //Se garantiza que no se cargue nada si no cumple la condicion de igualdad en informacion

    //Logica de la tarea
    const dictNumbers = getDictArray(firstNumbers, secondNumbers);
    const response = getParallelArray(firstNumbers,dictNumbers).reduce((prev,curr)=>prev+" "+curr);
    
    //Ejecucion de la tarea
    loadAtHtml(response, resp);
}

const loadTask3 = (task, resp) => {
    const inputNumbers = task.value;
    const response = inputNumbers;
    loadAtHtml(response, resp);
}

/*
*****************************************************************************************************
        Por cada tarea que se ejecuta tiene asociado un elemento del DOM para obtener los datos
                        de entrada y otro donde se presentara la respuesta
*****************************************************************************************************
*/

const task1 = () => {
    const $task1 = document.getElementById("task1");
    const $resp1 = document.getElementById("resp1");
    loadTask1($task1, $resp1);
}

const task2 = () => {
    const $task2 = document.getElementById("task2");
    const $resp2 = document.getElementById("resp2");
    loadTask2($task2, $resp2);
}
const task3 = () => {
    const $task3 = document.getElementById("task3");
    const $resp3 = document.getElementById("resp3");
    loadTask3($task3, $resp3);
}

/*
*****************************************************************************************************
----------------Metodos que detectan que se oprimio Enter y se debe ejecutar su tarea----------------
*****************************************************************************************************
*/
document.getElementById("task1").addEventListener("keyup", ({ key }) => { if (key == "Enter") task1(); });

document.getElementById("task2").addEventListener("keyup", ({ key }) => { if (key == "Enter") task2(); });

document.getElementById("task3").addEventListener("keyup", ({ key }) => { if (key == "Enter") task3(); });
