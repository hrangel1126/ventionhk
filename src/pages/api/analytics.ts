import type { APIRoute } from 'astro';
import { systemRole, output, summaryCvs } from '../../prompts/prompts';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

const res = (body: object) =>
  new Response(JSON.stringify(body), {
    status: 200,
  });

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json();
    const transcription = body.transcription;

    try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemRole,
        },
        {
          role: 'system',
          content: summaryCvs,
        },
        {
          role: 'user',
          content: `The client requirements are available here in the next conversation: ${transcription}`,
        },
        {
          role: 'system',
          content: output,
        },
      ],
    });

      const content = completion.choices[0].message.content
      const response = JSON.parse(content || '');
      console.log({ response })

      return res(response);
    } catch (error) {
      const res = {
        error: error.message,
        input: transcription
      }
      console.error(res);
      return new Response(JSON.stringify(res), { status: 500 });
    }
  }
  return new Response(null, { status: 400 });
};
