import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  console.log('Test API: GET request received');
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Test API is working!',
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  console.log('Test API: POST request received');
  try {
    const body = await request.json();
    console.log('Test API: Request body:', body);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test POST API is working!',
        receivedData: body,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Test API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Test API error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
