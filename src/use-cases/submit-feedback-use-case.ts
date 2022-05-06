import { FeedbacksRepository } from './../repositories/feedbacks-repositories';
import { MailAdapter } from '../adapters/mail-adapter'

interface SubmitFeedbackUseCaseRequest{
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase{
constructor(
  private feedbacksRepository:  FeedbacksRepository,
  private mailAdapter: MailAdapter,
){}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request

    if (!type ){
      throw new Error('Type is required')
    }

    if (!comment){
      throw new Error('comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
      }
    )
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body:  [
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot ?  `<img src="${screenshot}">` : ''
      ].join('')
    })
  }
}