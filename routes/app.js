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


router.post("/api/workouts", ({ body }, res) => {
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

    workout.findByIdAndUpdate(
      req.params.id,
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
    db.Workout.find({})
        .sort({ day: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout.reverse()); // to get 7 newest workouts
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;