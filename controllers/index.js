const fromDirectory = require("./directory.controllers");

const controllers = {
    directory: { ...fromDirectory }
}

module.exports = controllers;