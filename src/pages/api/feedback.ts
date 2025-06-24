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

// Helper function to validate Supabase connection
async function validateSupabaseConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Supabase connection validation failed:', error);
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  console.log('Feedback API: Received POST request');
  try {
    // Validate Supabase connection first
    const isConnectionValid = await validateSupabaseConnection();
    if (!isConnectionValid) {
      console.error('Feedback API: Supabase connection failed validation');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Database connection error, please try again later'
        }),
        {
          status: 503, // Service Unavailable
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Parse request body
    let body: FeedbackData;
    try {
      body = await request.json();
      console.log('Feedback API: Parsed request body:', body);
    } catch (parseError) {
      console.error('Feedback API: JSON parse error:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid request format'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

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
      timestamp: body.timestamp || new Date().toISOString(), // Fallback if timestamp is missing
      user_agent: body.user_agent || 'Not provided',
      page_url: body.page_url || 'Not provided',
      status: 'new',
      created_at: new Date().toISOString()
    };

    // Submit to Supabase with timeout
    console.log('Feedback API: Submitting to Supabase:', feedbackData);
    
    // Use AbortController to implement timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(feedbackData),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
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
            status: 502, // Bad Gateway - more accurate for external service failure
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
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      console.error('Feedback API: Fetch error:', fetchError);
      
      // Check if the error was due to timeout
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Request timed out, please try again later'
          }),
          {
            status: 504, // Gateway Timeout
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw fetchError; // Re-throw to be caught by outer try-catch
    }

  } catch (error) {
    console.error('Feedback API error:', error);

    // Determine if error has a message property
    let errorMessage = 'Server error, please try again later';
    if (error instanceof Error) {
      errorMessage = `Server error: ${error.message}`;
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage
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
