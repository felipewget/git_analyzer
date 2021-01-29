import { response } from 'express';

export const checkPermissionGitUser = async ( req: any, res: any, next: any ) => {

    res.send({
        success: false,
        error: 'USER_NOT_HAS_PERMISSION'
    });
    return;
    
    // if( req.headers && req.headers.auth_token ){

    //     let response_session: any = await sessionsModel.findOne({ auth_token: req.headers.auth_token, deleted_at: { $exists: false } });
        
    //     if( response_session && response_session.user_id ){

    //         req.user_id = response_session.user_id
    //         next();

    //     } else {

    //         res.send({
    //             success: false,
    //             error: 'INVALID_TOKEN'
    //         });
    //         return;

    //     }

    // } else {

    //     res.send({
    //         success: false,
    //         error: 'INVALID_TOKEN'
    //     });
    //     return;

    // }

}