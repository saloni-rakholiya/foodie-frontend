# Foodie-frontend
It is an online restaurant webapp built using React, MongoDB, NodeJS and express. The backend for this project is present in [Here](https://github.com/saloni-rakholiya/foodie). 

## Features
### User Side
- Viewing menu with and without logging in 
- Able to add to cart from menu once logged in
- Search feature and dynamic categorisation of the menu
- Custom pizza making feature that gets added to your personal menu (with cost calculated according to ingredients)
- See the order status (delivered, preparing or on the way)
- Viewing previous orders
### Admin Side
- Multiple admin logins allowed
- View all orders with most recent ones first
- Set status of the order
- Add items to menu
- Modify the menu items

## Previews
![homepage](./images/homepage.png)
![login](./images/register.png)
![register](./images/login.png)
![contact](./images/contact.png)
![about](./images/about.png)
![menu](./images/menu.png)
![menu2](./images/menu2.png)
![buildpizza](./images/buildpizza.png)
![buildpizza2](./images/buildpizza2.png)
![cart](./images/mycart.png)
![orders](./images/prevorders.png)
![fullorder](./images/fullorder.png)
## Setup 
- Make sure the server is running by cloning the backend repo and running the following commands:
```
npm install
nodemon index.js
```
- Run mongod server by running:
```
mongod
```
- Clone this repo and run the following commands: 
```
npm install
npm start
```