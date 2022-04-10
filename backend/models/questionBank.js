const Joi = require('joi');
function validateQuestionBank(bean) {
  const schema = Joi.object({
    take_duration: Joi.number().integer(),
    examine_id: Joi.number().integer().required().label("Examine"),
    createdAt:Joi.date().label("Created At")
  });
  return schema.validate(bean);
}
exports.validateQuestionBank = validateQuestionBank;