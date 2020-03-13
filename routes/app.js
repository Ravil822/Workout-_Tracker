const router = require("express").Router();
const workout = require("../models/workout.js");
const path = require("path");
var db = require("../models");
//************************************************************//
// HTML Routes
//************************************************************//

// Homepage route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
// Stats route
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
// Exercise route
  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


//************************************************************//
// APIs Routes
//************************************************************//


router.post("/api/worksouts", ({ body }, res) => {
    console.log(body);
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req)
    let body = req.body;

    workout.update(
      { _id: mongojs.ObjectId(req.params.id) },
      {
        $push: {
          exercises: {
            type: body.type,
            name: body.name,
            duration: body.duration,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets,
            distance: body.distance,
            totalDuration: body.totalDuration
          }
        }
      })
      .then(workoutResult => {
        res.json(workoutResult)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })


router.get("/api/workouts/range", (req, res) => {
    workout.find({})
        // .sort({ date: -1 })
        .then(workoutResult => {
            res.json(workoutResult);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/worksouts", (req, res) => {
    db.workout.find({})
        // .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;