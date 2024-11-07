import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Initialize Sequelize with either a DB URL or individual credentials
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL) // Connect using URL if available
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres', // Use PostgreSQL as the database
      dialectOptions: {
        decimalNumbers: true, // Enable handling of decimal numbers
      },
    });

// Initialize the User and Ticket models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
// Set up model associations
User.hasMany(Ticket, { foreignKey: 'assignedUserId' }); // A User can have many Tickets
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'}); // A Ticket belongs to a User

export { sequelize, User, Ticket };
