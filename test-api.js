// Test script for feedback API
async function testFeedbackAPI() {
  const testData = {
    suggestion: "This is a test feedback message with more than 10 characters",
    email: "test@example.com",
    timestamp: new Date().toISOString(),
    user_agent: "Test Script",
    page_url: "http://localhost:4321/test"
  };

  try {
    console.log('Testing feedback API...');
    console.log('Test data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:4321/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.text();
    console.log('Response body:', responseData);
    
    if (response.ok) {
      console.log('✅ API test successful!');
    } else {
      console.log('❌ API test failed');
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.error('Error details:', error);
  }
}

// Test Supabase connection directly
async function testSupabaseConnection() {
  const SUPABASE_URL = 'https://wvlolngrludhrzlnfycc.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bG9sbmdybHVkaHJ6bG5meWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzQxNjMsImV4cCI6MjA2NDI1MDE2M30.gxp2ihpAqKJrv07h4uPTTomeW28hcYmC-Bp4xD0BpNE';

  try {
    console.log('\nTesting Supabase connection...');
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      }
    });

    console.log('Supabase response status:', response.status);
    const responseData = await response.text();
    console.log('Supabase response:', responseData);
    
    if (response.ok) {
      console.log('✅ Supabase connection successful!');
    } else {
      console.log('❌ Supabase connection failed');
    }
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
  }
}

// Run tests
console.log('Starting API tests...\n');
testSupabaseConnection().then(() => {
  testFeedbackAPI();
});
