export function handleResolverError(resolver) {
    return async (parent, args, context, info) => {
      try {
        return await resolver(parent, args, context, info);
      } catch (error) {
        console.error('Resolver Error:', error);
  
        throw new Error(error.message || 'An error occurred while processing your request.');
      }
    };
  }
  