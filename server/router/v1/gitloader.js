const UserModel = require('../../models/user');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.get('/userrepo', async (req, res) => {
        if (!req.header('token')) {
            res.status(401).json({ success: 0 });
        };
        const gitToken = req.header('gittoken');
        // const gitToken = '99a1440abb79ed07664949a75e4bb41e332cf2e9';
        const BASEURL = 'https://api.github.com/user'

        const result = await axios.get(BASEURL + '/repos', {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        }).catch((err) => {
            console.log(err);
            console.log('error hh');
            res.status(400).json({ success: 0 }); 
        });

        const user = await axios.get(BASEURL, {
            headers: {
                'Authorization': 'token ' + gitToken
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ success: 0 });
        });

        const userName = user.data.login;

        UserModel.findOneAndUpdate({
            _id: req.header('token')
        }, {
                $set: {
                    gittoken: gitToken,
                    gitId: userName
                }
            }).catch((err) => {
                console.log(err);
                res.json({ success: 0 });
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
        // const gittoken = req.header('gittoken');

        //TODO(Taeyoung) : change these dummy data
        const repoName = 'toylet';
        // const repoName = req.body.reponame;
        const ownerName = 'toylet'

        const user = UserModel.findOne({ _id: req.header('token') });
        console.log(user);
        const result = await axios.get(BASEURL + '/repos/' + ownerName + '/' + repoName + '/commits', {
            headers: {
                'Authorization': 'token ' + user.gittoken
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ success: 0 });
        });

        var commits = {
            'commit': []
        };

        const len = result.data.length;
        for (i = 0; i < len; ++i) {
            const today = new Date().toLocaleDateString();
            const commitDay = new Date(result.data[i].commit.author.date).toLocaleDateString();
            if (today == commitDay && result.data[i].commit.author.name == user.gitId) {
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