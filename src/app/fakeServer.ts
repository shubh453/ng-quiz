import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { QuizCategory } from './quiz/store/quiz-category.model';
import { Questionnaire } from './quiz/store/quiz.model';

const data: Record<number, QuizCategory> = {
    1: {
        name: 'antonyms',
        description: 'Find Opposite',
        id: 1,
        label: 'Antonyms'
    },
    2: {
        name: 'synonyms',
        description: 'Find Same',
        id: 2,
        label: 'Synonyms'
    }
};

const questionnaire: Record<string, Questionnaire> = {
  'antonyms': {
      id: 1,
      category: 'antonyms',
      isComplete: false,
      quizzes: [
        {
          id: 1,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the questions.',
          additionalText: '',
          options: ['abcd', 'kjhfsd', 'lksjd', 'potato'],
        },
        {
          id: 2,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the second questions.',
          additionalText: '',
          options: ['qwqwe', 'sd', 'qw', 'tomato']
        },
        {
          id:3,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the third questions.',
          additionalText: '',
          options: ['qwqasasdwe', 's123d', 'qw1231', 'well']
        },
        {
          id: 4,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is 4 questions.',
          additionalText: '',
          options: ['abcd', 'kjhfsd', 'lksjd', 'potato']
        },
        {
          id: 5,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the 5 questions.',
          additionalText: '',
          options: ['qwqwe', 'sd', 'qw', 'tomato']
        },
        {
          id: 6,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the 6 questions.',
          additionalText: '',
          options: ['qwqasasdwe', 's123d', 'qw1231', 'well']
        },
        {
          id: 7,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the questions.',
          additionalText: '',
          options: ['abcd', 'kjhfsd', 'lksjd', 'potato']
        },
        {
          id: 18,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the second questions.',
          additionalText: '',
          options: ['qwqwe', 'sd', 'qw', 'tomato']
        },
        {
          id:9,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the third questions.',
          additionalText: '',
          options: ['qwqasasdwe', 's123d', 'qw1231', 'well']
        },
        {
          id: 10,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is 4 questions.',
          additionalText: '',
          options: ['abcd', 'kjhfsd', 'lksjd', 'potato']
        },
        {
          id: 11,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the 5 questions.',
          additionalText: '',
          options: ['qwqwe', 'sd', 'qw', 'tomato']
        },
        {
          id: 17,
          answer: 'this sthe correct answer',
          question: 'kjfhhfisdhfsdhfkjshdfkj kjdfht ths is the 6 questions.',
          additionalText: '',
          options: ['qwqasasdwe', 's123d', 'qw1231', 'well']
        }
      ],
      testResult: {
        markedAnswer: {},
        isPassed: false
      }
  },
  'synonyms': {
    id: 1,
    category: 'synonyms',
    isComplete: false,
    quizzes: [
      {
        id: 1,
        answer: 'this sthe synonyms answer',
        question: 'synonyms kjdfht ths is the questions.',
        additionalText: '',
        options: ['abcd', 'kjhfsd', 'lksjd', 'potato']
      },
      {
        id: 2,
        answer: 'this sthe correct answer',
        question: 'synonyms kjdfht ths is the second questions.',
        additionalText: '',
        options: ['qwqwe', 'sd', 'qw', 'tomato']
      },
      {
        id:3,
        answer: 'this sthe correct answer',
        question: 'synonyms kjdfht ths is the third questions.',
        additionalText: '',
        options: ['qwqasasdwe', 's123d', 'qw1231', 'well']
      }
    ],
    testResult: {
      markedAnswer: {},
      isPassed: false
    }
  }
};


@Injectable({
  providedIn: 'root',
})
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, body } = req;

    let id: number;
    let idString: string | undefined;

    if (req.method === 'GET' && req.url.includes('categories')) {
      return of(new HttpResponse({ status: 200, body: Object.values(data) }));
    }

    if (req.method === 'GET' && req.url.includes('questionnaire') && req.params.keys.length == 0) {
      return of(new HttpResponse({ status: 200, body: Object.values(questionnaire) }));
    }
    
    if (req.method === 'GET' && req.url.includes('questionnaire') && req.params.keys.length > 0)
    {
      const category = req.params.get('category');
      if (category) {
        return of(new HttpResponse({ status: 200, body: questionnaire[category] }));
      }
      
      return of(new HttpResponse({ status: 200, body: Object.values(questionnaire) }));
    }

    switch (req.method) {
      case 'GET':
        idString = url.split('/').pop();

        if (!idString) {
          return throwError(() => new HttpErrorResponse({ status: 400 }));
        }
        id = parseInt(idString);
        const obj = data[id];
        if (obj) {
          return of(new HttpResponse({ status: 200, body: obj }));
        }

        return throwError(() => new HttpErrorResponse({ status: 404 }));

      case 'POST':
        idString = Date.now().toString();
        id = parseInt(idString)
        data[id] = {
          ...body,
          idString,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return of(new HttpResponse({ status: 201, body: data[id] }));

      case 'PUT':
        idString = url.split('/').pop();
       
        if (!idString) {
          return throwError(() => new HttpErrorResponse({ status: 400 }));
        }
        id = parseInt(idString)
        if (!data[id]) {
          return throwError(() => new HttpErrorResponse({ status: 404 }));
        }

        data[id] = {
          ...data[id],
          ...body,
          updatedAt: new Date(),
        };

        return of(new HttpResponse({ status: 200, body: data[id] }));

      case 'DELETE':
        idString = url.split('/').pop();

        if (!idString) {
          return throwError(() => new HttpErrorResponse({ status: 400 }));
        }
        id = parseInt(idString)
        delete data[id];

        return of(new HttpResponse({ status: 200, body: id }));

      default:
        return throwError(() => new HttpErrorResponse({ status: 501 }));
    }
  }
}