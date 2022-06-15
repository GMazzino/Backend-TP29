import faker from "@faker-js/faker/locale/es_MX";

function fakeProduct(prodQ = 1) {
  try {
    if (!Number.isNaN(Number(prodQ))) {
      const products = [];
      for (let i = 0; i < Math.abs(prodQ); i++) {
        products.push({
          name: faker.commerce.productName(),
          price: faker.commerce.price(100, 10000, 2, "$"),
          img: faker.image.imageUrl(100, 100, "technics"),
        });
      }
      return { status: 200, content: products };
    } else {
      return { status: 400, content: { error: "Error en la peticion" } };
    }
  } catch (err) {
    return {
      status: 500,
      content: { error: `Unspecified server error: ${err.message}` },
    };
  }
}
export { fakeProduct };
