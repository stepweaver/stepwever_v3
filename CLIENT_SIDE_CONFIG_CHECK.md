# Client-Side Config Check - Implementation Guide

## Overview

The client-side application (Next.js) performs a pre-flight check before loading the booking interface to determine if bookings are enabled. This requires your Google Apps Script to support a config endpoint.

## Implementation Requirements

### Required Endpoint

Your Google Apps Script must handle GET requests with the query parameter `action=config`.

### Request Format

```
GET https://your-script-url/exec?action=config
```

### Response Format

Return a JSON object with the booking configuration. The client supports two response structures:

#### Option 1: Flat Structure (Recommended)

```json
{
  "booking_enabled": true,
  "booking_closed_message": "Bookings are currently closed. Please check back later."
}
```

#### Option 2: Nested Structure

```json
{
  "config": {
    "booking_enabled": true,
    "booking_closed_message": "Bookings are currently closed. Please check back later."
  }
}
```

### Field Requirements

- **`booking_enabled`**: Required. Can be boolean (`true`/`false`), string (`"true"`/`"false"`), or number (`1`/`0`)
- **`booking_closed_message`**: Optional. Custom message to display when bookings are disabled. If omitted, default message is used.

## Example Implementation

Add this to your `doGet` function:

```javascript
function doGet(e) {
  const action = e.parameter.action;

  // Handle config check request
  if (action === 'config') {
    return handleConfigRequest();
  }

  // ... rest of your existing code ...
}

function handleConfigRequest() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Config');

    // Read config from sheet (adjust based on your config reading logic)
    const configData = readConfigSheet(configSheet);

    // Extract booking settings
    const bookingEnabled = configData['booking_enabled'];
    const closedMessage =
      configData['booking_closed_message'] || 'Bookings are currently closed.';

    // Normalize booking_enabled value
    // Handles: true/false, "true"/"false", 1/0, "1"/"0", checkbox values
    let enabled = false;
    if (
      bookingEnabled === true ||
      bookingEnabled === 'true' ||
      bookingEnabled === 1 ||
      bookingEnabled === '1' ||
      bookingEnabled === 'TRUE'
    ) {
      enabled = true;
    }

    const response = {
      booking_enabled: enabled,
      booking_closed_message: closedMessage,
    };

    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Fail open - default to enabled if there's an error
    Logger.log('Error in handleConfigRequest: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        booking_enabled: true,
        booking_closed_message: 'Bookings are currently closed.',
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Example config reading function (adjust to match your implementation)
function readConfigSheet(configSheet) {
  const data = configSheet.getDataRange().getValues();
  const config = {};

  // Skip header row (row 1)
  for (let i = 1; i < data.length; i++) {
    const setting = data[i][0]; // Column A
    const value = data[i][1]; // Column B

    if (setting && value !== '') {
      config[setting] = value;
    }
  }

  return config;
}
```

## Integration Points

1. **Add to `doGet`**: Check for `action=config` parameter and route to config handler
2. **Config Sheet**: Ensure `booking_enabled` and optionally `booking_closed_message` exist in your Config sheet
3. **Error Handling**: Fail open (default to `booking_enabled: true`) to ensure bookings remain accessible if config can't be read

## Client-Side Behavior

- If `booking_enabled` is `false`, the booking interface iframe will not load
- Instead, a styled message (using `booking_closed_message`) is displayed
- If config request fails, bookings default to enabled (fail-open behavior)
- This check happens before the iframe loads, providing immediate feedback

## Testing

Test with:

- `?action=config` - should return JSON config
- Normal booking URL (no action param) - should work as before
- Missing config values - should handle gracefully
- Invalid config values - should normalize correctly

## Notes

- The config endpoint should be fast and lightweight
- Consider caching config values if your config reading is expensive
- The endpoint should not require authentication (it's called from client-side)
- Response must be valid JSON with proper MIME type header
