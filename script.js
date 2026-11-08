// =====================================
// 1. LAS 12 FOTOGRAFÍAS
// =====================================

const fotografias = [

    // BODAS
    {
        titulo: "Boda romántica",
        categoria: "bodas",
        imagen: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Celebración de amor",
        categoria: "bodas",
        imagen: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Momento especial",
        categoria: "bodas",
        imagen: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85"
    },

    // RETRATOS
    {
        titulo: "Retrato profesional",
        categoria: "retratos",
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Belleza natural",
        categoria: "retratos",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Retrato femenino",
        categoria: "retratos",
        imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85"
    },

    // PAISAJES
    {
        titulo: "Montañas increíbles",
        categoria: "paisajes",
        imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Atardecer en la naturaleza",
        categoria: "paisajes",
        imagen: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Lago de montaña",
        categoria: "paisajes",
        imagen: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85"
    },

    // EVENTOS
    {
        titulo: "Festival musical",
        categoria: "eventos",
        imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Concierto en vivo",
        categoria: "eventos",
        imagen: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85"
    },
    {
        titulo: "Celebración especial",
        categoria: "eventos",
        imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85"
    }

];

// =====================================
// 2. MOSTRAR LAS FOTOGRAFÍAS
// =====================================

const galeria = document.getElementById("galeriaFotos");

let fotosActuales = [...fotografias];

function mostrarGaleria(lista) {

    galeria.innerHTML = "";

    fotosActuales = lista;

    lista.forEach((foto, indice) => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "foto";

        const imagen = document.createElement("img");

        imagen.src = foto.imagen;
        imagen.alt = foto.titulo;
        imagen.loading = "lazy";

        // Imagen alternativa si falla una fotografía
        imagen.onerror = () => {
            imagen.onerror = null;
            imagen.src = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80";
        };

        tarjeta.appendChild(imagen);

        tarjeta.addEventListener("click", () => {
            abrirLightbox(indice);
        });

        galeria.appendChild(tarjeta);

    });

}

mostrarGaleria(fotografias);

// =====================================
// 3. FILTROS DE CATEGORÍAS
// =====================================

const botonesFiltro = document.querySelectorAll(".filtro");

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach(b => {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");

        const categoria = boton.dataset.categoria;

        const resultado = categoria === "todos"
            ? fotografias
            : fotografias.filter(foto =>
                foto.categoria === categoria
            );

        mostrarGaleria(resultado);

    });

});

// =====================================
// 4. VISOR AMPLIADO
// =====================================

const lightbox = document.getElementById("lightbox");

const imagenGrande = document.getElementById("imagenGrande");

const tituloImagen = document.getElementById("tituloImagen");

const contador = document.getElementById("contador");

let indiceActual = 0;

function abrirLightbox(indice) {

    if (!fotosActuales.length) return;

    indiceActual = indice;

    actualizarLightbox();

    lightbox.classList.add("activo");

    document.body.style.overflow = "hidden";

}

function actualizarLightbox() {

    const foto = fotosActuales[indiceActual];

    imagenGrande.src = foto.imagen;

    imagenGrande.alt = foto.titulo;

    tituloImagen.textContent = foto.titulo;

    contador.textContent =
        `${indiceActual + 1} / ${fotosActuales.length}`;

}

// =====================================
// 5. SIGUIENTE FOTOGRAFÍA
// =====================================

document.getElementById("siguiente").addEventListener("click", () => {

    indiceActual++;

    if (indiceActual >= fotosActuales.length) {
        indiceActual = 0;
    }

    actualizarLightbox();

});

// =====================================
// 6. FOTOGRAFÍA ANTERIOR
// =====================================

document.getElementById("anterior").addEventListener("click", () => {

    indiceActual--;

    if (indiceActual < 0) {
        indiceActual = fotosActuales.length - 1;
    }

    actualizarLightbox();

});

// =====================================
// 7. CERRAR VISOR
// =====================================

function cerrarLightbox() {

    lightbox.classList.remove("activo");

    document.body.style.overflow = "";

}

document.getElementById("cerrar").addEventListener("click", cerrarLightbox);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        cerrarLightbox();
    }

});

// CERRAR CON ESC Y USAR FLECHAS

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("activo")) return;

    if (e.key === "Escape") {
        cerrarLightbox();
    }

    if (e.key === "ArrowRight") {
        document.getElementById("siguiente").click();
    }

    if (e.key === "ArrowLeft") {
        document.getElementById("anterior").click();
    }

});

// =====================================
// 8. MODO CLARO Y OSCURO
// =====================================

const botonTema = document.getElementById("tema");

function actualizarTema() {

    const oscuro = document.body.classList.contains("oscuro");

    botonTema.textContent = oscuro
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";

}

// Recuperar el tema guardado

if (localStorage.getItem("temaLenteLibre") === "oscuro") {

    document.body.classList.add("oscuro");

}

actualizarTema();

// Cambiar el tema

botonTema.addEventListener("click", () => {

    document.body.classList.toggle("oscuro");

    const nuevoTema =
        document.body.classList.contains("oscuro")
        ? "oscuro"
        : "claro";

    localStorage.setItem("temaLenteLibre", nuevoTema);

    actualizarTema();

});

// =====================================
// 9. FORMULARIO CON WHATSAPP
// =====================================

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    const servicio = document.getElementById("servicio").value;

    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !telefono || !servicio || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(correo)) {
        alert("Escribe un correo electrónico válido.");
        return;
    }

    if (!/^\d{7,15}$/.test(telefono)) {
        alert("Escribe un número de teléfono válido.");
        return;
    }

    // TU NÚMERO DE WHATSAPP
    const numeroWhatsApp = "573104428485";

    // CREAR MENSAJE
    const texto = `
¡Hola! Tengo una nueva solicitud para Lente Libre 📸

Nombre: ${nombre}

Correo: ${correo}

Teléfono: ${telefono}

Servicio solicitado: ${servicio}

Detalles de la sesión:
${mensaje}

¡Espero su respuesta!
`;

    // ABRIR WHATSAPP
    const enlace = "https://wa.me/" + numeroWhatsApp +
                   "?text=" + encodeURIComponent(texto);

    window.open(enlace, "_blank");

});