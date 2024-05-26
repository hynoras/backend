const jwt = require('jsonwebtoken');
const secretKey = "electronicdeviceapp";

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Assumes token is in the format "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
