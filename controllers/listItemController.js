import ListItem from '../models/ListItem.js';

// GET /list-items: Fetch all list items
export const getListItems = async (req, res) => {
    try {
        const listItems = await ListItem.findAll();
        res.status(200).json(listItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch list items.' });
    }
};

// POST /list-items: Create a new list item
export const createListItem = async (req, res) => {
    const { list_id, name, title, is_completed } = req.body;

    if (!list_id || !name || !title) {
        return res.status(400).json({
            message: 'List ID, name, and title are required.',
        });
    }

    try {
        const listItem = await ListItem.create({
            list_id,
            name,
            title,
            is_completed: is_completed ?? false,
        });

        res.status(201).json(listItem);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map((err) => err.message),
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Error creating list item',
            error: error.message,
        });
    }
};

// GET /list-items/:id: Fetch a specific list item by ID
export const getListItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const listItem = await ListItem.findByPk(id);

        if (!listItem) {
            return res.status(404).json({ message: 'List item not found.' });
        }

        res.status(200).json(listItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch list item.' });
    }
};

// PUT /list-items/:id: Update list item details
export const updateListItem = async (req, res) => {
    const { id } = req.params;
    const { list_id, name, title, is_completed } = req.body;

    if (!list_id && !name && !title && is_completed === undefined) {
        return res.status(400).json({
            message: 'At least one field (list_id, name, title, is_completed) must be provided for update.',
        });
    }

    try {
        const listItem = await ListItem.findByPk(id);

        if (!listItem) {
            return res.status(404).json({ message: 'List item not found.' });
        }

        if (list_id) listItem.list_id = list_id;
        if (name) listItem.name = name;
        if (title) listItem.title = title;
        if (is_completed !== undefined) listItem.is_completed = is_completed;

        await listItem.save();

        res.status(200).json(listItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update list item.' });
    }
};

// DELETE /list-items/:id: Delete a specific list item by ID
export const deleteListItem = async (req, res) => {
    const { id } = req.params;

    try {
        const listItem = await ListItem.findByPk(id);

        if (!listItem) {
            return res.status(404).json({ message: 'List item not found.' });
        }

        await listItem.destroy();
        res.status(200).json({ message: 'List item deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete list item.' });
    }
};