## Docker Compose Setup guide

1. Install docker
2. Install docker compose
3. Run command ```docker-compose up -d```
4. Copy .env.example and rename to .env

## Database Migration guide
1. Create a migration script naming 0xx-{feature}.sql
2. Run command  ```db:migrate```
3. If you make changes to existing tables, add a new migration script as step 1
4. Create a pull request for review and merge

## Working Convention
1. We will make `main` as our main branch and add new features through the pull request (PR) process, in which at least 1 reviewer must approve the PR to be merged in. When adding a new branch, follow the convention `{devName}/{featureName}`
2. When merge PR, use `squash` commits to turn everything into 1 commit so that we can revert it more easily
3. Use `import`
4. Naming convention: Source code files will be placed under feature folder like the example `backend/src/user/entity/user.js`
5. 