//Las coordenadas serán polares o cartesianas
let coordenadas = document.getElementsByName("coordenadas");
for (var i = 0; i < coordenadas.length; i++) {
    coordenadas[i].addEventListener("change", actualizar_datos);
}
let coords_cartesianas = true;
//Desea agregar una nueva coordenada
let nuevo = document.getElementById("nuevo");
nuevo.addEventListener("click", nuevo_dato);
//Convierte las coordenadas de catesianas a polares y viceversa
let convertir = document.getElementById("convertir");
convertir.addEventListener("click", convertir_datos);
//Obtener los datos a ingresar
let datos = document.getElementsByClassName("dato");
//Lista de coordenadas registradas
let coords = [];
//Texto para señalar los datos que va a ingresar
let estructura = document.getElementsByClassName("estructura");
actualizar_datos();
//Obtengo los botones para poder reaizar operaciones
let operacion = document.getElementsByClassName("operacion");
//Respuesta de i^n
let i_exp_res = document.getElementById("exponente");
i_exp_res.addEventListener("change", exponente);
exponente();

//Actualiza la información que aparece en pantalla
function actualizar_datos() {
    //Informa como se registrará el siguente dato
    if (coordenadas[0].checked) {
        estructura[0].innerHTML = " (número real)";
        estructura[1].innerHTML = " (número complejo)";
    } else {
        estructura[0].innerHTML = " (módulo)";
        estructura[1].innerHTML = " (ángulo)";
    }
    //Muestra los datos registrados
    let coords_texto = "Lista de coodenadas ";
    if (coords_cartesianas) {
        coords_texto += "cartesianas:<br>";
        for (let i = 0; i < coords.length; i++) {
            coords_texto += '<input type="checkbox" onclick="datos_calcular()" class="check" ';
            coords_texto += coords[i][2] ? "checked" : "";
            coords_texto += "/>(" + coords[i][0] + ") + (" + coords[i][1] + ")i<br>";
        }
    } else {
        coords_texto += "polares:<br>";
        for (let i = 0; i < coords.length; i++) {
            coords_texto += '<input type="checkbox" onclick="datos_calcular()" class="check" ';
            coords_texto += coords[i][2] ? "checked" : "";
            coords_texto += "/>(" + coords[i][0] + " (cos(" + coords[i][1] + "°) + i sen(" + coords[i][1] + "°))<br>";
        }
    }
    document.getElementById("coords").innerHTML = coords_texto;
    //Texto del bóton
    convertir.value = coords_cartesianas ? "Convertir a polares" : "Convertir a cartesianas";
}

//Registra un nuevo dato y convirte los existentes a el nuevo sistema de coordenadas
function nuevo_dato() {
    //n de nuevo
    let n = [];
    //Se guardarán como coordenadas cartesianas
    if (coordenadas[0].checked) {
        //Si los valores estaban guardados como coordenadas polares
        if (!coords_cartesianas) {
            polares_cartesianas();
            coords_cartesianas = true;
        }
    } else {
        //Si los valores estaban guardados como coordenadas cartesianas
        if (coords_cartesianas) {
            cartesianas_polares();
            coords_cartesianas = false;
        }
    }
    //Obtengo los nuevos números
    n.push(parseFloat(datos[0].value));
    n.push(parseFloat(datos[1].value));
    n.push(false);
    //Guardo los datos en la lista
    coords.push(n);
    //Actualizo la información de la pantalla
    actualizar_datos();
}

//Convierte la lista de un sistema de coordenadas al otro
function convertir_datos() {
    //Si son coordenadas cartesianas pasarlas a polares y viceversa
    if (coords_cartesianas) {
        cartesianas_polares();
        coords_cartesianas = false;
    } else {
        polares_cartesianas();
        coords_cartesianas = true;
    }
    //Actualizo la información de la pantalla
    actualizar_datos();
}

//Cambia el valor de los datos a calcular
function datos_calcular() {
    let checkbox = document.getElementsByClassName("check");
    for (let i = 0; i < coords.length; i++) {
        coords[i][2] = checkbox[i].checked;
    }
}

//Convirte los datos registrados de coordenadas cartesianas a polares
function cartesianas_polares() {
    for (let i = 0; i < coords.length; i++) {
        //n de nuevo
        let n = [];
        //Convirte el dato del número real en el dato del módulo
        n[0] = calcular_modulo(coords[i][0], coords[i][1]);
        //Convirte el dato del número complejo en el dato del ángulo
        n[1] = calcular_angulo(coords[i][0], coords[i][1]);
        //Evito perder la opcion de mostrar
        n[2] = coords[i][2];
        //Guardo los nuevos datos
        coords[i] = n;
    }
}

