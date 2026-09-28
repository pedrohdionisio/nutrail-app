import { HttpResponse, http } from 'msw';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import type { IMealSummary } from 'shared/entities/IMealSummary';
import { apiUrl } from './apiUrl';
import { buildMeal, buildMealDetails, buildMealsOfDay } from './fixtures/meal';
import { server } from './server';

const UPLOAD_URL = 'https://uploads.test/';

const ANALYZED_MEAL = buildMealDetails({ id: 'meal-9' });

interface IMockMealAnalysisApiParams {
  statuses?: IMealDetails['status'][];
}

export function mockMealAnalysisApi({ statuses = ['SUCCESS'] }: IMockMealAnalysisApiParams = {}) {
  const calls = { created: [] as unknown[], s3Uploads: 0, polls: 0 };
  let meals: IMealSummary[] = [];

  server.use(
    http.get(apiUrl('/meals'), ({ request }) =>
      HttpResponse.json(buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', meals))
    ),
    http.post(apiUrl('/meals'), async ({ request }) => {
      calls.created.push(await request.json());

      return HttpResponse.json(
        { mealId: 'meal-9', upload: { url: UPLOAD_URL, fields: { key: 'inputs/meal-9' } } },
        { status: 201 }
      );
    }),
    http.post(UPLOAD_URL, () => {
      calls.s3Uploads += 1;

      return new HttpResponse(null, { status: 204 });
    }),
    http.get(apiUrl('/meals/:mealId'), () => {
      const status = statuses[Math.min(calls.polls, statuses.length - 1)] ?? 'SUCCESS';
      calls.polls += 1;

      if (status === 'SUCCESS') {
        meals = [buildMeal({ id: 'meal-9', name: ANALYZED_MEAL.name ?? '', calories: 630 })];
      }

      return HttpResponse.json({ ...ANALYZED_MEAL, status });
    })
  );

  return calls;
}
