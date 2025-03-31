import Event from "../models/Event.js";

// GET /events: Fetch all events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll()
        res.status(200).json(events); // Return all users
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch users." });
    }
}

// POST /events: Create a new event
export const createEvent = async (req, res) => {
    const { title, date, start_time, description, type, user_id } = req.body;

    if (!title || !date || !start_time || !description || !type || !user_id) {
        return res.status(400).json({
            message: "Title, date, start_time, description, type and user_id are Required"
        })
    }

    try {
        const event = await Event.create({ title, date, start_time, description, type, user_id });

        return res.status(201).json(event);

    } catch (error) {
        // If it's a Sequelize validation error, respond with the details
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map((error) => error.message),
            });
        }

        return res.status(500).json({
            message: "Error creating Event",
            error: error.message,
        });
    }
};

// GET /events/:id: Fetch a specific event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id)

        if (!event) {
            return res.status(404).json({ message: "Event not found." })
        }
        res.status(200).json(event); // Return the event details

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch event." });
    }
}

// PUT /events/:id: Update event details for a specific event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, start_time, description, type, user_id } = req.body;

    // Validation: Ensure at least one field is provided for update
    if (!title && !date && !start_time && !description && !type && !user_id) {
        return res
            .status(400)
            .json({ message: "Title or date or start_time or description or type or user_id must be provided for Update." });
    }

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        // Update the event details
        if (title) event.title = title;
        if (date) event.date = date;
        if (start_time) event.start_time = start_time;
        if (description) event.description = description;
        if (type) event.type = type;
        if (user_id) event.user_id = user_id;

        await event.save(); // Save the updated event

        res.status(200).json(event); // Respond with the updated event
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update event." });
    }
};

// DELETE /events/:id: Delete a specific event by ID
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        await event.destroy(); // Delete the event from the database
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event." });
    }
};