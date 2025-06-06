import type { APIRoute } from 'astro';

// Supabase configuration
const SUPABASE_URL = 'https://wvlolngrludhrzlnfycc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bG9sbmdybHVkaHJ6bG5meWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzQxNjMsImV4cCI6MjA2NDI1MDE2M30.gxp2ihpAqKJrv07h4uPTTomeW28hcYmC-Bp4xD0BpNE';

interface FeedbackData {
  suggestion: string;
  email?: string | null;
  timestamp: string;
  user_agent: string;
  page_url: string;
}

export const POST: APIRoute = async ({ request }) => {
  console.log('Feedback API: Received POST request');
  try {
    // Parse request body
    const body: FeedbackData = await request.json();
    console.log('Feedback API: Parsed request body:', body);

    // Validate required fields
    if (!body.suggestion || body.suggestion.trim().length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Suggestion must be at least 10 characters long'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.suggestion.length > 500) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Suggestion cannot exceed 500 characters'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format if provided
    if (body.email && body.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Please enter a valid email address'
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Prepare data for Supabase
    const feedbackData = {
      suggestion: body.suggestion.trim(),
      email: body.email?.trim() || null,
      timestamp: body.timestamp,
      user_agent: body.user_agent,
      page_url: body.page_url,
      status: 'new',
      created_at: new Date().toISOString()
    };

    // Submit to Supabase
    console.log('Feedback API: Submitting to Supabase:', feedbackData);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(feedbackData)
    });
    console.log('Feedback API: Supabase response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Database error, please try again later'
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

    // Success response
    console.log('Feedback API: Returning success response');
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Feedback submitted successfully! Thank you for your suggestion.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );

  } catch (error) {
    console.error('Feedback API error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server error, please try again later'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Handle OPTIONS request for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
