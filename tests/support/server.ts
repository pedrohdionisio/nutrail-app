import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/native';
import { apiUrl } from './apiUrl';
import { buildMe } from './fixtures/me';
import { buildMealsOfDay } from './fixtures/meal';

export const server = setupServer(
  http.get(apiUrl('/me'), () => HttpResponse.json(buildMe())),
  http.get(apiUrl('/meals'), ({ request }) =>
    HttpResponse.json(buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? ''))
  )
);
