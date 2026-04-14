# **App Name**: Franke Support Engineering Hub

## Core Features:

- Secure User Authentication: Enable secure sign-up and login for customers, technicians, and administrators with robust role-based access control, fully supported by Firebase Authentication and Firestore security rules.
- Intuitive Ticket Management: Allow customers to submit new service requests with detailed device information, urgency, and location. Technicians can efficiently view and update their assigned tickets, while administrators oversee all requests in real-time using Firestore, tracking the full lifecycle from new to completed.
- Real-time Service Tracking: Provide customers with an intuitive, interactive UI component (Live Status Stepper) to track the live status and timeline of their maintenance requests, leveraging real-time data from Firestore.
- AI Troubleshooting Assistant: An intelligent tool leveraging Google Genkit with Gemini 1.5 Flash to scan a comprehensive knowledge base (including symptoms, diagnostics, and solutions) for diagnosing common appliance issues and proactively suggesting self-service solutions before ticket creation, thereby reducing support load.
- Optimized Technician Dashboard: A dedicated dashboard for technicians to view and manage assigned tickets, prioritize tasks, and visualize nearby service requests based on geographical location (geoFence) and expertise.
- Instant Contact Options: Integrate direct communication channels like WhatsApp and direct call buttons via a responsive Quick Action Floating Bar, featuring Lucide React icons in the primary golden yellow hue, enabling immediate customer contact for urgent inquiries or support.
- AI Image Analysis for Diagnostics: A generative AI feature that allows users to upload images of appliance malfunctions. The system, utilizing Gemini Vision, analyzes the image to identify the problem and link it to relevant knowledge base solutions, enhancing troubleshooting accuracy.

## Style Guidelines:

- Primary brand color: A vibrant Golden Yellow (#FFD700) to convey premium service and technological prowess, with careful attention to WCAG AA contrast standards.
- Secondary colors: Dark Gray and White, providing an elegant, high-contrast canvas for content.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-inspired, and impactful appearance. Body font: 'Inter' (sans-serif) for exceptional readability across various screen sizes, suitable for detailed content and service descriptions.
- Employ sleek, minimalist line icons using Lucide React, predominantly in the primary golden yellow hue, to maintain a clean and professional aesthetic. Optimized SVG iconography for performance.
- A mobile-first, conversion-optimized design structure with a traditional header, hero section, distinct content areas (e.g., Services, Contact), and a footer. Emphasizes clear calls-to-action, intuitive navigation, responsive quick-action floating bars for immediate contact, and zero-shift layouts. Adherence to WCAG AA standards, ensuring comprehensive alt text for images.
- Subtle micro-interactions, such as elegant hover effects on buttons, dynamic feedback on form submissions, smooth status updates, and gentle animations for components like the Live Status Stepper, to enhance user engagement and provide clear navigational cues.