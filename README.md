# bot-manager-be
bot manager back-end repo

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
