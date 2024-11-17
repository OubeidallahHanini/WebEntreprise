const express = require('express');
const router = express.Router();
const {listVisitor, getVisitorDetails,updateVisitor,deleteUser } = require('../controller/VisitorController');
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire


router.get('/visitors', listVisitor);

router.get('/getVisitor/:VisitorId', getVisitorDetails);

router.put('/UpdateVisitor/:VisitorId',upload.single('photo'), updateVisitor);

router.delete('/deleteVisitor/:VisitorId', deleteUser);





module.exports = router;
