import Community from "../models/Community.js";

// GET /communities: Fetch all communities
export const getCommunities = async (req, res) => {
    try {
        const communities = await Community.findAll();
        res.status(200).json(communities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch communities.' });
    }
};

// POST /communities: Create a new community
export const createCommunity = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Community name is required.' });
    }

    try {
        const community = await Community.create({ name });
        res.status(201).json(community);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating community.' });
    }
};

// GET /communities/:id: Fetch a specific community by ID
export const getCommunityById = async (req, res) => {
    const { id } = req.params;

    try {
        const community = await Community.findByPk(id);
        if (!community) {
            return res.status(404).json({ message: 'Community not found.' });
        }
        res.status(200).json(community);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch community.' });
    }
};

// PUT /communities/:id: Update a specific community by ID
export const updateCommunity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Community name is required for update.' });
    }

    try {
        const community = await Community.findByPk(id);
        if (!community) {
            return res.status(404).json({ message: 'Community not found.' });
        }

        community.name = name;
        await community.save();
        res.status(200).json(community);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update community.' });
    }
};

// DELETE /communities/:id: Delete a specific community by ID
export const deleteCommunity = async (req, res) => {
    const { id } = req.params;

    try {
        const community = await Community.findByPk(id);
        if (!community) {
            return res.status(404).json({ message: 'Community not found.' });
        }

        await community.destroy();
        res.status(200).json({ message: 'Community deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete community.' });
    }
};