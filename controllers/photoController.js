import Photo from '../models/Photo.js'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getAllPhotos = async (req, res) => {
    // Our start page or first page.
    const page = req.query.page || 1;
    // Number of photos on each page
    const photosPerPage = 3;
    // Total number of photos
    const totalPhoto = await Photo.find().countDocuments();

    const photos = await Photo.find({})     // We get all the photos 
        .sort("-dateCreated")   // We sort the photos
        .skip((page - 1) * photosPerPage)   // Allows Discarding Used by Pages 
        .limit(photosPerPage)   // We limit the number of F.s I want on each page.

    res.render("index", {
        photos: photos,  // Photos we limit by page
        current: page,   // The highlighted page
        pages: Math.ceil(totalPhoto / photosPerPage),  // Total number of pages
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
    const now = Date.now();
    const uploadImage = req.files.image;
    const uploadPath = __dirname + '/../public/uploads/' + now + '-' + uploadImage.name;
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + now + '-' + uploadImage.name,
        })
    });
    res.redirect('/');
};

const updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    photo.title = req.body.title;
    photo.description = req.body.description;

    await photo.save();
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