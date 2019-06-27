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
            res.status(401).json({ success: 0 });
        };
        // get userName !!!
        //input = gitToken
        //TODO(Taeyoung) : change these dummy data
        const gitToken = '33b0c3c66cc2b3e7c11f4617f042d79822de5636';
        const BASEURL = 'https://api.github.com/user'

        const result = await axios.get(BASEURL + '/repos', {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ success: 0 });
        });

        var URLs = {
            'urls': []
        };

        for (i = 0; i < result.data.length; ++i) {
            URLs.urls.push(result.data[i].full_name);
        }
        res.json(URLs);
    });

    router.put('/userrepo', async (req, res) => {
        // req.body=> reponame
        

    });

    router.get('/commits', async (req, res) => {
        const token = res.header('token');
        if (!token) {
            res.status(401).json({ success: 0 });
        }
        const BASEURL = 'https://api.github.com'

        //TODO(Taeyoung) : change these dummy data
        const repoName = 'toylet';
        // const repoName = req.body.reponame;
        const ownerName = 'toylet'
        const gitToken = '33b0c3c66cc2b3e7c11f4617f042d79822de5636';
        const result = await axios.get(BASEURL + '/repos/' + ownerName + '/' + repoName + '/commits', {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ success: 0 });
        });

        const len = result.data.length;

        // for (i = 0; i < len; ++i) {
        //     console.log(result.data[i].commit.message);
        //     console.log(result.data[i].commit.author.name);
        // }
        // console.log(result.data.commit);

        var commits = {
            'commit': []
        };
        
        for (i = 0; i < len; ++i) {
            const today = new Date().toLocaleDateString();
            const commitDay = new Date(result.data[i].commit.author.date).toLocaleDateString();
            // name check here
            if (today == commitDay) {
                commits.commit.push({
                    'timestamp': result.data[i].commit.author.date,
                    'message': result.data[i].commit.message
                });
            }
        }
        res.json(commits);
    });
    return router;
}