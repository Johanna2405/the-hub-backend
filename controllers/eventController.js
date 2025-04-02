import Event from "../models/Event.js";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import errorResponse from "../utils/ErrorResponse.js";

// GET /events: Fetch all events
export const getEvents = asyncHandler(async (req, res) => {
    logger.info("A GET request is made to get all the Events")
    const events = await Event.findAll()
    res.status(200).json(events); // Return all users
})

// POST /events: Create a new event
export const createEvent = asyncHandler(async (req, res) => {
    logger.info("A POST request is made to add a new Event")
    const { title, date, start_time, description, type, user_id } = req.body;

    if (!title || !date || !start_time || !description || !type || !user_id) {
        return res.status(400).json({
            message: "Title, date, start_time, description, type and user_id are Required"
        })
    }

    const event = await Event.create({ title, date, start_time, description, type, user_id });
    return res.status(201).json(event);
});

// GET /events/:id: Fetch a specific event by ID
export const getEventById = asyncHandler(async (req, res) => {
    logger.info("A GET request is made to get a SINGLE Scorecard with an ID")
    const { id } = req.params;
    const event = await Event.findByPk(id)

    if (!event) {
        return res.status(404).json({ message: "Event not found." })
    }
    res.status(200).json(event); // Return the event details
})

// PUT /events/:id: Update event details for a specific event
export const updateEvent = asyncHandler(async (req, res) => {
    logger.warn("A PUT request is made to UPDATE a specific Event")
    const { id } = req.params;
    const { title, date, start_time, description, type, user_id } = req.body;

    // Validation: Ensure at least one field is provided for update
    if (!title && !date && !start_time && !description && !type && !user_id) {
        return res
            .status(400)
            .json({ message: "Title or date or start_time or description or type or user_id must be provided for Update." });
    }

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
});

// DELETE /events/:id: Delete a specific event by ID
export const deleteEvent = asyncHandler(async (req, res) => {
    // logger.error("A DELETE request is made to DELETE a specific Event")
    const { id } = req.params;

    if (!id) {
        throw new errorResponse("Event ID is required in the URL", 400);
    }
    const event = await Event.findByPk(id);
    
    if (!event) {
        throw new errorResponse(`Event with id ${id} not found`, 404);
    }
    await event.destroy(); // Delete the event from the database
    res.status(200).json({ message: "Event deleted successfully." });
});