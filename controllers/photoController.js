import Photo from '../models/Photo.js'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getAllPhotos = async (_, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render("index", {
        photos,
    });
};

const getPhoto = async (req, res) => {
    const photo = await Photo.findById({ _id: req.params.id })
    res.render("photo", { photo });
};

const createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const uploadImage = req.files.image;
    const uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        })
    });
    res.redirect('/');
};

const updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();

    res.redirect(`/photos/${photo._id}`);
};

const deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(photo._id);
    res.redirect('/');
};

export default {
    getAllPhotos,
    getPhoto,
    createPhoto,
    updatePhoto,
    deletePhoto,
}