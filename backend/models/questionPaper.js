const Joi = require('joi');
function validateQuestionPaper(bean) {
  const schema = Joi.object({
    question_bank_id: Joi.number().integer().required().label("Qbankid"),
    name: Joi.string().min(1).required().label("Name"),
    duration: Joi.number().integer(),
    created_by: Joi.number().integer().required().label("Examine"),
    created_at:Joi.date().label("Created At")
  });
  return schema.validate(bean);
}
exports.validateQuestionPaper = validateQuestionPaper;