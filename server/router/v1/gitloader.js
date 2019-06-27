const UserModel = require('../../models/user');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });


    router.get('/userrepo', async (req, res) => {
        if (!req.header('token')) {
            res.status(401);
        };


        const BASEURL = 'https://api.github.com/user'
        const gitToken = '72a641b36c2ec9a1a805cd96e191a3fecc3efba7';
        
        UserModel.findOneAndUpdate({
            _id : req.header('token')
        },{
            $set: {
                gittoken : gitToken
            }
        }, (err) => {
            if (err) {
                throw err;
            };
        });

        const result = await axios.get(BASEURL + '/repos', {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        });

        var URLs = {
            'urls': []
        };

        console.log(result.data.length);
        for (i = 0; i < result.data.length; ++i) {
            console.log(result.data[i].full_name);
            URLs.urls.push(result.data[i].full_name);
        }
        res.json(URLs);
    });

    router.get('/commits', async (req, res) => {
        if (!res.header('token')) {
            res.status(401);
        }
        const BASEURL = 'https://api.github.com'
        
        //TODO(Taeyoung) : change these dummy data
        const repoName = 'HDT_Puzzle';
        // const repoName = req.body.reponame;
        const userName = 'Jelldo'
        const gitToken = '72a641b36c2ec9a1a805cd96e191a3fecc3efba7';
        const result = await axios.get(BASEURL + '/repos/' + userName + '/' + repoName + '/commits', {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        });

        const len = result.data.length;
        // for (i = 0; i < len; ++i) {
        //     console.log(result.data[i].commit.message);
        //     console.log(result.data[i].commit.author.date);
        // }


        // console.log(result.data.commit);
        var commits = {
            'commit': []
        };

        for (i = 0; i < len; ++i) {
            commits.commit.push({
                'timestamp': result.data[i].commit.author.date,
                'message': result.data[i].commit.message
            });
        }
        res.json(commits);
    });
    return router;
}