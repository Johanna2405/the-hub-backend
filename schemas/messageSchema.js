import Joi from "joi";

const messageSchema = {
  POST: Joi.object({
    user_id: Joi.number().integer().required(),
    content: Joi.string().allow(null, "").optional(), // allows empty or null content
  }),

  PUT: Joi.object({
    user_id: Joi.number().integer().optional(),
    content: Joi.string().allow(null, "").optional(),
  }),
};

export default messageSchema;
