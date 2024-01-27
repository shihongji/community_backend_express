import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const refreshToken = async (req, res) => {
  try {
    // Get refreshToken from request cookies
    const { cookieValue } = req.cookies;
    if (!cookieValue) {
      return res.status(401).json({
        error: "Unauthorized - No cookie provided",
      });
    }
    let parsedCookie;
    try {
      parsedCookie = JSON.parse(cookieValue);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid cookie" });
    }
    const { refreshToken } = parsedCookie;

    if (!refreshToken) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify refreshToken
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Token is not valid" });
        } else {
          // Get user from decoded token
          const user = await User.findById(decoded.user.id);

          // Check if refreshToken is valid
          if (refreshToken !== user.refreshToken) {
            return res.status(401).json({ error: "Token is not valid" });
          } else {
            const payload = {
              id: user.id,
            };
            // Generate new accessToken
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "20m",
            });

            await user.save();

            // Send new accessToken to client
            res.status(200).json({
              accessToken: accessToken,
            });
          }
        }
      },
    );
  } catch (err) {
    console.log("Error in refreshToken:", err);
    res.status(500).json({ error: err.message });
  }
};
