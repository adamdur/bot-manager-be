# bot-manager-be
bot manager back-end repo

## How to install
- create your mysql database
- `git clone https://github.com/adamdur/bot-manager-be.git && cd bot-manager-be`
- run `npm install` to install npm dependencies
- run `cp .env.example .env` co create .env file && configure it
- run `npm run migrate` to create tables
- run `npm run seed:run` to seed database
- run `npm run dev` to start local server

# API endpoints
## `/api/v1/users`
- `[GET]` - Get all active users
- `[POST]` - Create new user
    - payload: 
    ```
    {
        email: string().email().required(),
        username: string().min(4).required(),
        password: string().min(6).required(),
    }
    ```
  
## `/api/v1/users/roles`
- `[GET]` - Get roles
- `[POST]` - New role
    - payload:
    ```
    {
       code: string().required(),
    } 
    ```
    
## `/api/v1/users/:id`
- `[GET]` - Get user by id
- `[DELETE]` - Delete user
- `[PATCH]` - Update user
    - payload:
    ```
    {
       username: string().min(4).optional(),
    } 
    ```

## `/api/v1/users/:id/roles`
- `[GET]` - Get user roles
- `[DELETE]` - Unassign user role
- `[POST]` - Assign user role
    - payload:
    ```
    {
       code: string().required(),
    } 
    ```
  
## `/api/v1/users/:id/change-password`
- `[POST]` - Change user password
    - payload:
    ```
    {
        old_password: string().min(6).required(),
        new_password: string().min(6).required(),
        new_password_check: string().min(6).required(),
    }
    ```
  
## `/api/v1/users/email`
- `[POST]` - check email availability
    - payload:
    ```
    {
       email: string().email().required()
    }
    ```
    
## `/api/v1/users/username`
- `[POST]` - check username availability
    - payload:
    ```
    {
       username: string().min(4).required()
    }
    ```
  
## `/api/v1/auth/login`
- `[POST]` - Login user
    - payload: 
    ```
    {
        email: string().email().required(),
        password: string().required(),
    }
    ```
  
## `/api/v1/bots`
- `[GET]` - Get all bots
- `[POST]` - Create new bot
    - payload: 
    ```
    {
        name: string().required(),
        active: boolean().optional()
    }
    ```
  
## `/api/v1/bots/:id`
- `[GET]` - Get bot by id

## `/api/v1/bots/:id/renewals`
- `[GET]` - Get bot renewals
- `[POST]` - Add Bot renewal
    - payload: 
    ```
    {
        price: number().required().allow(null),
        period: string().required().allow(null)
    }
    ```
  