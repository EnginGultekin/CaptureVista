import Photo from '../models/Photo.js';

const getAboutPage = (_, res) => {
    res.render("about");
};

const getAddPage = (_, res) => {
    res.render("add");
};

const getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { photo })
};

export default {
    getAboutPage,
    getAddPage,
    getEditPage
}