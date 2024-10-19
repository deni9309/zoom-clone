# Yoom - Video Conferencing App

## Introduction

Developed using the latest Next.js and TypeScript technologies, this project recreates the functionality of Zoom, a popular video conferencing platform. It allows users to securely sign in, host meetings, and access a range of features including screen sharing, meeting recording, and participant management.

## Tech Stack

- Next.js
- TypeScript
- Clerk
- getstream
- shadcn
- Tailwind CSS

## Features

- **Authentication:** Utilizes Clerk for authentication and authorization, providing secure user login via social sign-in or email/password, with role-based access control for different permission levels.

- **Instant Meeting:** Start meetings instantly with the option to configure audio and video settings before joining.

- **Meeting Controls:** Offers comprehensive meeting management tools such as screen sharing, recording, emoji reactions, muting/unmuting, adjusting sound levels, grid layouts, viewing participant lists, and managing individuals (pin, mute, unmute, block, or allow video sharing).

- **End or Leave Meeting:** Participants can exit meetings individually, while hosts can end sessions for all attendees at once.

- **Schedule Meetings:** Users can schedule future meetings by setting date and time, with the details accessible from the 'Upcoming Meetings' section, ready for sharing or starting.

- **Meeting History:** View a complete list of previous meetings along with relevant details and metadata for easy reference.

- **Recorded Meetings:** Access and review recorded meetings from the past through a dedicated section.

- **Personal Meeting Room:** Each user has access to a personal room with a unique link for spontaneous meetings, easily shareable with others.

- **Join via Link:** Join any scheduled or active meeting by simply entering a shared meeting link.

- **Real-time Secure Interaction:** Ensures all user interactions occur in real-time with enhanced security measures to protect user data and privacy.

- **Responsive Interface:** Implements responsive design to ensure smooth functionality across all devices, adapting effortlessly to varying screen sizes and orientations.

- **Additional Features:** Clean code architecture and reusable components for enhanced maintainability.

## Installation

Install the project dependencies using npm:  
`npm install`

**Set Up Environment Variables**

Create a new file named .env in the root of your project and add the following content:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# GetStream.io
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

Add your environment variable values with your actual respective account credentials. You can obtain these credentials by signing up on the Clerk and GetStream websites.

Running the Project  
``npm run dev``

Open ``http://localhost:3000`` with your browser to see the result.

## Credits and Attribution

This project was inspired and made with the great mentoring of [JavaScript Mastery](https://www.youtube.com/@javascriptmastery). The tutorial I followed can be found [here](https://www.youtube.com/watch?v=R8CIO1DZ2b8).