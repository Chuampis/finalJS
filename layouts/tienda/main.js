document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        // console.log(data)
        pintarProductos(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    data.forEach(producto => {
        template.querySelector('img').setAttribute('src', producto.img)
        template.querySelector('h5').textContent = producto.titulo
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

// Detecto el click en cada boton de "Agregar"
let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')
    // Recorro array de botones para agregar al carrito
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = { ...producto }
            pintarCarrito()

            // Agrego Libreria Toastify
            Toastify({
                text: `Agregaste ${producto.titulo} al carrito`,
                duration: 1800,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #8c140b, #dfc8a5)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        })
    })
}


const items = document.querySelector('#items')

const pintarCarrito = () => {

    items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    Object.values(carrito).forEach(producto => {
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.titulo
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad

        //BOTONES
        template.querySelector('.btn-add').dataset.id = producto.id
        template.querySelector('.btn-del').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

    localStorage.setItem('carrito', JSON.stringify(carrito))

}


const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // Toma Cantidad y Suma Totales en el carrito
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    footer.innerHTML = ''

    // Vuelvo a poner el footer al vaciar el carrito
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - Agregue productos</th>
    `
        return
    }

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    // Creo constante para vaciar el carrito
    const vaciarCarrito = document.querySelector('#vaciar-carrito')
    vaciarCarrito.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()

    })

}


// Creo acción para sumar o restar cantidad en carrito
const accionBotones = () => {
    const botonAgregar = document.querySelectorAll('#items .btn-add')
    const botonRestar = document.querySelectorAll('#items .btn-del')
    // Boton Agregar Cantidad
    botonAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })
    // Boton Restar Cantidad
    botonRestar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })

    })
    
}
