const Joi = require('joi');
function validateQuestion(bean) {
    const schema = Joi.object({
    question_bank_id: Joi.number().integer().required().label("Question Bank"),
    question_name: Joi.string().min(5).max(50).required().label("Question"),
    answer_take_time: Joi.number().integer().required().label("Answer Time"),
    question_type: Joi.number().integer().required().label("Type"),
    createdAt:Joi.date().label("Created At")
  });
  return schema.validate(bean);
}
exports.validateQuestion = validateQuestion;