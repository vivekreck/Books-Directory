let fs = require('fs').promises;
const path = require('path');
let uniqid = require('uniqid');

exports.add = async (req, res, next) => {
    try {
        const file_path = path.join(__dirname, '..', 'data/Directory.json');

        const data = await fs.readFile(file_path, "binary");
        let json = JSON.parse(data);

        json.push({
            id: uniqid(),
            ...req.body
        })

        await fs.writeFile(file_path, JSON.stringify(json));

        return res.status(201).send({
            msg: "Data saved successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.update = async (req, res, next) => {
    try {
        const file_path = path.join(__dirname, '..', 'data/Directory.json');
        const { id } = req.params;
        const { title, author } = req.body;

        const file_data = await fs.readFile(file_path, "binary");
        let json = JSON.parse(file_data);

        json.forEach(data => {
            if (data.id == id) {
                data.title = title;
                data.author = author;
            }
        });
        await fs.writeFile(file_path, JSON.stringify(json));

        return res.status(200).send({
            msg: "Data updated successfully!"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.fetch = async (req, res, next) => {
    try {
        const file_path = path.join(__dirname, '..', 'data/Directory.json');

        const data = await fs.readFile(file_path, "binary")

        return res.status(200).send({
            msg: "Data fetched successfully!",
            data: JSON.parse(data),
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.remove = async (req, res, next) => {
    try {
        const file_path = path.join(__dirname, '..', 'data/Directory.json');

        const { id } = req.params;

        const file_data = await fs.readFile(file_path, "binary");
        let json = JSON.parse(file_data);

        const index = json.findIndex(data => data.id == id);

        if (index == '-1') {
            return res.status(400).send({
                msg: "Data not found!",
            });
        }

        json.splice(index, 1)
        await fs.writeFile(file_path, JSON.stringify(json));

        return res.status(200).send({
            msg: "Data removed successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};