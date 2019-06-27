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
            res.status(401);
        }

        const newProject = new ProjectModel({
            owners: [req.header('token'), ],
            description: req.body.description,
            projtype: req.body.projtype,
            title: req.body.title,
            recruiting: req.body.recruiting,
            website: req.body.website
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

            newMaps.save((err) => {
                if (err) {
                    throw err;
                }
                res.json({
                    success: 1
                });
            });
        });
    });

    router.get('/', (req, res) => {
        if (!req.header('token')) {
            res.status(401);
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

    router.put('/:id', (req, res) => {
        if (!req.header('token')) {
            res.status(401);
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
                website: req.body.website
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
            res.status(401);
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