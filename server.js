const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter.js');

const db = require('./db/db');
const friendRequestRouter = require('./routes/friendRequestRouter.js');

dotenv.config();
db.sequelize.sync();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/media', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

app.use('/api/users',userRouter);
app.use('/api/friends',friendRequestRouter)


app.get('/', (req, res) => {
  res.send('Server is ready');
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});