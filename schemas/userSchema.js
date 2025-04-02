import Joi from "joi";

const userSchema = {
  POST: Joi.object({
    community_id: Joi.number().integer().required(),
    username: Joi.string().max(64).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
    profile_picture: Joi.string().uri().max(255).optional().allow(null),
  }),

  PUT: Joi.object({
    community_id: Joi.number().integer().optional(),
    username: Joi.string().max(64).optional(),
    email: Joi.string().email().max(255).optional(),
    password: Joi.string().max(255).optional(),
    profile_picture: Joi.string().uri().max(255).optional().allow(null),
  }),
};

export default userSchema;
