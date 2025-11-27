const roleCheck= (role)=>{
  return (req, res, next)=>{
    try {
      if (!req.user) return res.status(401).json({message: 'Unauthorized'})
      if (req.user.role !== role) return res.status(403).json({message: 'Access denied: Admin only'})
      next()
    }
    catch (error) {
      console.error(err)
      return res.status(500).json({message: 'Server error! Try again !!'})
    }
  }
}

module.exports= roleCheck