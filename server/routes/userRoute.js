const express = require('express');
const { login } = require('../controlers/login');
const { registration } = require('../controlers/registration');
const { makeCollection, getAllCollections, getCollection } = require('../controlers/collection');
const { getAllItems, getItem, addItemLike, getIsLiked, removeItemLike, makeItem, getLikesCountForItem } = require('../controlers/item');

const router = express.Router();

const multer  = require('multer');
const { addComment, getItemComments } = require('../controlers/comment');

const upload = multer({ dest: 'public/' })

router.post('/login', login);
router.post('/registration', registration);
router.post('/collection', upload.single('image'), makeCollection);
router.get('/home', getAllCollections);
router.get('/homeItems', getAllItems);
router.get('/collection/:id', getCollection);
router.get('/item/:id', getItem);
router.post('/item/:id/comment', addComment);
router.get('/item/:id/comments', getItemComments);
router.post('/item/:id/addLike', addItemLike);
router.post('/item/:id/removeLike', removeItemLike);
router.get('/item/:id/isLiked/:userId', getIsLiked);
router.post('/item', makeItem);
router.get('/item/:id/likesCount', getLikesCountForItem)



module.exports = router;
