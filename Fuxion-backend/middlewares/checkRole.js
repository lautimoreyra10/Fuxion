const checkRole = (role) => {
  return (req, res, next) => {
    console.log('User role:', req.user.role);
    if (req.user.role !== role) {
      return res.status(403).json({ 
        message: 'Completa tu perfil para acceder a esta acción' 
      });
    }
    next();
  };
};

module.exports = checkRole;