const express= require('express');
const app = express();
const cors =require('cors');
app.use(express.json());
app.use(cors());
const db = require('./models');

const userRouter = require('./routes/Users');
app.use("/user", userRouter);
const collectionsRouter = require('./routes/Collections');
app.use("/collections", collectionsRouter);
const commentRouter = require('./routes/Comments');
app.use("/comments", commentRouter);
const itemsRouter = require('./routes/Items');
app.use("/items", itemsRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);





db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server running");
    })
})
