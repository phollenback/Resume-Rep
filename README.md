# Resume-Reputation

>
>An application built to help those who have to mass apply to jobs. Resume Reputation holds all instances of your resume and tracks your progress in the  application process.
>
>
>
>Read about the key technology and view the app's progress up until now.
>
## TODO
- [x] Implement the UploadThing upload button and configure my UploadThing storage
- [x] Create a Resume Details form that stores all resume instance metadata entered by the user
- [x] Add Clerk Sign Up and Log in, assign users to all activity done storing the above
- [x] Create point system rewarding each phase of the hiring process
- [ ] Create User Leaderboards
- [ ] Create global leaderboards
- [ ] Convert to Serverless by upgrading from mysql to postgresql
- [ ] Deploy to Vercel

## Tech Stack

### UploadThing
Used as a cheaper and easier alternative to AWS S3. Provides really clear documentation, and is practically aimed at Next apps. Once I discovered UploadThing I knew I had to convert and the job was done within hours.

### Shadcn-ui
At the UI's current state, shadcn-ui stock components have styled my simple multi-page app far better than most of my quick side projects in the past. This is my first time installing shadcn on any of my apps, but I predict Shad+Tailwind to be my go-to styling libraries in the future.

### Drizzle ORM
Drizzle facilitates the database interaction with a local mysql server. This is a good use case for Drizzle for numerous reasons; like its ease of being used in a serverless app, as well as the quick mutability of database configuration. Because Drizzle works with so many different databases, if I had to tie in another data store that had to separate resume data from user data for user privacy for instance, I can tie all database connection in under one roof.

## Functionality 

### Home pre sign in
<img width="1020" alt="Image" src="https://github.com/user-attachments/assets/606bc103-edb9-432a-be20-772a13c38d29" />

### Saved Resumes > by clicking "View Resume" it pulls up a webpage pdf of the saved file
<img width="1413" alt="Image" src="https://github.com/user-attachments/assets/e26bd284-d828-451a-bea2-5d8d5e36ca58" />

### Self-Tracking Point System
<img width="976" alt="Image" src="https://github.com/user-attachments/assets/b64f2be9-6165-44ac-87e9-49ce94dacd03" />


### Create Resume Form
<img width="976" alt="Image" src="https://github.com/user-attachments/assets/b64f2be9-6165-44ac-87e9-49ce94dacd03" />

### File Upload
<img width="970" alt="Screenshot 2025-03-09 at 12 05 22 PM" src="https://github.com/user-attachments/assets/230de612-a470-4b02-abbc-1eb9325ca626" />

