import Sequelize from 'sequelize';
import { _ } from 'lodash';
import seed from './seed';

const db = new Sequelize('postgres://postgres:root@localhost:5432/chat', {
  logging: false,
});

// tabele, osnovni tipovi od kojih su sacinjeni ostali iz graphql scheme

export const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  description: { type: Sequelize.TEXT },
  lastActiveAt: { type: Sequelize.DATE },
  password: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

export const ChatModel = db.define('chat', {
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

export const GroupModel = db.define('group', {
  name: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

export const MessageModel = db.define('message', {
  text: { type: Sequelize.TEXT },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

UserModel.belongsToMany(ChatModel, { through: 'ChatUser' });
UserModel.belongsToMany(UserModel, { through: 'Friends', as: 'friends' });
MessageModel.belongsTo(UserModel);
UserModel.hasOne(MessageModel);

ChatModel.belongsToMany(UserModel, { through: 'ChatUser' });

GroupModel.belongsToMany(UserModel, { through: 'GroupUser' });
UserModel.belongsToMany(GroupModel, { through: 'GroupUser' });
MessageModel.belongsTo(GroupModel);
GroupModel.hasMany(MessageModel);

MessageModel.belongsTo(ChatModel);
ChatModel.hasMany(MessageModel);

// db.sync({ force: true })
//   .then(() => seed())
//   .catch(error => console.log(error));