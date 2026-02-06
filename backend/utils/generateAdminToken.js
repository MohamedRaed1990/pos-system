import jwt from 'jsonwebtoken'

export const sendAdminToken = (admin,res) => {
    const token = jwt.sign(
        {id:admin._id.toString(),role:admin.role.toString()},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
    res.cookie('token' , token , {  //"admin_token"
        httpOnly:true,
        // secure:process.env.NODE_ENV === 'production',//true,
        secure:true,
        sameSite:'none',
        // sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',//'none',
        path: '/',
        maxAge:7 * 24 * 60 * 60 * 1000
    });
    return res.json({
        success:true,
        message:'Authenticated successfully',
        admin:{
            id:admin._id.toString(),
            name:admin.name,
            email:admin.email,
            role:admin.role.toString()
        },
        token
    })

}