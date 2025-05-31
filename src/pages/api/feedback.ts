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
  try {
    // Parse request body
    const body: FeedbackData = await request.json();

    // Validate required fields
    if (!body.suggestion || body.suggestion.trim().length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          message: '建议内容至少需要10个字符'
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
          message: '建议内容不能超过500个字符'
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
            message: '请输入有效的邮箱地址'
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          message: '数据库错误，请稍后重试'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: '反馈提交成功！感谢您的建议。'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Feedback API error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: '服务器错误，请稍后重试'
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
