# Deployment Information

## Live URLs

**Production**: https://ideas-forums-targets.vercel.app
**Alternative**: https://ideas-forums-targets-davidwilliams1601s-projects.vercel.app
**Vercel Dashboard**: https://vercel.com/davidwilliams1601s-projects/ideas-forums-targets

## What's Deployed

✅ **Dashboard** - Full revenue tracking interface
✅ **Serverless Proxy** - `/api/tickettailor` endpoint for Ticket Tailor API
✅ **CORS Fixed** - Authorization headers now work properly
✅ **Debugging** - Console logging enabled for troubleshooting

## Next Steps to Test Sync

1. **Open the dashboard**: https://ideas-forums-targets.vercel.app

2. **Go to Settings tab**
   - Verify API key is configured
   - Check that "Use CORS Proxy" is enabled
   - Ensure "Vercel Serverless (Recommended)" is selected
   - Configuration Status should show: ✓ Enabled (Vercel Serverless)

3. **Map your events**
   - Click "Refresh Events List" to load your Ticket Tailor events
   - Map at least one event to an Ideas Forums program
   - Example: Map "Ideas Fest 2026" → Ideas Fest

4. **Test the sync**
   - Open browser console (F12 or Cmd+Option+I)
   - Click "Sync Ticket Tailor" button
   - Watch console for detailed logs:
     - `🔄 Sync button clicked`
     - `Using Vercel proxy`
     - `📊 Syncing [event name]`
     - `✓ Got X tickets`

5. **Verify data updated**
   - Go to Overview tab
   - Check if numbers updated
   - Last sync time should show in header

## Troubleshooting

### If sync still fails:

1. **Check API Key**
   - Make sure it starts with `sk_`
   - Try removing and re-adding it

2. **Check Event Mappings**
   - At least one event must be mapped
   - Event IDs should match Ticket Tailor

3. **Check Console Logs**
   - Press F12 to open Developer Tools
   - Look for red error messages
   - Share the error output if needed

4. **Test the API directly**
   - Go to Settings → "View Full Diagnostic Info"
   - Check all configuration values

## Deploy Future Updates

When you make changes to the code:

```bash
cd /Users/dwilliams/Downloads/Ideas-forums-targets-main
vercel --prod
```

That's it! Vercel will automatically redeploy.

## Serverless Function Details

The proxy function is located at:
- **Local**: `api/tickettailor.js`
- **Live**: `https://ideas-forums-targets.vercel.app/api/tickettailor`

It accepts:
- **Method**: GET
- **Query**: `?endpoint=events` (or any Ticket Tailor endpoint)
- **Headers**: `Authorization: Basic [your-base64-api-key]`

Example usage:
```javascript
fetch('/api/tickettailor?endpoint=events', {
  headers: {
    'Authorization': 'Basic ' + btoa(apiKey + ':')
  }
})
```

## Support

If you encounter issues:
1. Check browser console for detailed error logs
2. Verify all settings in the Configuration Status panel
3. Make sure your Ticket Tailor API key has correct permissions
4. Test with "Refresh Events List" to verify API connectivity

The dashboard now has comprehensive error reporting that will show exactly what's failing.
