## E-Commerce App

# Description:
A web application for e-commerce functionality that includes user authentication, and a shopping cart feature. It allows users to register, log in, browse products, add them to the cart, and proceed to checkout. The app features user authentication, route protection, and an interactive UI with Lottie animations.
Features:

    User Authentication: Users can register and log in to the application.

    Protected Routes: Certain pages, like the cart, are protected and require the user to be logged in.

    Lottie Animations: Interactive and smooth animations have been added using Lottie for an enhanced UI experience.

    Toast Notifications: react-hot-toast is used for showing success and error messages.

    Formik for Form Validation: Form validation is managed with Formik and Yup for easier form handling and validation rules.

    React Router: The application uses react-router-dom to handle navigation and routing between pages.

# Installation

Clone the repository

`cd task` 

Install dependencies: You will need Node.js installed on your system to run this project. Install the required dependencies by running:

`npm install`

Run the Application

`npm start`

    This will start the development server, and you can view the application by navigating to http://localhost:3000 in your browser.


# Design Decisions

    State Management:
        Context API is used to manage global state for authentication (AuthContext) and cart management (CartContext). This approach makes the state accessible throughout the app without prop drilling.

    Routing:
        React Router (react-router-dom) is used for navigation between pages. It allows seamless transitions between pages like login, register, products, and cart.

    User Feedback:
        react-hot-toast is used for toasts to notify the user of success, errors, or actions like adding/removing products from the cart or completing a purchase.

    UI/UX:
        Tailwind CSS is used to style the application. It provides utility-first CSS classes to design responsive and flexible UIs.
        Lottie animations are used to enhance user experience, particularly in the cart page to display an empty cart animation.
        Buttons and interactive elements are visually enhanced using Tailwind’s hover and focus classes to improve accessibility and responsiveness.

    Protected Routes:
        The app uses a custom ProtectedRoute component to ensure users cannot access the cart page without being logged in.
        Users who are not logged in are redirected to the login page when trying to access these routes.

# Special Features

    Lottie Animations:
    Lottie animations are used on the cart page and product page to show an animation when the cart is empty or when no product is found. This adds a fun and engaging element to the user experience.

    Form Validation with Formik & Yup:
    Formik is used for handling forms and state management of form inputs. This simplifies complex form validation, especially for login and registration forms, with Yup schema validation for easier setup and maintenance.

    Responsive Design:
    The app is built with responsive design in mind using Tailwind CSS. It adjusts well to different screen sizes, ensuring that the app is usable on both desktop and mobile devices.

    React Router Dom:
    React Router is used for handling navigation and routing between pages. The app includes routes for login, registration, products, cart.