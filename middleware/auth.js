import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

  const test = req.header('Authorization') ;
  if (!test) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token);
    req.user = decoded.user;
    next();
    } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
    }
};

export default auth;
