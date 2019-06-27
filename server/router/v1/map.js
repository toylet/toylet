const MapsModel = require('../../models/userProjectMaps');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/:id', (req, res) => {
        if (!req.header('token')) {
            res.status(401);
        }

        const newMaps = new MapsModel({
            ownerId: req.header('token'),
            projectId : req.params.id,
            available : {
                workingHour : req.body.workingHour,
                contributableDate : req.body.contributableDate
            },
            message : req.body.message,
            isOwner : false
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
            res.status(401);
        }
        MapsModel.find({
            owners: req.header('token')
        }, (err, docs) => {
            res.json(docs);
        });
    });

    router.put('/:id', (req, res) =>{
        if (!req.header('token')){
            res.status(401);
        }
        MapsModel.findOneAndUpdate({
            ownerId : req.header('token'),
            projectId : req.params.id
        }, {
            $set: {
                available:{
                    workingHour : req.body.workingHour,
                    contributableDate : req.body.contributableDate
                },
                message:req.body.message
            }
        }, (err, docs) => {
            if(err) {
                throw err;
            };
            res.json(docs);
        });
    });

    router.delete('/:id', (req, res) => {
        if (!req.header('token')) {
            res.status(401);
        }
        ProjectModel.deleteOne({
            ownerId : req.header('token'),
            projectId : req.params.id
        }, (err) => {
            if (err) {
                throw err;
            };
            res.json(req.params.id);
        });
    });

    return router;
}