import updatesModel from '../models/updates.js';

const getUpdates = (req, res) => {
    const { disaster_id } = req.query;
    if (!disaster_id) {
        return res.status(400).json({ status: 400, message: 'disaster_id query param required' });
    }
    const updates = updatesModel.getByDisaster(disaster_id);
    res.json({
        data: updates,
        links: { self: `/api/v1/updates?disaster_id=${disaster_id}` }
    });
};

const postUpdate = (req, res) => {
    if (res.locals.errors.length !== 0) {
        return res.status(400).json({ status: 400, message: res.locals.errors });
    }
    const result = updatesModel.insert(req.body);
    if (result.status === 'error') {
        return res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
    res.status(201).json({
        data: { id: result.id, ...req.body },
        links: { self: `/api/v1/updates?disaster_id=${req.body.disaster_id}` }
    });
};

export { getUpdates, postUpdate };
