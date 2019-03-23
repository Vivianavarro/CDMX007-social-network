(function (window, document) {
    var inicio = function () {
        var elemento = null,
            marco = null,
            rutas = {},
            controladores = {},
            ctrlActual = null,
            library = {
                getID: function (id) {
                    elemento = document.getElementById(id);
                    return this;
                },

                get: function (id) {
                    return document.getElementById(id);
                },

                noSubmit: function () {
                    elemento.addEventListener('submit', function (e) {
                        e.preventDefault();
                    }, false);
                    return this;
                },
                controlador: function (nombre, ctrl) {
                    controladores[nombre] = {
                        'controlador': ctrl
                    };
                },

                getCtrl: function () {
                    return ctrlActual;
                },

                enrutar: function () {
                    marco = elemento;
                    return this;

                },

                ruta: function (ruta, plantilla, controlador, carga) {
                    rutas[ruta] = {
                        'plantilla': plantilla,
                        'controlador': controlador,
                        'carga': carga
                    };

                    return this;
                },

                manejadorRutas: function () {
                    var hash = window.location.hash.substring(1) || '/',
                        destino = rutas[hash],
                        xhr = new XMLHttpRequest();

                    if (destino && destino.plantilla) {
                        if (destino.controlador) {
                            ctrlActual = controladores[destino.controlador];

                        }

                        xhr.addEventListener('load', function () {
                            marco.innerHTML = this.responseText;
                            setTimeout(function () {
                                if (typeof (destino.carga) === 'function') {
                                    destino.carga();
                                }
                            }, 500);
                        }, false);
                        xhr.open('get', destino.plantilla, true);
                        xhr.send(null);
                    } else {
                        window.location.hash = '#/'
                    }

                }

            };
        return library;
    }
    if (typeof window.library === 'undefined') {
        window.library = window._ = inicio();
        window.addEventListener('load', _.manejadorRutas, false);
        window.addEventListener('hashchange', _.manejadorRutas, false)

    } else {
        console.log("se llama nuevamente la library ");
    }
})(window, document);