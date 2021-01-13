const db = require('../models/userModel');

const dashController = {};

dashController.getResumes = async (req, res, next) => {
  const { id } = req.params;
  const resumeQuery = `SELECT * FROM resume_table WHERE user_id = $1`;

  try {
    const data = await db.query(resumeQuery, [id]);
    res.locals.resume = data.rows;
    return next();
  } catch (err) {
    next({
      log: `dashController.getResumes: ERROR: ${err}`,
      message: { err: 'Error occurred in getResumes controller' },
    });
  }
};

dashController.getApplications = async (req, res, next) => {
  const { id } = req.params;
  const applicationQuery = `SELECT * FROM application_table WHERE user_id = $1`;

  try {
    const data = await db.query(applicationQuery, [id]);
    res.locals.application = data.rows;
    return next();
  } catch (err) {
    next({
      log: `dashController.getApplications: ERROR: ${err}`,
      message: { err: 'Error occurred in getApplications controller' },
    });
  }
};

dashController.postResume = async (req, res, next) => {
  const { resName, link } = req.body;
  const { id } = req.params;
  const postResumeQuery = `INSERT INTO resume_table (res_name, link, user_id) VALUES ($1, $2, $3)`;
  const queryParams = [resName, link, id];

  try {
    await db.query(postResumeQuery, queryParams);
    return next();
  } catch (err) {
    next({
      log: `dashController.postResume: ERROR: ${err}`,
      message: { err: 'Error occurred in postResume controller' },
    });
  }
};

dashController.postApplication = async (req, res, next) => {
  const { id } = req.params;
  const {
    companyName,
    rating,
    jobPostLink,
    status,
    comments,
    techStack,
    resumeId,
  } = req.body;

  const postApplicationQuery = `INSERT INTO application_table (company_name, rating, job_post_link, status, comments, tech_stack, resume_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

  const queryParams = [
    companyName,
    rating,
    jobPostLink,
    status,
    comments,
    techStack,
    resumeId,
    id,
  ];

  try {
    await db.query(postApplicationQuery, queryParams);
    return next();
  } catch (err) {
    next({
      log: `dashController.postApplication: ERROR: ${err}`,
      message: { err: 'Error occurred in postApplication controller' },
    });
  }
};

dashController.deleteApplication = async (req, res, next) => {
  const { id } = req.body;
  const deleteQuery = `DELETE FROM application_table WHERE id = $1`;

  try {
    await db.query(deleteQuery, [id]);
    return next();
  } catch (err) {
    next({
      log: `dashController.deleteApplication: ERROR: ${err}`,
      message: { err: 'Error occurred in deleteApplication controller' },
    });
  }
};

module.exports = dashController;
