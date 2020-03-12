const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");
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
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// router.post("/api/transaction/bulk", ({ body }, res) => {
//     Transaction.insertMany(body)
//         .then(dbTransaction => {
//             res.json(dbTransaction);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

router.get("/api/worksouts", (req, res) => {
    Workout.find({})
        // .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;