var models = require('../models');
var Project = models.Project;
exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  Project.find({_id: projectID}).exec(function(err, projects){
    afterQuery(err, projects)
  })
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects[0])
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var project = new Project({
    title: form_data.project_title,
    date: form_data.date,
    summary: form_data.summary,
    image: form_data.image_url
  });

  project.save(function(err){
    addCallback(err)
  });

  function addCallback (err) {
    if(err){
      console.log(err)
    }
    else {
      res.send(200);
    }
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  Project.remove({_id: projectID}).exec(function(err){
    deleteCallback(err)
  })

  function deleteCallback (err) {
    if(err) { console.log(err); }
    res.send(200)
  }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}