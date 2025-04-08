import Joi from "joi";

const communitySchema = {
  POST: Joi.object({
    name: Joi.string().min(2).max(100).required(),
  }),

  PUT: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
  }),
};

export default communitySchema;
