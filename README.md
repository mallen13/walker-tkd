# Walker Taekwondo Academy Website & E-Commerce App

## About
This website is a client project built for a non-profit martial arts school. The project started off as a static website containing a home page, information about the organization, it's contact information, an image gallery, and a e-commerce application.

A e-commerce application was added using vanilla JS. (See https://walkertkdacademy.com/store.html). The application dynmically generates store items based off a list of iems. Users can add items to cart and checkout with their card information. Information is also saved in local storage. Upon checkout, the user recieves a receipt email, as well as the merchant.

Vanilla JS was intentionally used instead of a library/ framework to solidy essential principles and as a reminder of why libraries/frameworks are beneficial.

https://walkertkdacademy.com/store.html

## Technologies

Front-end technologies used were HTML, CSS, and modular Vanilla JS. All files were minified for better load times.

Design of the front-end is all original and effectively uses the organization's branding and colors. A focus on accesible colors, fonts, animations, and layout can be observed on the project. All buttons and links are accessible via keyboard without a mouse.

The back-end API was built using Node-JS and Express. It is partially secured through Node rate-limiter and environment variables, makes use of post requests, and sends emails via Node-Mailer. The server posts payment information to Square API. 

## Development
Development started with a strong desire to meet the clients needs and make an amazing project the looked good and functioned well. Client expectations were discussed along with the gathering of image assets and page content. 

Next, a draft was made of the website and reveled to the client for feedback. The development was extremely focused, as deadlines were in place for release. Updates were made, then final approval was given to publish the website. Hosting options and domain names, along with pricing, were discussed before the website went live.

All files were minified and images optimized for efficient load times. 

Rollout went well and users immediately started navigating to the website to sign-up for an upcoming Taekwondo tournament. 

Client epectations were exceeded.

As the project grew larger, scalability was considered and modules were used to keep code maintainable. The back-end API was tested using Postman.

## What I learned
The project forced me to consider good architecture and modulization as the codebase grew bigger. Additionally, I extensively had to research the Square API as documentation was rather difficult to understand and real-world examles were limited. Other new packages/libraries had to be learned such as node-fetch (to allow fetch), node-mailer (for email), rate-limit (to slow-down malicous intent), and uuid (to generate a uuid for posting to Square). 

## Roadmap
Future additions to the project are being considered for down the road. Such options include a blog CMS, and an online check-in form. Further, as time allows, the store page could be expanded to accept other forms of payment and include Square o-auth. 


