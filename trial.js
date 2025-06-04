const express = require('express');
const path = require('path');
// const { Sequelize, DataTypes } = require('sequelize'); // Uncomment if you define models directly here
// const Client = require('./models/Client'); // Assuming you have Sequelize models in a 'models' folder
// const Statement = require('./models/Statement');
// const FundDetail = require('./models/FundDetail');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Your EJS templates are in the 'views' directory

// Serve static files (like your Bootstrap CSS, and crucially, your chart images)
app.use(express.static(path.join(__dirname, 'public')));

// --- Sequelize and PostgreSQL Setup (Conceptual) ---
// This section is conceptual, demonstrating how you'd typically set up Sequelize.
// You'll likely have this in a separate file (e.g., `config/database.js` or `models/index.js`)
/*
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
    host: 'localhost', // or your PostgreSQL host
    dialect: 'postgres',
    logging: false // set to true to see SQL queries in console
});

// Define your models here or import them from a 'models' directory
// Example simple model (you'll have more detailed ones for your actual data):
const Client = sequelize.define('Client', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    mobile: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    rdn: { type: DataTypes.STRING },
    currency: { type: DataTypes.STRING },
    npwp: { type: DataTypes.STRING },
});

const Statement = sequelize.define('Statement', {
    periodStart: { type: DataTypes.DATEONLY, allowNull: false },
    periodEnd: { type: DataTypes.DATEONLY, allowNull: false },
    signatory: { type: DataTypes.STRING },
    fundType: { type: DataTypes.STRING },
    sharingCommission: { type: DataTypes.INTEGER },
    interim2023: { type: DataTypes.INTEGER },
    netEquityAfterInterim: { type: DataTypes.INTEGER },
    growthRate: { type: DataTypes.INTEGER },
    portfolioPositions: { type: DataTypes.STRING(1000) }, // Use STRING(length) for longer text
    portfolioPositionsDetail: { type: DataTypes.STRING(2000) }, // Use STRING(length) for longer text
});

const FundDetail = sequelize.define('FundDetail', {
    name: { type: DataTypes.STRING, allowNull: false },
    initialEquity: { type: DataTypes.INTEGER },
    gainLossPercentage: { type: DataTypes.INTEGER },
    gainLossIDR: { type: DataTypes.INTEGER },
    endingEquity: { type: DataTypes.INTEGER },
});

// Define associations (e.g., a Client has many Statements, a Statement has many FundDetails)
Client.hasMany(Statement);
Statement.belongsTo(Client);
Statement.hasMany(FundDetail);
FundDetail.belongsTo(Statement);

// Sync models with the database (use `alter: true` for development to avoid dropping data)
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
        // await sequelize.sync({ alter: true }); // Sync models - use `force: true` ONLY in dev if you want to drop/recreate tables
        console.log('Database models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB(); // Call this function to connect and sync when your app starts
*/

// --- Route to render the Client Statement ---
app.get('/client-statement/:id', async (req, res) => {
    // In a real application, you'd fetch data from your PostgreSQL DB using Sequelize
    // For demonstration, we'll use the dummyData that matches your template's expectations.

    let clientData, statementData, fundDetailsData;

    try {
        // --- Real-world data fetching with Sequelize (Conceptual) ---
        // This is what you'd do if your Sequelize models were set up and populated
        /*
        clientData = await Client.findByPk(req.params.id);
        statementData = await Statement.findOne({
            where: { clientId: req.params.id }, // Assuming client statements are linked by client ID
            include: [{ model: FundDetail }] // Include related fund details
        });

        if (!clientData || !statementData) {
            return res.status(404).send('Client statement not found.');
        }

        fundDetailsData = statementData.FundDetails; // Access the included fund details
        */

        // --- Dummy Data (for demonstration) ---
        // Replace this with your actual Sequelize queries once your models are ready.
        // This dummy data precisely matches the structure the EJS template expects.
        clientData = {
            name: 'Angie & Chandra',
            address: 'Jakarta, Indonesia',
            mobile: '+62 859-2153-5508',
            email: '-',
            rdn: '-',
            currency: 'IDR',
            npwp: '-'
        };
        statementData = {
            periodStart: new Date('2020-08-01'), // Use Date objects for proper formatting
            periodEnd: new Date('2023-08-31'),   // Use Date objects for proper formatting
            signatory: 'Sumadi Surianto',
            fundType: 'IDR - Stock',
            sharingCommission: 67886549,
            interim2023: 65000000,
            netEquityAfterInterim: 516668936,
            growthRate: 94,
            // These strings are directly from your image, consider if you want to parse them into structured data for charting
            portfolioPositions: '86% Consumer Goods - INDF & 14% Media Company - SCMA',
            portfolioPositionsDetail: 'Our positions carries 86% Consumer Goods - INDF & 14% Media Company - SCMA. We are very optimistic that current geopolitical, Wheat were near $5.8 per bushel in mid-September, their lowest level in nearly three years, it will bringing fruitful upside of our portfolio.',
        };
        fundDetailsData = [
            {
                name: 'Profound',
                initialEquity: 310122740,
                gainLossPercentage: 88,
                gainLossIDR: 271546196,
                endingEquity: 581668936
            }
            // If you had more rows in the Fund Type table, add more objects here:
            // {
            //    name: 'Another Fund',
            //    initialEquity: 10000000,
            //    gainLossPercentage: 10,
            //    gainLossIDR: 1000000,
            //    endingEquity: 11000000
            // }
        ];

        // --- Prepare data for EJS template ---
        const dataForEjs = {
            client: clientData,
            statement: {
                // Format dates as 'MM/YYYY' for display in EJS
                periodStart: statementData.periodStart.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
                periodEnd: statementData.periodEnd.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
                signatory: statementData.signatory,
            },
            fund: {
                type: statementData.fundType,
                details: fundDetailsData, // Pass the array of fund details
                sharingCommission: statementData.sharingCommission,
                interim2023: statementData.interim2023,
                netEquityAfterInterim: statementData.netEquityAfterInterim,
                growthRate: statementData.growthRate,
                portfolioPositions: statementData.portfolioPositions,
                portfolioPositionsDetail: statementData.portfolioPositionsDetail,
            }
        };

        // Render the EJS template with the prepared data
        res.render('outGraph', dataForEjs);

    } catch (error) {
        console.error('Error fetching or processing client statement data:', error);
        res.status(500).send('Internal Server Error: Could not load client statement.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`View client statement at: http://localhost:${PORT}/client-statement/123 (ID doesn't matter for dummy data)`);
});