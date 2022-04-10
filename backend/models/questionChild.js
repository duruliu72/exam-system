const Joi = require('joi');
function validateQuestionChild(bean) {
  const schema = Joi.object({
    question_id: Joi.number().integer().required().label("Question ID"),
    answer: Joi.string().min(1).required().label("Answer"),
    serial_no: Joi.number().integer().required().label("Serial no"),
    isRihgtAnswer: Joi.number().integer().required().label("Is Right Answer"),
  });
  return schema.validate(bean);
}
exports.validateQuestionChild = validateQuestionChild;