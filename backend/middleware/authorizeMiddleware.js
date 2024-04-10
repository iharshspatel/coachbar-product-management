import asyncHandler from 'express-async-handler';

const isAdmin = asyncHandler(async (req, res, next) => {
  
  const isAdmin = req.user.isAdmin;
  if (isAdmin) {
   next()
  } else {
    res.status(401);
    throw new Error('You are not Admin');
  }
});

export { isAdmin };
