const express = require("express");
const uuid = require("uuid");

const app = express();
app.use(express.json());

let items = [
  {
    id: "1",
    name: "duda",
    description: "dudaaa descricao",
  },
  {
    id: "2",
    name: "Higor",
    description: "Higor descricao2",
  },
  {
    id: "3",
    name: "Fernando",
    description: "Fernando descricao3",
  },
];

app.get("/status", (request, response) => {
  try {
    response.status(200).send({ status: "Server is up and running!!!!!" });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.get("/items", (resquest, response) => {
  try {
    response.status(200).send({ items });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.post("/items", (request, response) => {
  try {
    const { name, description } = request.body;
    if (!name || !description) {
      throw new Error("Name and description are required");
    }
    const newItem = {
      id: uuid.v4(),
      name,
      description,
    };
    items.push(newItem);
    response.status(200).send({ item: newItem });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.get("/items/:id", (request, response) => {
  try {
    const { id } = request.params;
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new Error("Item not found");
    }
    response.status(200).send({ item });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});
app.delete("/items/:id", (request, response) => {
  try {
    const { id } = request.params;
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new Error("Item not found");
    }
    items.splice(itemIndex, 1);
    response.status(200).send({ id });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});
app.put("/items/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { name, description } = request.body;
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new Error("Item not found");
    }
    if (name) {
      item.name = name;
    }
    if (description) {
      item.description = description;
    }
    response.status(200).send({ item });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});