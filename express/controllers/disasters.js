import disastersModel from '../models/disasters.js';

const getDisasters = (req, res) => {
    const { limit, offset, severity } = req.query;
    const disasters = disastersModel.getAll({ limit, offset, severity });
    res.json({
        data: disasters,
        links: { self: '/api/v1/disasters' }
    });
};

const getDisaster = (req, res) => {
    const disaster = disastersModel.getById(req.params.id);
    if (!disaster) {
        return res.status(404).json({ status: 404, message: 'Disaster not found' });
    }
    res.json({
        data: disaster,
        links: {
            self: `/api/v1/disasters/${disaster.id}`,
            updates: `/api/v1/updates?disaster_id=${disaster.id}`
        }
    });
};

const postDisaster = (req, res) => {
    if (res.locals.errors.length !== 0) {
        return res.status(400).json({ status: 400, message: res.locals.errors });
    }
    const result = disastersModel.insert(req.body);
    if (result.status === 'error') {
        return res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
    res.status(201).json({
        data: { id: result.id, ...req.body },
        links: { self: `/api/v1/disasters/${result.id}` }
    });
};

export { getDisasters, getDisaster, postDisaster };
