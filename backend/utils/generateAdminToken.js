import jwt from 'jsonwebtoken'

export const sendAdminToken = (admin,res) => {
    const token = jwt.sign(
        {id:admin._id,role:admin.role},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
    res.cookie('token' , token , {  //"admin_token"
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',//true,
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',//'none',
        maxAge:7 * 24 * 60 * 60 * 1000
    });
    return res.json({
        success:true,
        message:'Authenticated successfully',
        admin:{
            id:admin._id,
            name:admin.name,
            email:admin.email,
            role:admin.role
        },
        token
    })

}