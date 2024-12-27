const express = require('express');
const router = express.Router();
const { fetchcourses, fetchcourseid, fetchsubjects, fetchsubjectid, overrideprogramdata, insertprogramdata, fetchprogramid, insertmarksdetail } = require('../Controller/InsertMarks/InsertMarksController');
const { fetchprogramidforreport } = require('../Controller/GenerateReport/GenerateReportController')
const { fetchuserdetails, insertuserdetail, fetchusers, deleteuser } = require('../Controller/AddUser/AddUserController');
const { checksubject, fetchallsubjects, deletesubject, filterbycourses, fetchsemanddiv } = require('../Controller/AddSubject/AddSubjectController.js');
const { insertadminprogramdetail, fetchadminprogramtabledetails, deleteadmintableprogramdetail } = require('../Controller/ManageProgram/ManageProgramController.js')
const { fetchusercredentials, logout, verifytoken, fetchusertype } = require('../Controller/LoginPage/Loginpagecontroller.js');

router.get('/fetchcourses', verifytoken, fetchcourses);
router.get('/logout', verifytoken, logout);
router.get('/fetchusertype', verifytoken,fetchusertype);
router.get('/fetchcourseid/:coursename', verifytoken, fetchcourseid);
router.get('/fetchsubjects/:courseid/:semester', verifytoken, fetchsubjects);
router.get('/fetchsubjectid/:subjectname', verifytoken, fetchsubjectid);
router.post('/overrideprogramdata', verifytoken, overrideprogramdata);
router.post('/insertprogramdata', verifytoken, insertprogramdata);
router.post('/fetchprogramid', verifytoken, fetchprogramid);
router.post('/insertmarksdetail', verifytoken, insertmarksdetail);
router.post('/fetchprogramidforreport', verifytoken, fetchprogramidforreport);
router.get('/fetchuserdetails/:userid', verifytoken, fetchuserdetails);
router.post('/insertuserdetail', verifytoken, insertuserdetail);
router.get('/fetchusers', verifytoken, fetchusers);
router.get('/deleteuser/:username', verifytoken, deleteuser);
router.get('/checksubject/:courseid/:semester/:subname', verifytoken, checksubject);
router.get('/fetchsubjects', verifytoken, fetchallsubjects);
router.get('/deletesubject/:subjectid', verifytoken, deletesubject);
router.get('/filterbycourses/:courseid/:semester', verifytoken, filterbycourses);
router.get('/fetchusercredentials/:userid/:userpassword', fetchusercredentials);//no
router.post('/insertadminprogramdetail', verifytoken, insertadminprogramdetail);
router.get('/fetchadminprogramtabledetails', verifytoken, fetchadminprogramtabledetails);
router.get('/deleteadmintableprogramdetail/:course_id', verifytoken, deleteadmintableprogramdetail);
router.get('/fetchsemanddiv/:course_id', verifytoken, fetchsemanddiv);


module.exports = { router }; 