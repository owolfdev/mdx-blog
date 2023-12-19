currently this app deployment is not working on pagespeed insights. it fails.

Redo the app slowly with a new app and deployment. pay attention to best practices and lighthouse.

##

# Add a back button that only shows if navigating from the app:

Yes, you can show a back button conditionally based on whether the previous page URL includes your app's URL. This approach helps ensure that the back button is relevant and useful, particularly in cases where users navigate to your blog post from within your app or website. Here's a general approach to implement this in a React component:

### Using the `document.referrer` Property

You can use `document.referrer` to get the URL of the previous page that linked to the current page. This property is part of the `Document` interface in the Web API and is available in most modern browsers.

Here's a basic example of how you might implement this in a React component:

```javascript
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const [shouldShowBackButton, setShouldShowBackButton] = useState(false);
  const router = useRouter();
  const appUrl = "https://www.yourapp.com"; // Replace with your app's base URL

  useEffect(() => {
    // Check if the referrer includes the app's URL
    if (document.referrer.includes(appUrl)) {
      setShouldShowBackButton(true);
    }
  }, []);

  if (!shouldShowBackButton) {
    return null;
  }

  return <Button onClick={() => router.back()}>Back</Button>;
};

export default BackButton;
```

In this example:

- The `useEffect` hook checks if the `document.referrer` contains the base URL of your app.
- If it does, the state `shouldShowBackButton` is set to `true`, and the back button is rendered.
- If not, the button is not rendered (`return null`).
- The `router.back()` function is used to navigate back to the previous page when the button is clicked.

### Considerations

- **Privacy and Browser Settings**: Some users' browser settings or privacy extensions may block or clear the `document.referrer` value. In such cases, the back button will not be displayed.
- **Server-Side Rendering**: Note that `document.referrer` is not available during server-side rendering in frameworks like Next.js. Ensure this code runs on the client side.
- **Referrer Policy**: The referrer information depends on the Referrer Policy set by both your website and the referring website. In some cases, the referrer URL might not be passed or may be truncated.

Using this approach, you can create a more context-aware navigation experience on your blog, showing the back button only when it makes sense in the user's navigation flow.
