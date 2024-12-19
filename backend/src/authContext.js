const context = ({ req }) => {
    const token = req.headers.authorization || '';
    console.log("req.headers", req.headers);
    if (!token) throw new ApolloError('Authentication token missing', 'NOT_AUTHENTICATED');
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new ApolloError('Authentication token does not match any', 'INCORRECT_TOKEN');
    }
};

export { context };
