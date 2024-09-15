import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json();
    const transcription = body.transcription;
    return new Response(
      JSON.stringify({
        transcription,
        candidates: [
          {
            candidateName: 'Diego Gonzalez',
            description:
              'Diego has over 6 years of experience, with expertise in backend development using Python and AWS services. His background in building microservices, REST APIs, and DevOps pipelines is crucial for scaling the fintech MVP. His leadership experience makes him well-suited for a small, dynamic team.',
            percentage: '85%',
            topSkills:
              'Python, AWS (Lambda, DynamoDB, S3, RDS), Serverless Framework, REST APIs, Django, CI/CD (CircleCI, GitLab CI)',
          },
          {
            candidateName: 'Guillermo Garcia',
            description:
              'Guillermo brings 6+ years of experience in backend and mobile development, with strong exposure to cloud-based solutions and startups. His knowledge of .NET, Java, and C++ is valuable for building robust systems, and his familiarity with AWS adds to his versatility for a fintech environment.',
            percentage: '75%',
            topSkills: '.NET, Scala, Kotlin, AWS, Docker, REST APIs, TeamCity',
          },
          {
            candidateName: 'José Angel García Ruiz',
            description:
              'With 6+ years of experience, Angel has a strong full-stack profile and excellent JavaScript/Node.js and React skills, which are highly relevant for building both the frontend and backend of a fintech application. His work with microservices and scalability makes him a solid fit for a small, growing fintech team.',
            percentage: '80%',
            topSkills: 'Node.js, React, GraphQL, MongoDB, AWS, Docker, Jest',
          },
          {
            candidateName: 'Adair Hernandez',
            description:
              "Adair has 3+ years of full-stack experience with a focus on JavaScript, React, and Node.js. His hands-on work with AWS and Docker aligns well with the client's needs, but his relatively shorter experience may need complementing by more senior team members.",
            percentage: '65%',
            topSkills:
              'JavaScript, React, Node.js, AWS, Docker, MySQL, PostgreSQL',
          },
        ],
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};
