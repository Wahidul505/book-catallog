### Live Link: https://book-catallog-assignment.vercel.app

## Application Routes:

# User

- api/v1/auth/signin (POST)
- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/135955d6-7cb9-4275-a8b0-6a90edd5f9d6 (Single GET) Include an id that is saved in your database
- api/v1/users/135955d6-7cb9-4275-a8b0-6a90edd5f9d6 (PATCH)
- api/v1/users/135955d6-7cb9-4275-a8b0-6a90edd5f9d6 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

# Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/5c859da6-1005-402d-a9eb-d5bb8b180e40 (Single GET) Include an id that is saved in your database
- api/v1/categories/5c859da6-1005-402d-a9eb-d5bb8b180e40 (PATCH)
- api/v1/categories/5c859da6-1005-402d-a9eb-d5bb8b180e40 (DELETE) Include an id that is saved in your database

# Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

# Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
