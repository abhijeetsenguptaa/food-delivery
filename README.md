# Food Delivery Project Documentation

## Introduction

The Food Delivery project is a web application designed to facilitate the ordering and delivery of food from various restaurants to users. It provides three main routes: `users`, `restaurants`, and `orders`. This documentation outlines the functionality and usage of these routes along with the data models (schemas) used in the project.

## Routes

### Users

#### 1. User Registration

- **Route**: `POST api/users/register`
- **Controller**: `User_Controller.registeringUser`
- **Description**: Allows users to register by providing their name, email, password, and address information.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "address": {
      "street": "123 Main St",
      "city": "Cityville",
      "state": "State",
      "country": "Country",
      "zip": "12345"
    }
  }
  ```

#### 2. User Login

- **Route**: `POST api/users/login`
- **Controller**: `User_Controller.loginUser`
- **Description**: Allows registered users to log in using their email and password.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```

#### 3. Reset User Password

- **Route**: `PATCH api/users/:id/reset`
- **Controller**: `User_Controller.resetPassword`
- **Description**: Allows a user to reset their password by providing a new password.
- **Request Parameters**:
  - `id` (User ID)

### Restaurants

#### 4. Fetch All Restaurants

- **Route**: `GET api/restaurants`
- **Controller**: `Restaurant_Controller.fetchingRestaurants`
- **Description**: Retrieves a list of all registered restaurants.

#### 5. Fetch One Restaurant

- **Route**: `GET api/restaurants/:id`
- **Controller**: `Restaurant_Controller.fetchingOneRestaurant`
- **Description**: Retrieves details of a specific restaurant by providing its ID.
- **Request Parameters**:
  - `id` (Restaurant ID)

#### 6. Add Restaurant

- **Route**: `POST api/restaurants/:id`
- **Controller**: `Restaurant_Controller.addingRestaurant`
- **Description**: Allows restaurant owners to add their restaurant by providing name and address information.
- **Request Parameters**:
  - `id` (User ID)

#### 7. Add Menu to Restaurant

- **Route**: `POST api/restaurants/:id/menu`
- **Controller**: `Restaurant_Controller.addingMenuToRestaurant`
- **Description**: Allows restaurant owners to add a menu item to their restaurant by providing item details.
- **Request Parameters**:
  - `id` (Restaurant ID)
- **Request Body**:
  ```json
  {
    "name": "Burger",
    "description": "Delicious burger",
    "price": 10.99,
    "image": "burger.jpg"
  }
  ```

#### 8. Delete Menu Item from Restaurant

- **Route**: `DELETE api/restaurants/:id1/menu/:id2`
- **Controller**: `Restaurant_Controller.deletingMenuFromRestaurant`
- **Description**: Allows restaurant owners to delete a menu item from their restaurant by providing the item's ID.
- **Request Parameters**:
  - `id1` (Restaurant ID)
  - `id2` (Menu Item ID)

### Orders

#### 9. Place an Order

- **Route**: `POST api/orders`
- **Controller**: `Order_Controller.addingOrder`
- **Description**: Allows users to place an order by providing the restaurant, items, delivery address, and total price.
- **Request Body**:
  ```json
  {
    "user": "user_id",
    "restaurant": "restaurant_id",
    "items": [
      {
        "name": "Burger",
        "price": 10.99,
        "quantity": 2
      },
      {
        "name": "Pizza",
        "price": 12.99,
        "quantity": 1
      }
    ],
    "totalPrice": 34.97,
    "deliveryAddress": {
      "street": "456 Elm St",
      "city": "Townville",
      "state": "State",
      "country": "Country",
      "zip": "54321"
    }
  }
  ```

#### 10. Fetch a Specific Order

- **Route**: `GET api/orders/:id`
- **Controller**: `Order_Controller.fetchingSpecificOrder`
- **Description**: Retrieves details of a specific order by providing its ID.
- **Request Parameters**:
  - `id` (Order ID)

#### 11. Fetch All Orders

- **Route**: `GET api/orders`
- **Controller**: `Order_Controller.fetchingOrders`
- **Description**: Retrieves a list of all orders.

#### 12. Update Order Status

- **Route**: `PATCH api/orders/:id`
- **Controller**: `Order_Controller.updatingOrder`
- **Description**: Allows restaurant owners to update the status of an order (e.g., from "preparing" to "on the way").
- **Request Parameters**:
  - `id` (Order ID)
- **Request Body**:
  ```json
  {
    "status": "on the way"
  }
  ```
