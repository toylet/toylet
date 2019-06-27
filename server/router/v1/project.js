const ProjectModel = require('../../models/project');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/', (req, res) => {
        if (!req.header('token')) {
            res.statusCode(401);
        }
        const newProject = new ProjectModel({
            owners: [req.header('token'), ],
            description: req.body.description,
            type: req.body.type,
            title: req.body.title,
            recruiting: req.body.recruiting,
            website: req.body.website
        });

        newProject.save((err) => {
            if (err) {
                throw err;
            }
            res.json({
                'success': 1
            });
        });
    });

    router.get('/', (req, res) => {
        if (!req.header('token')) {
            res.statusCode(401);
        }
        ProjectModel.find({
            owners: req.header('token')
        }, (err, docs) => {
            res.json(docs);
        });
    });

    router.put('/:id', (req, res) => {
        if (!req.header('token')) {
            res.statusCode(401);
        }
        ProjectModel.update({
            _id: id
        }, {
            $set: {
                owners: req.body.owners,
                posts: req.body.posts,
                lastUpdated: Date.now,
                likes: req.body.likes,
                description: req.body.description,
                type: req.body.type,
                title: req.body.title,
                recruiting: req.body.recruiting,
                website: req.body.website
            }
        }, (err) => {
            if (err) {
                throw err;
            }
        })
    })

    router.delete('/:id', (req,res)=>{
        if (!req.header('token')){
            res.statusCode(401);
        }
    })

    return router;
}