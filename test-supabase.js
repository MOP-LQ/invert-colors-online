// Test Supabase connection and table structure
const SUPABASE_URL = 'https://wvlolngrludhrzlnfycc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bG9sbmdybHVkaHJ6bG5meWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzQxNjMsImV4cCI6MjA2NDI1MDE2M30.gxp2ihpAqKJrv07h4uPTTomeW28hcYmC-Bp4xD0BpNE';

async function testSupabaseTable() {
  console.log('Testing Supabase table access...\n');

  // Test 1: Check if we can read from the feedback table
  try {
    console.log('1. Testing table read access...');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback?select=*&limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('   Status:', response.status);
    const data = await response.text();
    console.log('   Response:', data);
    
    if (response.ok) {
      console.log('   ✅ Table read access successful');
    } else {
      console.log('   ❌ Table read access failed');
    }
  } catch (error) {
    console.error('   ❌ Table read error:', error.message);
  }

  // Test 2: Check if we can insert into the feedback table
  try {
    console.log('\n2. Testing table insert access...');
    const testData = {
      suggestion: 'Test feedback from script - please ignore',
      email: null,
      timestamp: new Date().toISOString(),
      user_agent: 'Test Script',
      page_url: 'test://script',
      status: 'new',
      created_at: new Date().toISOString()
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(testData)
    });

    console.log('   Status:', response.status);
    const responseText = await response.text();
    console.log('   Response:', responseText);
    
    if (response.ok) {
      console.log('   ✅ Table insert access successful');
    } else {
      console.log('   ❌ Table insert access failed');
    }
  } catch (error) {
    console.error('   ❌ Table insert error:', error.message);
  }

  // Test 3: Check table schema
  try {
    console.log('\n3. Testing table schema...');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/feedback?select=*&limit=0`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('   Status:', response.status);
    console.log('   Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      console.log('   ✅ Table schema accessible');
    } else {
      console.log('   ❌ Table schema not accessible');
    }
  } catch (error) {
    console.error('   ❌ Table schema error:', error.message);
  }
}

// Run the test
testSupabaseTable().then(() => {
  console.log('\nTest completed.');
}).catch(error => {
  console.error('Test failed:', error);
});
