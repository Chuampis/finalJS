class Carrito {
    // Añade producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentEelement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto){
        const detalleProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h4').textContent.Carrito,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a)').getAttribute('data-id'),
            cantidad : 1
        }
        this.insertarCarrito(detalleProducto);
    }
    
    insertarCarrito(procducto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${producto.img}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(row);   
        this.guardarProductosLocalStorage(producto);     
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.clasList.contains('borrar-producto')){
            e.target.parentElement.parentEelement.remove();
            producto = e.target.parentEelement.parentEelement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;
        
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    eliminarProductoLocalStorage(productoID){
        let productosLS = this.obtenerProductosLocalStorage();
        productoLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    
    }

    leerlLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLs.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${producto.img}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
            `;
            listaProductos.appendChild(row);  
        });
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }
}