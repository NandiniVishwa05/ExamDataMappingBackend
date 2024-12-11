const express = require('express');
const router = express.Router();
const { fetchcourses, fetchcourseid, fetchsubjects, fetchsubjectid, overrideprogramdata, insertprogramdata, fetchprogramid, insertmarksdetail } = require('../Controller/InsertMarks/InsertMarksController');
const { fetchprogramidforreport } = require('../Controller/GenerateReport/GenerateReportController')
const { fetchuserdetails, insertuserdetail, fetchusers, deleteuser } = require('../Controller/AddUser/AddUserController');
const { checksubject, fetchallsubjects, deletesubject, filterbycourses, fetchsemanddiv } = require('../Controller/AddSubject/AddSubjectController.js');
const { fetchusercredentials } = require('../Controller/LoginPage/Loginpagecontroller.js')
const { insertadminprogramdetail, fetchadminprogramtabledetails, deleteadmintableprogramdetail } = require('../Controller/ManageProgram/ManageProgramController.js')
router.get('/fetchcourses', fetchcourses);
router.get('/fetchcourseid/:coursename', fetchcourseid);
router.get('/fetchsubjects/:courseid/:semester', fetchsubjects);
router.get('/fetchsubjectid/:subjectname', fetchsubjectid);
router.post('/overrideprogramdata', overrideprogramdata);
router.post('/insertprogramdata', insertprogramdata);
router.post('/fetchprogramid', fetchprogramid);
router.post('/insertmarksdetail', insertmarksdetail);
router.post('/fetchprogramidforreport', fetchprogramidforreport);
router.get('/fetchuserdetails/:userid', fetchuserdetails);
router.post('/insertuserdetail', insertuserdetail);
router.get('/fetchusers', fetchusers);
router.get('/deleteuser/:username', deleteuser);
router.get('/checksubject/:courseid/:semester/:subname', checksubject);
router.get('/fetchsubjects', fetchallsubjects);
router.get('/deletesubject/:subjectid', deletesubject);
router.get('/filterbycourses/:courseid/:semester', filterbycourses);
router.get('/fetchusercredentials/:userid/:userpassword', fetchusercredentials);
router.post('/insertadminprogramdetail', insertadminprogramdetail);
router.get('/fetchadminprogramtabledetails', fetchadminprogramtabledetails);
router.get('/deleteadmintableprogramdetail/:course_id', deleteadmintableprogramdetail);
router.get('/fetchsemanddiv/:course_id', fetchsemanddiv);


module.exports = { router }; 