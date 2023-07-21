const Collection = require('../models/collection');
const Item = require('../models/item');
const { sequelize } = require('../configs');
const { Op } = require('sequelize');

const makeCollection = async (req, res) => {
    const { name, description, topic, userId} = req.body;
    const image = req.file?.filename;

    try {
        const collection = await Collection.create({
            name: name,
            description: description,
            topic: topic,
            photo: image,
            user_id: userId
        });
        
        res.status(201).json(collection);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to make collection' });
    }
};

const getCollection = async (req, res) => {
    try {
        const {id} = req.params;

        const collection = await Collection.findByPk(id);
        res.status(200).json(collection);
    } catch (error) {
        console.error('Error retrieving collection:', error);
        res.status(500).json({ error: 'Failed to retrieve collections' });
    }
}

const getAllCollections = async (req, res) => {
    try {
        const itemCounts = await Item.findAll({
            attributes: ['id', [sequelize.fn('count', sequelize.col('id')), 'count']],
            group : ['Item.collection_id'],
            raw: true,
            order: sequelize.literal('count DESC'), 
            limit: 5
          });
          const collectionIds = itemCounts.map(item => item.id);
          const collections = await Collection.findAll({ where: {id: {[Op.in]: collectionIds}} })
          const result = {collections, itemCounts}

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { makeCollection, getAllCollections, getCollection};