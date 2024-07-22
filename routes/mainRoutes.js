import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('home.ejs'); 
});

router.get('/login', (req, res) => {
    res.render('login.ejs'); 
});

router.get('/register', (req, res) => {
    res.render('register.ejs'); 
});

export default router;