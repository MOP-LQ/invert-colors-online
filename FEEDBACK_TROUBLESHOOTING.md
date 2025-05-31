# Feedback Form Troubleshooting Guide

## 🚨 Current Issue: Network Error on Form Submission

### Quick Diagnosis Steps

1. **Test API Endpoint Directly**
   ```bash
   # Test if the API route is accessible
   curl http://localhost:4321/api/test
   ```

2. **Check Browser Console**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Submit the feedback form
   - Look for detailed error messages

3. **Check Network Tab**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Submit the feedback form
   - Check if the request to `/api/feedback` is made and what the response is

### Most Likely Causes & Solutions

#### 1. **Supabase RLS Policy Issue** (Most Common)

**Problem**: The feedback table doesn't allow anonymous inserts.

**Solution**: Run this SQL in your Supabase SQL Editor:
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'feedback';

-- If RLS is enabled, check policies
SELECT * FROM pg_policies WHERE tablename = 'feedback';

-- Create the required policy if missing
CREATE POLICY "Allow anonymous insert" ON feedback
  FOR INSERT 
  TO anon 
  WITH CHECK (true);
```

#### 2. **Table Doesn't Exist**

**Problem**: The feedback table hasn't been created in Supabase.

**Solution**: Create the table using the SQL from `docs/supabase-setup.md`:
```sql
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  suggestion TEXT NOT NULL CHECK (char_length(suggestion) >= 10 AND char_length(suggestion) <= 500),
  email VARCHAR(255),
  timestamp TIMESTAMPTZ NOT NULL,
  user_agent TEXT,
  page_url TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'implemented', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. **Wrong Supabase Configuration**

**Problem**: The Supabase URL or API key is incorrect.

**Solution**: Verify in `src/pages/api/feedback.ts`:
- Check if `SUPABASE_URL` matches your project URL
- Check if `SUPABASE_ANON_KEY` is the correct anon key from your project settings

#### 4. **CORS Issues**

**Problem**: Cross-origin requests are being blocked.

**Solution**: Already implemented CORS headers in the API. If still having issues, check Supabase project settings for allowed origins.

### Testing Steps

1. **Test the test API endpoint**:
   ```javascript
   fetch('/api/test', { method: 'GET' })
     .then(r => r.json())
     .then(console.log)
   ```

2. **Test the feedback API with minimal data**:
   ```javascript
   fetch('/api/feedback', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       suggestion: 'Test feedback message',
       timestamp: new Date().toISOString(),
       user_agent: 'Test',
       page_url: window.location.href
     })
   }).then(r => r.json()).then(console.log)
   ```

3. **Test Supabase directly**:
   ```javascript
   fetch('https://wvlolngrludhrzlnfycc.supabase.co/rest/v1/feedback', {
     method: 'GET',
     headers: {
       'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bG9sbmdybHVkaHJ6bG5meWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzQxNjMsImV4cCI6MjA2NDI1MDE2M30.gxp2ihpAqKJrv07h4uPTTomeW28hcYmC-Bp4xD0BpNE'
     }
   }).then(r => r.text()).then(console.log)
   ```

### Debug Information to Collect

When reporting issues, please provide:

1. **Browser Console Output**: Copy all console messages when submitting the form
2. **Network Tab Details**: Screenshot or details of the failed request
3. **Supabase Project Status**: Confirm the project is active and accessible
4. **Test API Results**: Results from testing `/api/test` endpoint

### Next Steps

1. Open the website at http://localhost:4321
2. Open browser developer tools (F12)
3. Try submitting the feedback form
4. Check console and network tabs for detailed error information
5. Test the `/api/test` endpoint to verify API routing is working
6. If API routing works, the issue is likely with Supabase configuration