//Convierte un dato de coordenadas cartesianas a polares
function cartesiana_polar(x1, x2) {
    //n de nuevo
    let n = [];
    //Convirte el dato del número real en el dato del módulo
    n[0] = calcular_modulo(x1, x2);
    //Convirte el dato del número complejo en el dato del ángulo
    n[1] = calcular_angulo(x1, x2);
    return n;
}

//Convirte los datos registrados de coordenadas cartesianas a polares
function polares_cartesianas() {
    for (let i = 0; i < coords.length; i++) {
        //n de nuevo
        let n = [];
        //Convirte el dato del módulo en el dato del número real
        n[0] = calcular_real(coords[i][0], coords[i][1]);
        //Convirte el dato del ángulo en el dato del número complejo
        n[1] = calcular_complejo(coords[i][0], coords[i][1]);
        //Evito perder la opcion de mostrar
        n[2] = coords[i][2];
        //Guardo los nuevos datos
        coords[i] = n;
    }
}


//Convierte un dato de coordenadas polares a cartesianas
function polar_cartesiana(x1, x2) {
    //n de nuevo
    let n = [];
    //Convirte el dato del módulo en el dato del número real
    n[0] = calcular_real(x1, x2);
    //Convirte el dato del ángulo en el dato del número complejo
    n[1] = calcular_complejo(x1, x2);
    return n;
}

//Calcula el módulo
function calcular_modulo(x, y) {
    return Math.sqrt(x * x + y * y);
}

//Calcula el ángulo
function calcular_angulo(x, y) {
    //La variable arco_tan será la que obtenga el ángulo resultante
    let arco_tan = 0;
    //Si el valor de x (o número real) es 0 nos daría un error al dividir por eso se calcula manualmente
    if (x !== 0) {
        //Se calcula el valor del arco tangente (la función lo calcula en radianes)
        arco_tan = Math.atan(y / x);
        //Se corrige el radian resultante dependiendo del cuadrante dado por las coordenadas cartesianas
        if (x < 0) {
            arco_tan += Math.PI;
        } else if (x > 0 && y < 0) {
            arco_tan += 2 * Math.PI;
        }
        //Se convierte de radianes a grados
        arco_tan *= 180 / Math.PI;
    } else {
        //Si la parte real es 0 se determina el ángulo dependiendo de si el número complejo esta debajo de 0 o por encima
        if (y < 0) {
            arco_tan = 270;
        } else {
            arco_tan = 0;
        }
    }
    return arco_tan;
}

//Calcula el número real
function calcular_real(x, y) {
    //Convierte el valor de grados a radianes (ya el la función coseno recibe un radian como valor de entrada)
    y *= Math.PI / 180;
    return x * Math.cos(y);
}

//Calcula el número complejo
function calcular_complejo(x, y) {
    //Convierte el valor de grados a radianes (ya el la función seno recibe un radian como valor de entrada)
    y *= Math.PI / 180;
    return x * Math.sin(y);
}

