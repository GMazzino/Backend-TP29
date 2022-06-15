import express from "express";
const { Router } = express;
const router = Router();
import { Api } from "../api/api_array.js";
import { fakeProduct } from "../utils/products_gen.js";
const api = new Api();

router.get("/productos", (req, res) => {
  let ans = api.getProducts();
  res.status(ans.status).json(ans.content);
});

router.get("/productos/:id", (req, res) => {
  let ans = api.getProductById(req.params.id);
  res.status(ans.status).json(ans.content);
});

router.post("/productos", (req, res) => {
  let ans = api.addNewProduct(req.body);
  req.app.io.sockets.emit("renderProducts", api.getProducts().content);
  res.status(ans.status).json(ans.content);
});

router.post("/productos-test", (req, res) => {
  let ans = fakeProduct(req.body.newProducts);
  req.app.io.sockets.emit("renderProducts", ans.content);
  res.status(ans.status).json(ans.content);
});

router.put("/productos/:id", (req, res) => {
  let ans = api.updateProduct(req.params.id, req.body);
  res.status(ans.status).json(ans.content);
});

router.delete("/productos/:id", (req, res) => {
  let ans = api.delProductById(req.params.id);
  res.status(ans.status).json(ans.content);
});

export { router as routerProducts, api as products };
