const User = require('./user');
const Collection = require('./collection');
const Item = require('./item');
const Tag = require('./tag');
const Comment = require('./comment');
const { sequelize } = require('../configs');


Collection.hasMany(Item, { foreignKey: { name: "collection_id", allowNull: false }, as: "items" });
Item.belongsTo(Collection, { foreignKey: { name: "collection_id", allowNull: false } });

User.hasMany(Item, { foreignKey: { name: "user_id", allowNull: false }, as: "user_items" });
Item.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

User.hasMany(Collection, { foreignKey: { name: "user_id", allowNull: false }, as: "user_collection" });
Collection.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

Tag.belongsToMany(Item, { through: "item_tag", foreignKey: { name: "tag_id", allowNull: false }, as: "items" });
Item.belongsToMany(Tag, { through: "item_tag", foreignKey: { name: "item_id", allowNull: false }, as: "tags" });

Item.belongsToMany(User, { through: "likes", foreignKey: { name: "item_id", allowNull: false }, as: "user_likes" });
User.belongsToMany(Item, { through: "likes", foreignKey: { name: "user_id", allowNull: false }, as: "liked_items" });

Item.hasMany(Comment, { foreignKey: { name: "item_id", allowNull: false }, as: "comments" });
Comment.belongsTo(Item, { foreignKey: { name: "item_id", allowNull: false } });

User.hasMany(Comment, { foreignKey: { name: "user_id", allowNull: false }, as: "user_comments" });
Comment.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false }});
// sequelize.sync();

module.exports = {User, Collection, Item, Tag};