//Realizar operaciones
function operar() {
    let res = document.getElementById("resultado");
    res.innerHTML = "";
    let coords_polares = !coords_cartesianas;
    let x1;
    let x2;
    //Suma = Z1+Z2+Z3
    if (operacion[0].checked) {
        x1 = 0;
        x2 = 0;
        //Se convierte en coordenadas cartesianas (ya que asi solo toca sumar los números reales con los reales y los complejos con los complejos)
        if (coords_polares) convertir_datos();
        for (let i = 0; i < coords.length; i++) {
            if (coords[i][2]) {
                x1 += coords[i][0];
                x2 += coords[i][1];
            }
        }
        //Si se estaba trabajando con coordenadas polares devuelve la conversion
        if (coords_polares == coords_cartesianas) convertir_datos();
        res.innerHTML += "Suma: ";
        //Resultado dependiendo de que sistema de coordenadas se este trabajando
        if (coords_cartesianas) {
            res.innerHTML += "(" + x1 + ") + (" + x2 + ")i<br>";
        } else {
            let conversion = cartesiana_polar(x1, x2);
            res.innerHTML += "(" + conversion[0] + " (cos(" + conversion[1] + "°) + i sen(" + conversion[1] + "°))<br>";
        }
    }
    //Resta = Z1-Z2-Z3
    if (operacion[1].checked) {
        x1 = 0;
        x2 = 0;
        let primero = true;
        //Se convierte en coordenadas cartesianas (ya que asi solo toca restar los números reales con los reales y los complejos con los complejos)
        if (coords_polares) convertir_datos();
        for (let i = 0; i < coords.length; i++) {
            //Se hace esto para tener el primer valor positivo y no restarlo con nada
            if (coords[i][2] && primero) {
                x1 += coords[i][0];
                x2 += coords[i][1];
                primero = false;
            } else if (coords[i][2]) {
                x1 -= coords[i][0];
                x2 -= coords[i][1];
            }
        }
        //Si se estaba trabajando con coordenadas polares devuelve la conversion
        if (coords_polares == coords_cartesianas) convertir_datos();
        res.innerHTML += "Resta: ";
        //Resultado dependiendo de que sistema de coordenadas se este trabajando
        if (coords_cartesianas) {
            res.innerHTML += "(" + x1 + ") + (" + x2 + ")i<br>";
        } else {
            let conversion = cartesiana_polar(x1, x2);
            res.innerHTML += "(" + conversion[0] + " (cos(" + conversion[1] + "°) + i sen(" + conversion[1] + "°))<br>";
        }
    }
    //Multiplicación = Z1*Z2*Z3
    if (operacion[2].checked) {
        x1 = 1;
        x2 = 0;
        //Se convierte en coordenadas polares (ya que asi solo toca multiplicar los módulos con los módulos y sumar los ángulos con los ángulos)
        if (!coords_polares) convertir_datos();
        for (let i = 0; i < coords.length; i++) {
            if (coords[i][2]) {
                x1 *= coords[i][0];
                x2 += coords[i][1];
            }
            //Para no dar tantas vueltas
            x2 = x2 % 360;
        }
        //Si se estaba trabajando con coordenadas polares devuelve la conversion
        if (coords_polares == coords_cartesianas) convertir_datos();
        res.innerHTML += "Multiplicación: ";
        //Resultado dependiendo de que sistema de coordenadas se este trabajando
        if (coords_cartesianas) {
            let conversion = polar_cartesiana(x1, x2);
            res.innerHTML += "(" + conversion[0] + ") + (" + conversion[1] + ")i<br>";
        } else {
            res.innerHTML += "(" + x1 + " (cos(" + x2 + "°) + i sen(" + x2 + "°))<br>";
        }
    }
    //División = (Z1/Z2)/Z3
    if (operacion[3].checked) {
        x1 = 1;
        x2 = 0;
        let primero = true;
        //Se convierte en coordenadas polares (ya que asi solo toca dividir los módulos con los módulos y restar los ángulos con los ángulos)
        if (!coords_polares) convertir_datos();
        for (let i = 0; i < coords.length; i++) {
            //Se hace esto para tener el primer valor y no dividirlo entre nada
            if (coords[i][2] && primero) {
                x1 *= coords[i][0];
                x2 += coords[i][1];
                primero = false;
            } else if (coords[i][2]) {
                x1 /= coords[i][0];
                x2 -= coords[i][1];
            }
            //Para no dar tantas vueltas
            x2 = x2 % 360;
        }
        //Si se estaba trabajando con coordenadas polares devuelve la conversion
        if (coords_polares == coords_cartesianas) convertir_datos();
        res.innerHTML += "División: ";
        //Resultado dependiendo de que sistema de coordenadas se este trabajando
        if (coords_cartesianas) {
            let conversion = polar_cartesiana(x1, x2);
            res.innerHTML += "(" + conversion[0] + ") + (" + conversion[1] + ")i<br>";
        } else {
            res.innerHTML += "(" + x1 + " (cos(" + x2 + "°) + i sen(" + x2 + "°))<br>";
        }
    }
}

//Exponente de i^n
function exponente() {
    //Se obtine el residuo del exponente
    let mod = parseInt(Math.abs(i_exp_res.value)) % 4;
    //Se escribe en el input el valor por el que se esta potenciando i
    i_exp_res.value = parseInt(Math.abs(i_exp_res.value));
    //Lista de respuestas para i^n
    let i_exp = ["1", "i", "-1", "-i"];
    //Escribe el resultado con respecto al residuo y las respuestas 
    document.getElementById("exp_res").innerHTML = i_exp[mod] + "<br>";
}