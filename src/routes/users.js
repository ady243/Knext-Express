import User from "../db/models/User.js";
import hashPassword from "../hashPassword.js";

const userRoute = ({ app }) => {
  app.post("/users", async (req, res) => {
    const {
      body: { name, email, sexe, password },
    } = req;
    const user = await User.query().findOne({ email });

    if (user) {
      res.send({ error: "User already exists" });

      return;
    }

    const [passwordHash, passwordSalt] = hashPassword(password);
    const users = await User.query().insertAndFetch({
      name,
      email,
      sexe,
      passwordHash,
      passwordSalt,
    });
    res.send(users);
  });
  app.post("/produits", async (req, res) => {
    const {
      body: { categories, ref_categories },
    } = req;
    const [product] = await db("Produit").insert({
      categories,
      ref_categories,
    });
    returning("*");
    res.send(product);
  });
  // app.post("/comment", async (req, res) => {
  //   const {
  //     body: { categories, ref_categories },
  //   } = req;
  //   const [] = await db("comment").insert({
  //     categories,
  //     ref_categories,
  //   });
  //   returning("*");
  //   res.send(product);
  // });
};

export default userRoute;
