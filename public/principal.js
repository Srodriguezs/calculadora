var diferentDiv = document.getElementById('iguales');
var mayorDiv = document.getElementById('mayor');
mayorDiv.style.display = 'none';
diferentDiv.style.display = 'none';

function operar() {
    'use strict';

    // fetch all the forms we want to apply custom style
    // var min = document.getElementsByClassName('form-control');
    const min = document.getElementById('x1');
    const max = document.getElementById('x2');
    min.classList.remove('is-invalid')
    min.classList.remove('is-valid')
    diferentDiv.style.display = 'none';
    mayorDiv.style.display = 'none';
    // validamos el primer campo
    if (min.checkValidity() === false || isPrime(min.value) === false) {
        return min.classList.add('is-invalid')
    }
    min.classList.remove('is-invalid')
        // segundo numero 
    if (max.checkValidity() === false || isPrime(max.value) === false) {
        return max.classList.add('is-invalid')
    }
    min.classList.remove('is-invalid')


    if (Number(min.value) >= Number(max.value)) {
        return diferentDiv.style.display = 'block';
    }

    if ((Number(max.value) - Number(min.value)) > 1000) {
        return mayorDiv.style.display = 'block';
    }



    min.classList.add('is-valid')
    max.classList.add('is-valid')
    diferentDiv.style.display = 'none';
    mayorDiv.style.display = 'none';
    obtenerPrimos(Number(min.value), Number(max.value)).then(data => {
        if (data.length > 0) {
            $(".table tbody tr").remove();
            for (const d of data) {
                var tBody = '<tr><td>' + d.primo + '</td><td>' + d.suma_decimales + '</td><td>' + d.es_multiplo_de_3 + '</td></tr>';
                $('.table tbody').append(tBody);
            }

        }
    })

}



function isPrime(num) {
    for (var i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}

async function obtenerPrimos(min = 2, hasta = 100) {
    var encontrar = [],
        i, j, primos = [];
    for (i = 2; i <= hasta; ++i) {
        if (!encontrar[i]) {
            if (i >= min) {
                let obj = {
                    primo: i,
                    suma_decimales: sumarDigitos(i),
                    es_multiplo_de_3: (i % 3 === 0) ? 'SI' : 'NO'
                };
                primos.push(obj);
            }

            for (j = i << 1; j <= hasta; j += i) {
                encontrar[j] = true;
            }
        }
    }
    return primos;
}

function sumarDigitos(digito) {
    sumar = 0;
    while (digito) {
        sumar += digito % 10;
        // redondeo el numero
        digito = Math.floor(digito / 10);

    }

    return sumar;


}