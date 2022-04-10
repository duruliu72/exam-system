const Joi = require('joi');
function validateCandidateAnswer(bean) {
    const schema = Joi.object({
    question_bank_id: Joi.number().integer().required().label("Question Bank"),
    question_id: Joi.number().integer().required().label("Question"),
    question_child_id: Joi.number().integer().required().label("Question Child"),
    serial_no: Joi.number().integer().required().label("Serial no"),
    candidate_id: Joi.number().integer().required().label("Candidate"),
  });
  return schema.validate(bean);
}
exports.validateCandidateAnswer = validateCandidateAnswer;