import models from "../models/index.js";
const { User, Community } = models;

// GET /users: Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Community,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// POST /users: Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, profilePicture, community_id } = req.body;
  console.log("Received data:", req.body);
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required.",
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      profile_picture: profilePicture ?? null,
      community_id: community_id ?? null,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profile_picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors.map((error) => error.message),
      });
    }

    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// GET /users/:id: Fetch a specific user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Community,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

// PUT /users/:id: Update user details for a specific user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, profilePicture, community_id } = req.body;

  if (!username && !email && !profilePicture && !community_id) {
    return res.status(400).json({
      message:
        "At least one field (username, email, profilePicture, community_id) must be provided for update.",
    });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profile_picture = profilePicture;
    if (community_id !== undefined) user.community_id = community_id;

    await user.save();

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profile_picture,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ message: "Failed to update user." });
  }
};

// DELETE /users/:id: Delete a specific user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy(); // Delete the user from the database
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};
