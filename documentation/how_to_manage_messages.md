# How to Manage Feedback Messages

This project uses **Vercel Postgres** to store user feedback and provides a built-in **Admin Interface** to view and manage these messages.

## 1. Initial Setup (One-Time)

Before the system works in production (or locally), you must link a Vercel Postgres database to your project.

### Step 1: Create Database on Vercel
1.  Go to your project dashboard on **Vercel**.
2.  Navigate to the **Storage** tab.
3.  Click **Create Database** and select **Postgres**.
4.  Follow the prompts to create it (select a region close to your users).
5.  **Link** the new database to your project. This automatically adds the necessary environment variables (`POSTGRES_URL`, etc.) to your deployment.

### Step 2: Initialize the Table
Once the database is linked and your project is deployed (or you've pulled the env vars locally using `vercel env pull .env.local`), you need to create the database table.

1.  Open your browser.
2.  Navigate to: `https://your-site-url.vercel.app/api/create-feedback-table`
    *   (Or `http://localhost:3000/api/create-feedback-table` if running locally)
3.  You should see a JSON response: `{"result":"Feedback table created successfully"}`.

*You only need to do this once.*

## 2. Accessing the Repository

To view the messages users have sent:

1.  Navigate to the Admin page: `https://your-site-url.vercel.app/admin`
2.  The page displays a table of all submitted feedback, sorted by date (newest first).

## 3. Managing Messages

### Deleting Messages
*   Each row in the Admin table has a red **Delete** button.
*   Clicking **Delete** will show a confirmation popup.
*   Upon confirmation, the message is permanently removed from the database and the table will refresh.

### Refreshing the List
*   Use the **Refresh** button at the top of the page to check for new messages without reloading the entire page.

## 4. Troubleshooting

*   **"Failed to fetch" on Admin Page:**
    *   Ensure your Vercel project is correctly linked to the Postgres store.
    *   Check specifically that the `POSTGRES_URL` environment variable is present.
*   **"Table does not exist" error:**
    *   Re-run the setup step by visiting `/api/create-feedback-table`.
*   **Database connection errors:**
    *   If running locally, ensure you have run `vercel env pull .env.local` to get the credentials.

## Security Note
Currently, the `/admin` route is accessible to anyone who knows the URL. Since this is a personal project, this is often acceptable "security through obscurity". However, if you wish to secure it, consider adding Vercel Authentication or a simple password check in the code in the future.
