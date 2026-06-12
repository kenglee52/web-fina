const express = require('express');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Serve static files
app.use("/file/cv", express.static(path.join(__dirname, "file/cv")));
app.use("/file/photo", express.static(path.join(__dirname, "file/photo")));
app.use("/file/showpopup", express.static(path.join(__dirname, "file/showpopup")));
app.use("/file/slider", express.static(path.join(__dirname, "file/slider")));
app.use('/file/news', express.static(path.join(__dirname, 'file/news')));
app.use('/file/promotion', express.static(path.join(__dirname, 'file/promotion')));


// Routes
readdirSync('./routes').map((routeFile) => app.use('/api', require(`./routes/${routeFile}`)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
