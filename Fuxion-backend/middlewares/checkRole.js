const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      next();
    };
  };
  
module.exports = checkRole;