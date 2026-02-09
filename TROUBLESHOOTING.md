# Ticket Tailor Sync Troubleshooting Guide

## Changes Made

I've added comprehensive debugging to your dashboard. Here's what's new:

### 1. **Console Logging**
- Every sync attempt now logs detailed information to the browser console
- You'll see exactly which events are being synced and any errors that occur
- Look for emoji indicators: 🔄 (starting), ✅ (success), ❌ (error)

### 2. **Configuration Status Panel**
- In Settings, there's now a blue "Configuration Status" panel
- Shows: API key status, proxy settings, mapped events count, last sync time
- Click "View Full Diagnostic Info" to see complete configuration

### 3. **Better Error Messages**
- The sync function now checks if events are mapped before trying to sync
- Partial sync errors are reported (if some events succeed but others fail)
- Network/CORS errors are specifically identified

## How to Debug

### Step 1: Open Browser Console
1. Press **F12** (or Cmd+Option+I on Mac) to open Developer Tools
2. Click the **Console** tab
3. Keep it open while testing

### Step 2: Check Configuration
1. Go to the **Settings** tab
2. Look at the "Configuration Status" panel:
   - ✓ API Key should be configured
   - Check how many events are mapped (need at least 1)
   - Note if CORS proxy is enabled

### Step 3: Test the Sync
1. Click the **"Sync Ticket Tailor"** button
2. Watch the console output
3. Look for these messages:
   - `🔄 Sync button clicked` - Confirms button works
   - `API Key present: true` - API key is loaded
   - `Mapped events count: X` - Shows how many events to sync
   - `📊 Syncing [event name]` - Processing each event
   - `✓ Got X tickets` - Successfully fetched data
   - `✗ Error` - Something went wrong

### Common Issues & Solutions

#### ❌ "No events mapped"
**Solution:** Go to Settings → Event Mappings → Map at least one event

#### ❌ CORS Error
**Solutions:**
1. Enable "Use CORS Proxy" in Settings
2. Try different proxy (corsproxy.io or allorigins.win)
3. Some proxies may be rate-limited or down

#### ❌ "API Error (401)"
**Solution:** Invalid API key. Get a new one from Ticket Tailor

#### ❌ "API Error (403)"
**Solution:** API key doesn't have correct permissions

#### ❌ Nothing in console when clicking Sync
**Possible causes:**
1. JavaScript error elsewhere on the page
2. Check console for any red error messages
3. Try clearing browser cache and reloading (Cmd+Shift+R or Ctrl+Shift+R)

#### ❌ Button doesn't respond
**Solution:**
1. Check if API key is configured (Settings tab)
2. Look for JavaScript errors in console (red text)
3. Try clicking "View Full Diagnostic Info" to verify configuration

## Manual Testing Steps

1. **Test API Connection**
   - Go to Settings tab
   - Click "Refresh Events List"
   - If events load, your API key works ✅
   - If error appears, check the error message

2. **Test Sync**
   - Ensure at least one event is mapped
   - Click "Sync Ticket Tailor" from any page
   - Watch console for progress
   - Check if "Last sync" time updates in header

3. **Verify Data**
   - Go to Overview tab
   - Check if ticket numbers updated
   - Go to Actuals tab
   - See if revenue updated for mapped events

## Get Support

If you're still having issues, send me:
1. Screenshot of the Configuration Status panel
2. Copy of console output when clicking Sync
3. Any error messages that appear

## Next Steps

Once we identify the specific error from the console logs, I can:
- Fix CORS issues
- Adjust API endpoints
- Add fallback error handling
- Create a local proxy server if needed
