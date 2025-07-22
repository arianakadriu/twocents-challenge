# TwoCents Clone (Challenge Submission)

This project is a technical challenge for Twocents, built using **Next.js**, **TypeScript**, and **Tailwind CSS**. The goal was to replicate core features of the app, with a focus on UI presentation and basic data handling.

---

## Completed Features

- **Net Worth Pills with Gradients**  
  Users are labeled with Bronze, Silver, Gold, or Platinum net worth tiers, each styled with its own gradient and border style.

- **Post/Comment Author Info**  
  Each post and comment displays the author's:
  - Age
  - Gender 
  - Arena 

- **Nested Comments**  
  Replies are properly nested, with responsive indentation logic for both desktop and mobile views.

- **User Profile Navigation**  
  Clicking on a user’s net worth pill navigates to a `/users/[id]` route, showing their recent posts. User data is fetched from:  
  `call("/v1/users/get", { user_uuid: uuid })`.

- **Error Handling**  
  Unsupported or missing post types (e.g., polls, undefined formats) don’t break the app. Fallback messaging and default behaviors are included where needed.

---

## Incomplete Features

- **Poll Results**  
  I was unable to complete poll rendering and animation in time.  
  Specifically:
  - Fetching results from:  
    `call("/v1/polls/get", { post_uuid: postUUID })`
  - Displaying the results with animated bars that transition from 0% → final percentage upon component mount.

---

## Deployment

I deployed this project in Vercel and you can find the link [here](https://twocents-challenge-zeta.vercel.app/).
