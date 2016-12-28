import Promise from 'bluebird';
import bcryptNode from 'bcrypt-nodejs';
const bcrypt = Promise.promisifyAll(bcryptNode);
import { deriveAddress } from '../../../utils/bitcoin';


// Other oauthtypes to be added

/* eslint-disable no-param-reassign */
function hashPassword(user) {
  if (!user.changed('password')) return null;
  return bcrypt.genSaltAsync(5).then((salt) =>
    bcrypt.hashAsync(user.password, salt, null).then((hash) => {
      user.password = hash;
    })
  );
}
/* eslint-enable no-param-reassign */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    bitcoinAddress: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.get('id') ? deriveAddress(parseInt(this.get('id'))) : '';
      }
    },
    username: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    google: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {
        User.hasMany(models.Token, {
          foreignKey: 'userId'
        });
      }
    },

    instanceMethods: {
      comparePassword(candidatePassword) {
        return bcrypt.compareAsync(candidatePassword, this.password);
      },

      toJSON() {
        return {
          id: this.id,
          username: this.username,
          bitcoinAddress: this.bitcoinAddress,
          profile: {
            picture: this.picture
          }
        };
      }
    }
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
