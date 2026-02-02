import jwt from 'jsonwebtoken'
export const sendToken = (user,res)=>{
    const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
    res.cookie('token',token,{
        httpOnly:true,
        // secure:process.env.NODE_ENV === 'production',//true,
        // sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',//'none',
        secure:true,
        sameSite:'none',
        expires: new Date(0),
        maxAge:7 * 24 * 60 * 60 * 1000
    })
    return token;
}