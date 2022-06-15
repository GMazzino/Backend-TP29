const Product = function Product(product, id) {
  this.name = product.name;
  this.price = parseFloat(product.price);
  this.img = product.img;
  this.id = id;
};

class ApiMethods {
  constructor() {
    this.products = [];
    //Productos a modo de ejemplo
    this.products.push(
      new Product(
        {
          name: "Telescopio",
          price: 4820.58,
          img: "https://img.icons8.com/external-filled-outline-satawat-anukul/64/000000/external-telescope-education-filled-outline-filled-outline-satawat-anukul-2.png",
        },
        1
      )
    );
    this.products.push(
      new Product(
        {
          name: "Set de escuadras",
          price: 634.72,
          img: "https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-angle-education-flat-icons-pause-08.png",
        },
        2
      )
    );
    this.products.push(
      new Product(
        {
          name: "Calculadora",
          price: 734.66,
          img: "https://img.icons8.com/external-others-aquariid/64/000000/external-accounting-education-others-aquariid-2.png",
        },
        3
      )
    );
    this.products.push(
      new Product(
        {
          name: "Tijera",
          price: 228.7,
          img: "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-scissor-kindergarten-icongeek26-linear-colour-icongeek26.png",
        },
        4
      )
    );
    this.products.push(
      new Product(
        {
          name: "Globo terráqueo",
          price: 916.0,
          img: "https://img.icons8.com/external-filled-line-rakhmat-setiawan/64/000000/external-earth-back-to-school-filled-line-filled-line-rakhmat-setiawan.png",
        },
        5
      )
    );
    this.products.push(
      new Product(
        {
          name: "Pizarra",
          price: 1213.45,
          img: "https://img.icons8.com/external-flat-icons-pack-pongsakorn-tan/64/000000/external-blackboard-back-to-school-flat-icons-pack-pongsakorn-tan.png",
        },
        6
      )
    );
    this.maxId = this.products.length;
  }

  getProducts() {
    if (this.products.length !== 0) {
      return { status: 200, content: this.products };
    } else {
      return { status: 200, content: { error: `No hay productos a mostrar` } };
    }
  }

  getProductById(id) {
    if (!isNaN(parseInt(id))) {
      const selectedProduct = this.products.find(
        (product) => product.id === parseInt(id)
      );
      return selectedProduct != undefined
        ? { status: 200, content: selectedProduct }
        : { status: 200, content: { error: `Producto no encontrado` } };
    } else {
      return { status: 400, content: { error: `Error en la petición` } };
    }
  }

  delProductById(id) {
    if (!isNaN(parseInt(id))) {
      if (this.products.findIndex((prod) => prod.id === parseInt(id)) != -1) {
        this.products = this.products.filter(
          (prod) => prod.id !== parseInt(id)
        );
        return {
          status: 200,
          content: { success: `Producto con ID: ${id} borrado` },
        };
      } else {
        return { status: 200, content: { error: `Producto no encontrado` } };
      }
    } else {
      return { status: 400, content: { error: `Error en la petición` } };
    }
  }

  addNewProduct(product) {
    if (
      product.title &&
      !isNaN(parseFloat(product.price)) &&
      product.thumbnail
    ) {
      const newProduct = new Product(product, ++this.maxId);
      this.products.push(newProduct);
      return { status: 200, content: newProduct };
    } else {
      return { status: 400, content: { error: `Error en la petición` } };
    }
  }

  updateProduct(id, product) {
    if (
      !isNaN(parseInt(id)) &&
      product.title &&
      !isNaN(parseFloat(product.price)) &&
      product.thumbnail
    ) {
      let index = this.products.findIndex((prod) => prod.id === parseInt(id));
      if (index !== -1) {
        this.products[index].title = product.title;
        this.products[index].price = parseFloat(product.price);
        this.products[index].thumbnail = product.thumbnail;
        return { status: 200, content: { success: `Producto actualizado` } };
      } else {
        return { status: 200, content: { error: `Producto no encontrado` } };
      }
    } else {
      return { status: 400, content: { error: `Error en la petición.` } };
    }
  }
}
export { ApiMethods as Api };
