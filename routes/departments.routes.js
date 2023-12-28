const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const ObjectId = require('mongodb').ObjectId;
const Department = require('../models/department.model');

/* router.get('/departments', (req, res) => {
  res.json(db.departments);
}); */
/*router.get('/departments', (req, res) => {
  req.db.collection('departments')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}); */
router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


/* router.get('/departments/random', (req, res) => {
  res.json(db.departments[Math.floor(Math.random() * db.length)]);
}); */
/*router.get('/departments/random', (req, res) => {
  req.db.collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});*/
router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

/*router.get('/departments/:id', (req, res) => {
  res.json(db.departments.find(item => item.id == req.params.id));
});*/
/* router.get('/departments/:id', (req, res) => {
  req.db.collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if(!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */
router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

/* router.post('/departments', (req, res) => {
  const { name } = req.body;
  db.departments.push({ id: 3, name })
  res.json({ message: 'OK' });
}); */
/* router.post('/departments', (req, res) => {
  const { name } = req.body;

  req.db.collection('departments')
    .insertOne({name: name})
    .then(() => {
      res.json({ message: 'OK' })
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */
router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

/* router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  db = db.departments.map(item => (item.id == req.params.id) ? { ...item, name } : item );
  res.json({ message: 'OK' });
}); */
/* router.put('/departments/:id', (req, res) => {
  const { name } = req.body;

  req.db.collection('departments')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */
router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json({ message: 'OK, changed document: ', dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

/* router.delete('/departments/:id', (req, res) => {
  db = db.departments.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
}); */
/*router.delete('/departments/:id', (req, res) => {
  req.db.collection('departments')
    .deleteOne({_id: ObjectId(req.params.id)})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */
router.delete('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK, deleted document: ', dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;