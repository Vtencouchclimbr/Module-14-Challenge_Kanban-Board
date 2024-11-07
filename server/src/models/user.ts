import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the UserAttributes interface for the properties of a User
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define optional attributes for user creation (id is optional on creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class, extending Sequelize's Model with attributes and creation attributes
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;  // Timestamp for creation
  public readonly updatedAt!: Date;  // Timestamp for last update

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define a factory function to initialize the User model with Sequelize
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,       // Username is required
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,       // Username is required
      },
    },
    {
      tableName: 'users',       // Name of the table in the database
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password); // Hash password before creating user
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password); // Hash password before updating user
        },
      }
    }
  );

  return User; // Return the initialized User model
}
