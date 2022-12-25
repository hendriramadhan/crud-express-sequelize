const path = require("path");
const fs = require("fs");
const Product = require("./model");

const index = async (req, res) => {
  try {
    const result = await Product.findAll();
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findAll({
      where: {
        id: id,
      },
    });
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

const destroy = async (req, res) => {
  let { id } = req.params;
  const result = await Product.findAll({
    where: {
      id: id,
    },
  });
  if (result.length < 1) {
    res.json({
      status: "not found",
      message: `data id ${id} tidak ditemukan`,
    });
  } else {
    try {
      await Product.destroy({
        where: {
          id: id,
        },
      });
      removeImage(result[0].image_url);
      res.send({
        status: "success",
        message: "data berhasil dihapus",
      });
    } catch (e) {
      res.json(e);
    }
  }
};

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../upload", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.sync();
    const result = Product.create({
      users_id,
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:5000/public/${image.originalname}`,
    });
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

const update = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const id = req.params.id;
  const image = req.file;
  let body = { name, price, stock, status };
  if (image) {
    body = {
      name,
      price,
      stock,
      status,
      image_url: "upload/" + image.filename,
    };
  }
  const result = await Product.findAll({
    where: {
      id: id,
    },
  });
  if (result.length < 1) {
    res.json({
      status: "not found",
      message: `data id ${id} tidak ditemukan`,
    });
  } else {
    try {
      await Product.update(body, {
        where: {
          id: id,
        },
      });
      removeImage(result[0].image_url);
      res.json({
        status: "success",
        message: "data berhasil diupdate",
      });
    } catch (e) {
      res.json(e);
    }
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
