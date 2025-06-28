**BenefitGen Production Frontend** 

**Overview**

This repository contains the source code for the production frontend of BenefitGen, a responsive web application that serves as the user interface for our AI-powered content generation service. Built with React, this application provides a seamless and intuitive experience for users to register, log in, manage their subscriptions, and interact with the core AI generation features. It is designed to communicate with a separate production backend API to handle all business logic and data persistence.

**Core Features**

* Intuitive AI Content Generation: Provides the main interface where users can input keywords or features and receive AI-generated marketing copy in real-time.

* Complete User Authentication: A full suite of components and pages for user registration, login, and session management, ensuring secure access to the application.

* Integrated Subscription & Billing: Features a dedicated billing page that connects with Stripe, allowing users to manage their subscription plans and view their payment history.

* Usage Quota Tracking: Dynamically displays the user's remaining daily and monthly generation credits, providing clear feedback on their current usage limits.

* Responsive and Accessible UI: The user interface is built with Tailwind CSS to be fully responsive, ensuring a consistent and accessible experience across desktops, tablets, and mobile devices.

**Technical Architecture**

* The frontend is a modern single-page application (SPA) built with the following core technologies:

* Framework: React is used for building the component-based user interface.

* Styling: Tailwind CSS provides a utility-first framework for rapid and consistent styling.

* Client-Side Routing: React Router manages all browser-side navigation between different pages of the application.

* API Communication: Axios is used to make secure HTTP requests to the backend API for data fetching and submission.