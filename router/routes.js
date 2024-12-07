const express = require('express');
const router = express.Router();
const { fetchcourses, fetchcourseid, fetchsubjects, fetchsubjectid, overrideprogramdata, insertprogramdata, fetchprogramid, insertmarksdetail } = require('../Controller/InsertMarks/InsertMarksController');
const {fetchprogramidforreport} = require('../Controller/GenerateReport/GenerateReportController')
router.get('/fetchcourses', fetchcourses);
router.get('/fetchcourseid/:coursename', fetchcourseid);
router.get('/fetchsubjects/:courseid/:semester', fetchsubjects);
router.get('/fetchsubjectid/:subjectname', fetchsubjectid);
router.post('/overrideprogramdata', overrideprogramdata);
router.post('/insertprogramdata', insertprogramdata);
router.post('/fetchprogramid', fetchprogramid);
router.post('/insertmarksdetail', insertmarksdetail);
router.post('/fetchprogramidforreport',fetchprogramidforreport);
module.exports = { router }; 