const Item = require('../models/item');
const Collection = require('../models/collection');
const User = require('../models/user');
const { sequelize } = require('../configs');



const makeItem = async (req, res) => {

    const { name, collection_id, userId } = req.body;

    try {
        const item = await Item.create({
            name: name,
            collection_id: collection_id,
            user_id: userId
        });
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to make item' });
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findByPk(id, {
            include: [
                {
                    model: Collection,
                    attributes: ['name', 'topic'],
                },
                // {
                //     model: User,
                // },
            ],
        });
        res.status(200).json(item);
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).json({ error: 'Failed to retrieve Item' });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            order: sequelize.literal('updated_at DESC'),
        },
            {
                include: [
                    {
                        model: Collection,
                        attributes: ['name', 'topic'],
                    },
                ]
            });
        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addItemLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const item = await Item.findByPk(id);

        await item.addUser_like(user_id);

        res.status(200).json(item);
    } catch (error) {
        console.log('LIKE COUNT ERROR', error);
        res.status(500).json({ message: error.message });

    }
}

const removeItemLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        const item = await Item.findByPk(id);

        const response = await item.removeUser_likes([user_id]);
        res.status(200).json(item);
    } catch (error) {
        console.log('LIKE COUNT ERROR', error);
        res.status(500).json({ message: error.message });

    }
}

const getLikesCountForItem = async (req, res) => {
    try {

        const { id } = req.params;

        const item = await Item.findByPk(id)
        const userLikes = await item.getUser_likes();

        res.status(200).json({ likes: userLikes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getIsLiked = async (req, res) => {
    try {
        const { id, userId } = req.params;

        const item = await Item.findByPk(id);
        const result = await item.getUser_likes();
        const response = result.find(user => user.id == userId);

        res.status(200).json({ response: response ? true : false });
    } catch (error) {
        console.log('getIsLiked ERROR', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllItems, getItem, addItemLike, removeItemLike, getIsLiked, makeItem, getLikesCountForItem };