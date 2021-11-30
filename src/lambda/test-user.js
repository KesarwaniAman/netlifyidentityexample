// legacy callback style - not encouraged anymore, but you'll still see examples doing this
exports.handler = function (event, context) {
  // your server-side functionality
  const { identity, user } = context.clientContext;
  console.log("identity", identity);
  console.log("user", user);
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: `Unauthorized`,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`,
    }),
  };
};
