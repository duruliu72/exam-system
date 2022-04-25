const Joi = require('joi');
function validateQuestionChild(bean) {
  const schema = Joi.object({
    question_id: Joi.number().integer().required().label("Question ID"),
    answer_char: Joi.string().min(1).required().label("Answer Char"),
    answer: Joi.string().min(1).required().label("Answer"),
    isRihgtAnswer: Joi.number().integer().required().label("Is Right Answer"),
  });
  return schema.validate(bean);
}
exports.validateQuestionChild = validateQuestionChild;