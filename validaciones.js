document.addEventListener('DOMContentLoaded', function() {
    const tipoVueloIda = document.getElementById('ida');
    const tipoVueloIdaVuelta = document.getElementById('idaVuelta');
    const grupoFechaVuelta = document.getElementById('grupoFechaVuelta');
    
    tipoVueloIda.addEventListener('change', function() {
        grupoFechaVuelta.style.display = 'none';
        document.getElementById('fechaVuelta').required = false;
    });
    
    tipoVueloIdaVuelta.addEventListener('change', function() {
        grupoFechaVuelta.style.display = 'block';
        document.getElementById('fechaVuelta').required = true;
    });
    document.getElementById('calcular').addEventListener('click', calcularPrecio);
    
    function calcularPrecio() {
        if (!validarFormulario()) {
            return;
        }
        const destino = document.getElementById('destino').value;
        const esIdaVuelta = document.getElementById('idaVuelta').checked;
        const pasajeros = parseInt(document.getElementById('pasajeros').value);
        let precioBase;
        switch(destino) {
            case 'COR':
                precioBase = 120000;
                break;
            case 'MDZ':
                precioBase = 210800;
                break;
            case 'BUE':
                precioBase = 135000;
                break;
            default:
                precioBase = 0;
        }
        if (!esIdaVuelta) {
            precioBase = precioBase / 2;
        }
        const precioConIVA = precioBase * 1.21;
        const precioTotal = precioConIVA * pasajeros;
        document.getElementById('precioTotal').textContent = '$ ' + precioTotal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('resultado').style.display = 'block';
    }
    

    function validarFormulario() {
        let valido = true;
        
        if (document.getElementById('destino').value === '') {
            alert('Por favor seleccione un destino');
            return false;
        }
        
        const fechaIda = document.getElementById('fechaIda').value;
        if (!fechaIda) {
            document.getElementById('errorFechaIda').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('errorFechaIda').style.display = 'none';
        }
        
        if (document.getElementById('idaVuelta').checked) {
            const fechaVuelta = document.getElementById('fechaVuelta').value;
            if (!fechaVuelta) {
                document.getElementById('errorFechaVuelta').style.display = 'block';
                document.getElementById('errorFechaVuelta').textContent = 'La fecha de vuelta no puede estar vacía';
                valido = false;
            } else if (new Date(fechaVuelta) <= new Date(fechaIda)) {
                document.getElementById('errorFechaVuelta').style.display = 'block';
                document.getElementById('errorFechaVuelta').textContent = 'La fecha de vuelta debe ser posterior a la fecha de ida';
                valido = false;
            } else {
                document.getElementById('errorFechaVuelta').style.display = 'none';
            }
        }
        
        const pasajeros = parseInt(document.getElementById('pasajeros').value);

        if (isNaN(pasajeros)) {
            document.getElementById('errorPasajeros').style.display = 'block';
            document.getElementById('errorPasajeros').textContent = 'Debe ingresar un número válido';
            valido = false;
        } else if (pasajeros < 1) {
            document.getElementById('errorPasajeros').style.display = 'block';
            document.getElementById('errorPasajeros').textContent = 'Debe haber al menos 1 pasajero';
            valido = false;
        } else {
            document.getElementById('errorPasajeros').style.display = 'none';
        }
        
        return valido;
    }
});



