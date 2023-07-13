const {Router} = require('express');
const viewsRouter = Router();

viewsRouter.get('/chat', (req, res) => {
    res.render('index')
});









module.exports = viewsRouter;