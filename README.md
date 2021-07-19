# ShoppingCart

# Backend
### Technologies used:
- NodeJS
- TypeScript
- MongoDB

<hr />

### To run the backend application:
1. To install the project dependencies, open a terminal window and cd into the server folder and type this command:
> npm i


2. Type this command afterwards (The backend runs on port 3000):
> npm start
<hr />

### Backend Endpoints
- /api/item
  - /
    - Method: GET
    - Functionality: Lists all items in the database
  - /addItem
    - Method: POST
    - Functionality: Add an Item in the database
    - Request Body (case sensetive):
      - itemName (string): the name of the item
      - itemPrice (number): the price of the item

- /api/coupon
  - /check
    - Method: POST
    - Functionality: Checks if the provided coupon is valid or not (avaiable in the database or not)
    - Request Body (case sensetive):
      - code (string): Coupon code that will be checked
  - /addCoupon
    - Method: POST
    - Functionality: Adds a coupon to the database
    - Request Body (case sensetive):
      - code (string): The coupon code
      - value (number): The discount value of the coupon
      - flatValue (boolean): determines if the discount is a flatValue (original price \- disount value) or if its a percentage value from the original price
  - /redeem
    - Method: GET
    - Functionality: returns a coupon code from the database

- /api/cart
  - /
    - Method: GET
    - Functionality: returns all items in the cart
  - /addItemToCart
    - Method: POST
    - Functionality: Adds item to cart
    - Request Body (case sensetive):
      - itemID (string): The item's ID in the database
  - /removeItemFromCart
    - Method: POST
    - Functionality: removes item from the cart
    - Request Body (case sensetive):
      - itemID (string): The item's ID in the database

### Notes:


<hr />
<hr />

# Frontend
### Technologies used:
- TypeScript
- MongoDB

<hr />

### To run the frontend application:
1. To install the project dependencies, open a terminal window and cd into the frontend folder and type this command:
> npm i


2. Type this command afterwards (The frontend runs on port 3001, you will be asked in the terminal to accept it running on port 3001):
> npm start
<hr />

### Routes:
- /
  - Functionality: Items page, displays all items in the database which u can add to your cart
- /cart
  - Functionality: The cart page, where you can view items in your cart and remove them


<hr />
<hr />

# Project Notes
- I have already included some items in the database for convenience
- I have also already included a coupon code in the database for convenience, you can add more through the /api/coupon/addCoupon endpoint and use them by using the redeem button in the frontend
  - code: 123
  - value: 15
  - flatValue: false 

<hr />
<hr />

# Leftouts
If I had more time I would've:
- Added more end points for better experience
- Came up with a better design for the frontend project
- Improved the design for the pages
- Improved the responsivness of the frontend

But unfortunately I was doing this task during my finals so I didn't have much time to improve upon the implementation. I apologize!