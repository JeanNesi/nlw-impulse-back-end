"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe("Submit feedback", () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "data:image/png;base64"
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled;
        expect(sendMailSpy).toHaveBeenCalled;
    });
    it('Should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    });
    it('Should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    });
    it('Should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "teste.jpg"
        })).rejects.toThrow();
    });
});
