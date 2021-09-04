# The frontend of the VoidPhysics site

## Building locally

Assuming you have Node installed, setup a `.env.local` file in the root directory similar to `.env.example`. If you built the backend with the defaults, it should look like this:

### `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

After that, run `yarn` to install all dependencies, finally run `yarn dev` to start the development.

To build the backend, check out [the instructions here](https://github.com/Ptrskay3/void-backend).
