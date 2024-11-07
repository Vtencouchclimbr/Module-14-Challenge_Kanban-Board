import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

// Define the TicketAttributes interface for the properties of a Ticket
interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number; // Optional foreign key to associate with a User
}

// Define optional attributes for ticket creation (id is optional on creation)
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

// Define the Ticket class, extending Sequelize's Model with attributes and creation attributes
export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;

  // Associated User model instance for the assigned user
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;  // Timestamp for creation
  public readonly updatedAt!: Date;  // Timestamp for last update
}

// Define a factory function to initialize the Ticket model with Sequelize
export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ticket name is required
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false, // Ticket name is required
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false, // Ticket name is required
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true, // User ID is optional, as the ticket may be unassigned
      },
    },
    {
      tableName: 'tickets',  // Name of the table in the database
      sequelize,
    }
  );

  return Ticket; // Return the initialized Ticket model
}
