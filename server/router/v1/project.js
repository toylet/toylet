const ProjectModel = require('../../models/project');
const MapsModel = require('../../models/userProjectMaps');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/', (req, res) => {
        if (!req.header('token')) {
            res.status(401).json({ success: 0 });
        }

        const newProject = new ProjectModel({
            owners: [req.header('token'), ],
            description: req.body.description,
            projtype: req.body.projtype,
            title: req.body.title,
            recruiting: req.body.recruiting,
            repo: req.body.repo
        });

        newProject.save((err) => {
            if (err) {
                throw err;
            }
            const newMaps = new MapsModel({
                ownerId: req.header('token'),
                projectId: newProject._id,
                available: {
                    workingHour: req.body.workingHour,
                    contributableDate: req.body.contributableDate
                },
                message: req.body.message,
                isOwner: true
            });

            newMaps.save((err, doc) => {
                if (err) {
                    throw err;
                }
                res.json({
                    success: true,
                    project: doc
                });
            });
        });
    });

    router.post('/gitconnect'), (req, res) =>{
        if (!req.header('token')){
            res.status(401).json({ success : false });
        }
        ProjectModel.findOne({
            _id : req.body.projectId
        },(err,result) =>{
            if(err){
                throw err;
            }
            result.connection = req.body.repo;
            result.save({},(err)=>{
                if(err){
                    throw err;
                }
                res.status(200).json({success:true});
            })
        })
    }

    router.get('/', (req, res) => {
        if (!req.header('token')) {
            res.status(401).json({ success: 0 });
        }
        ProjectModel.find({
            owners: req.header('token')
        }, (err, docs) => {
            MapsModel.find({
                ownerId: req.header('token')
            }, (err, docs2) => {
                res.json({
                    project: docs,
                    map: docs2
                })
            })
        });
    });


    router.get('/:id', (req, res) => {
        ProjectModel.findOne({
            _id: req.params.id
        }, (err, doc) => {
            res.json(doc);
        })
    });


    router.put('/:id', (req, res) => {
        if (!req.header('token')) {
            res.status(401).json({ success: 0 });
        }
        ProjectModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                owners: req.body.owners,
                posts: req.body.posts,
                lastUpdated: Date.now(),
                likes: req.body.likes,
                description: req.body.description,
                type: req.body.type,
                title: req.body.title,
                recruiting: req.body.recruiting,
                repo: req.body.repo
            }
        }, (err, docs) => {
            if (err) {
                throw err;
            };
            res.json(docs);
        });
    });

    router.delete('/:id', (req, res) => {
        if (!req.header('token')) {
            res.status(401).json({ success: 0 });
        }
        MapsModel.find({
            projectId: req.params.id
        }, (err, docs) => {
            if (err) {
                throw err;
            }
            if (!docs.length) {
                MapsModel.deleteAll({
                    _id: req.params.id
                }, (err) => {
                    if (err) {
                        throw err;
                    }
                    ProjectModel.deleteOne({
                        _id: req.params.id
                    }, (err) => {
                        if (err) {
                            throw err;
                        };
                        res.json(req.params.id);
                    });
                })
            }
        })
    });

    return router;
}
