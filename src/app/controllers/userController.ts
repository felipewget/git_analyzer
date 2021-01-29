import { gitUserModel } from './../models/gitUserSchema'
import { dbUserGitUserModel } from './../models/userGitUserSchema'
import mongoose from 'mongoose';

class UserController {

    async listGitUsers( req: any, res:any )
    {

        let { search, limit, skip } = req.body.page
                                ? req.body
                                : req.query

        limit = 1;
        skip = skip > 0
                ? skip
                : 0
        skip = parseInt( skip );
        
        let query_arr_keywords = [];
		if( search && search.length > 0 ){

			let arr_keywords = await  search.split(" ");
			query_arr_keywords = await arr_keywords.map( (obj:any) => {

				obj = obj.split('a').join('(a|á|à|â|ã)');
				obj = obj.split('e').join('(e|é|è|ê)');
				obj = obj.split('i').join('(i|í|ì)');
				obj = obj.split('o').join('(o|ó|ò|ô|õ)');
				obj = obj.split('u').join('(u|ú|ù)');

				return { 'name' :{'$regex' : new RegExp(obj, "i") }  }
			});
		
        }
        
        let user_id = req.user_id;

        let obj_search = [];
        obj_search.push({ user_id: user_id });
        if( query_arr_keywords.length > 0 ){
            obj_search.push({ $or: query_arr_keywords });
        }

        let response = await dbUserGitUserModel.aggregate([
            {
                $lookup: {
                    from: 'git_users',
                    localField: 'git_id',
                    foreignField: "git_id",
                    as: 'git_user'
                }
            },
            {
                $unwind: '$git_user'
            },
            {
                $lookup: {
                    from: 'git_repositories',
                    let: { root_git_user_id: "$git_id" }, // localfield
                   pipeline: [{
                        $match: {
                            $expr:{
                                $eq: ["$git_user_id","$$root_git_user_id" ]
                            }
                        }
                    }],
                    as: 'repositories',
                }
            },
            {
                $project: {
                    // _id: 1,
                    user_id: 1,
                    created_at: 1,
                    _id: 1,
                    git_id: 1,
                    name: "$git_user.name",
                    avatar: "$git_user.avatar",
                    repositories: {
                        git_user_id: 1,
                        repository_id: 1,
                        description: 1,
                        fork: 1,
                        html_url: 1,
                        language: 1,
                        repository_created_at: 1,
                        repository_updated_at: 1,
                        size: 1,
                        repository_name: 1,
                    }
                }
            },
            {
                $match: {
                    $and: obj_search
                },
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: 1
            },
        ]).exec();

        res.send({
            success: false,
            metadata: response
        })
        return;

    }

    async getGitUser( req: any, res:any )
    {

        res.send({
            success: false,
            metadata: "@TODO"
        })
        return;

    }

}

export default new UserController();