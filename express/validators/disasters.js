const postDisasterValidator = (req, res, next) => {
    res.locals.errors = [];

    if (!req.body.title || req.body.title.trim() === '') {
        res.locals.errors.push({ field: 'title', message: 'Title is required' });
    }
    if (!req.body.location || req.body.location.trim() === '') {
        res.locals.errors.push({ field: 'location', message: 'Location is required' });
    }
    if (!req.body.type_id) {
        res.locals.errors.push({ field: 'type_id', message: 'Disaster type is required' });
    }
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    if (!validSeverities.includes(req.body.severity)) {
        res.locals.errors.push({ field: 'severity', message: 'Must be low/medium/high/critical' });
    }
    if (!req.body.reporter || req.body.reporter.trim() === '') {
        res.locals.errors.push({ field: 'reporter', message: 'Reporter name is required' });
    }
    const validOrgs = ['NGO', 'GO', 'Individual'];
    if (!validOrgs.includes(req.body.org_type)) {
        res.locals.errors.push({ field: 'org_type', message: 'Must be NGO, GO, or Individual' });
    }

    next();
};

export { postDisasterValidator };
