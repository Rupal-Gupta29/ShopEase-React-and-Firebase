# ShopEase

ShopEase is an e-commerce app based on React and Firebase. Users can find products across various categories such as phones, laptops, and smartwatches. Authentication and validation are performed using Firebase Authentication. Users must create an account and log in to access the permission to add products to their cart.

Users can add products to their cart, and this information is saved in the Firestore database. The app also features filters, allowing users to refine product searches by category and price. Additionally, a search option enables users to find products by name.

Upon checkout, the cart items are transferred to orders, which are also stored in the database. The application includes an admin dashboard accessible only to users with an admin email ID. Admins have the capability to add products to the database, making them visible in the products section for users to add to their carts.

### App Interface

#### Homepage
![1](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/186142fc-d3c8-4537-bf56-b950743f6ebd) 
#### Products Page
![127 0 0 1_5173_products](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/dc921f8d-1100-4aa8-afe0-a25652eab5e0)
![Screenshot 2024-01-03 203733](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/89dabf5f-e159-483d-b565-f0e0cf84c336)
#### User's cart
![3](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/dff7a8d6-25e1-4426-8066-1e09f988bb79)
#### Orders Page
![127 0 0 1_5173_addproduct (1)](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/354ad121-943a-42d7-96ad-8cefb52edca6)
#### User's Profile
![5](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/f8aafa55-ddfd-468b-bbf6-55876988ad36)
#### Admin Dashboard
![127 0 0 1_5173_addproduct](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/06b97cb8-6da5-4588-87c5-136589bf20ac)
![9](https://github.com/Rupal-Gupta29/ShopEase-React-and-Firebase/assets/70842313/e28add57-8904-49a2-8e05-39d09378f163)





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
