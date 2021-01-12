const db = require('../models/userModel');

const dashController = {};

dashController.getResumes = async (req, res, next) => {
  const { id } = req.params;
  const resumeQuery = `SELECT res_name FROM resume_table WHERE user_id = $1`;
  try {
    const data = await db.query(resumeQuery, [id]);
    res.locals.resume = data.rows[0]
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
    res.locals.application = data.rows[0];
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
  const { id } = req.params
  const postResumeQuery = `INSERT INTO resume_table (res_name, link, user_id) VALUES ($1, $2, $3)`
  const queryParams = [resName, link, id]
  try {
    const data = await db.query(postResumeQuery, queryParams);
    res.locals.postResume = data.rows[0];
    return next();
  } catch (err) {
    next({
      log: `dashController.postResume: ERROR: ${err}`,
      message: { err: 'Error occurred in postResume controller' }
    });
  }
}

dashController.postApplication = async (req, res, next) => {
  const { id } = req.params;
  const { companyName, rating, jobPostLink, status, comments, techStack } = req.body;
  const getResumeId = `SELECT id FROM resume_table WHERE user_id = $1`
 
  try {
    const resumeId = await db.query(getResumeId, [id]);
    const queryParams = [companyName, rating, jobPostLink, status, comments, techStack, resumeId, id]

    const postApplicationQuery = `INSERT INTO application_table (company_name, rating, job_post_link, status, comments, tech_stack, resume_id, user_id) VALUES ($2, $3, $4, $5, $6,$7, ${resumeId}, $1)`;
    
    const data = await db.query(postApplicationQuery, queryParams)
    console.log(data)
    res.locals.postApplication = data.rows[0];
    return next();
  } catch (err) {
    next({
      log: `dashController.postApplication: ERROR: ${err}`,
      message: { err: 'Error occurred in postApplication controller' },
    });
  }
}

module.exports = dashController;