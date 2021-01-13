const router = require('express').Router();
const dashController = require('../controllers/dashController');

router.get('/:id/allresumes', dashController.getResumes, (req, res) => {
  res.status(200).json(res.locals.resume);
});

router.get('/:id', dashController.getApplications, (req, res) => {
  res.status(200).json(res.locals.application);
});

router.post('/:id/resume', dashController.postResume, (req, res) => {
  res.status(200).send();
});

router.post('/:id/application', dashController.postApplication, (req, res) => {
  res.status(200).send();
});

router.delete('/:id/delete', dashController.deleteApplication, (req, res) => {
  res.status(200).send();
});

module.exports = router;
