const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import express from 'express';
import routes from './routes/index.js'; // Ensure this path is correct
import { sequelize } from './models/index.js'; // Ensure this path is correct
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files from the client's dist folder
app.use(express.static('../client/dist/assets'));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(routes); // Use the imported routes
// Sync the Sequelize database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
