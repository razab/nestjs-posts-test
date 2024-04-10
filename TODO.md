## Initial data

### Objective: Develop a simplified RESTful API service for managing blog posts using

NestJS, TypeORM/Postgres, and Redis.
The focus will be on creating and reading blog.editorconfig posts, with Redis caching to enhance read performance.

### Requirements:

1. API Endpoints: 
   - An endpoint to create a new blog post.
   - An endpoint to retrieve a list of all blog posts, implementing basic pagination.
   - An endpoint to retrieve a single blog post by ID.
2. Tech Stack:
   - Framework: NestJS.
   - Database: Use TypeORM with PostgresSQL for storing blog posts.
   - Caching: Use Redis to cache the results of the endpoint that retrieves a list of blog posts for a short duration (e.g., 5 minutes).
3. Data Model:
   - PostEntity: Should include at least a title, body, and timestamps (created and updated).
4. Validation and Security:
   - Implement input validation for creating a blog post to ensure data integrity.
   - Ensure the application is secure against SQL injection attacks through proper use of TypeORM.
5. Testing:
   - Provide unit tests for your service layer.
   - Include at least one integration test for your endpoints.
6. Documentation:
   - Briefly document your API endpoints.


#### notes
- on SQL injections
  - protection against SQL injections is kind of expected to be there
  - as long as core api is used in the expected way
  - of course if raw sql is used - it's up to dev to handle security aspects
  - and there are discussion on safety of orderBy https://github.com/typeorm/typeorm/issues/3740
  - get more info
  
  - there is no way sql injection can happen on types other than string (files? binary?)
  - let's add another way for potential injection through GET posts/:id, type id = UUID
  - other obvious way - POST posts/ body
  - in theory, we could validate every single string for injection patterns
  - be careful with repository.(findOne|findOneBy ..)
    - known (old ?) issues with null|undefined
    - didn't check source code to see if queryBuilder.setParameter is used under the hood
    - i remember issues caused by mixed use of repo/builder with transaction 

- ideally dto are on controller side, entity/model on service and repository side
  - but it all becomes very cumbersome
  - and there are certain complications - https://docs.nestjs.com/techniques/serialization 

- test are not exiting properly, `--detectOpenHandles` does nothing, but it hangs for 5 seconds

- in general, i prefer code grouping in modules, e.x.: src/modules/posts/{controllers|dtos|services} 

4064* git init
4065* git commit -m "first commit"
4066* git add .
4067* git commit -m "first commit"
4068* git remote add origin git@github.com:razab/nestjs-posts-test.git
4069* git push -u origin master

