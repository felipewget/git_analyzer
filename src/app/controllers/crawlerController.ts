import GithubLib from './../libraries/githubLib'
import { dbRepositorie } from './../types/dbTypes'
import { gitRepositoriesModel } from './../models/gitRepositoriesSchema'
import { usersModal } from './../models/usersSchema'
import { gitUserModel } from './../models/gitUserSchema'
import { dbUserGitUserModel } from './../models/userGitUserSchema'
import BalanceLib from './../libraries/balanceLib'

class CrawlerController {

    async getGitBasicData( req: any, res:any )
    {

        let cost_to_req:number = 1;

        let git_username: string = req.params.git_username;

        let balanceLib = new BalanceLib();

        let user_id = req.user_id;

        let balance: number = await balanceLib.getMyBalance( user_id );
        if( ( balance - cost_to_req ) < 0 ){

            res.send({
                success: false,
                metadata: "WITHOUT_BALANCE"
            })
            return;

        }

        // Check if profile is selected

        let repositories_fields: Array<string> = [
            'id', 'name', 'fill_name', 'owner', 'description',
            'fork', 'html_url', 'created_at', 'updated_at', 'language', 
            'size', 'stargazers_count', 'watchers_count', 'owner'
        ];

        let githubLib = new GithubLib( git_username );
        
        await balanceLib.removeCoinsFromBalance( user_id, cost_to_req );
        let response = await githubLib.curlGetRepositories();

        if( response.success == true ){

            if( response.success == true ){

                // balance

                let repositories = await githubLib.listRepositories( repositories_fields );
            
                let treated_to_db_repository: Array<dbRepositorie> = await repositories.map( ( obj: any ) => {

                    return {
                        user_id: user_id,
                        git_user_id: obj.owner.id,
                        repository_id: obj.id,
                        repository_name: obj.name,
                        description: obj.description,
                        html_url: obj.html_url,
                        language: obj.language,
                        size: obj.size,
                        fork: obj.fork && obj.fork === true ? true : false,
                        stargazers_count: obj.stargazers_count ? obj.stargazers_count : 0,
                        watchers_count: obj.watchers_count ? obj.watchers_count : 0,
                        repository_created_at: obj.created_at,
                        repository_updated_at: obj.updated_at,
                    }  

                });

                // Add/Update Github User
                if( treated_to_db_repository.length < 1 ){

                    res.send({
                        success: false,
                        metadata: "NO_PUBLIC_REPOSITORIES"
                    })
                    return;

                }

                // Insert/Update DB
                for( let i in treated_to_db_repository ){
                    
                    let conditions = { repository_id: treated_to_db_repository[i].repository_id };
                    
                    await gitRepositoriesModel.updateOne( conditions, treated_to_db_repository[i], { upsert: true }, (err, results) => {
                        if (err) {
                          console.log(`Erro: ${err}`);
                        }
                    });

                }

                // @todo adicionar metadata, pra deixar o sistema veloz.. count_repo... por exemplo
                let user_conditions = { git_id: repositories[0].owner.id }
                let obj_update_user = {
                    git_id: repositories[0].owner.id,
                    name: repositories[0].owner.login,
                    avatar: repositories[0].owner.avatar_url ? repositories[0].owner.avatar_url : ""
                }
                let response_user = await gitUserModel.updateOne( user_conditions, obj_update_user, { upsert: true }, (err, results) => {
                    if (err) {
                      console.log(`Erro: ${err}`);
                    }
                });

                // To create link between gituser and user
                let user_link_conditions = {
                    git_id: repositories[0].owner.id,
                    user_id: user_id
                }
                await dbUserGitUserModel.updateOne( user_link_conditions, obj_update_user, { upsert: true }, (err, results) => {
                    if (err) {
                      console.log(`Erro: ${err}`);
                    }
                });
                
                res.send({
                    success: true,
                    metadata: treated_to_db_repository
                })
                return;
                
            }

        }

        res.send({
            success: false,
            error: "Erro ao processar sua requisição, não se preocupe, nossos engenheiros já estão realizando ajustando"
        })
        
        return;

    }

    async analyzerRepositories()
    {

    }

}

export default new CrawlerController();