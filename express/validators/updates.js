const postUpdateValidator = (req, res, next) => {
    res.locals.errors = [];

    if (!req.body.disaster_id) {
        res.locals.errors.push({ field: 'disaster_id', message: 'disaster_id is required' });
    }
    if (!req.body.message || req.body.message.trim() === '') {
        res.locals.errors.push({ field: 'message', message: 'Message is required' });
    }
    if (!req.body.author || req.body.author.trim() === '') {
        res.locals.errors.push({ field: 'author', message: 'Author is required' });
    }

    next();
};

export { postUpdateValidator };
