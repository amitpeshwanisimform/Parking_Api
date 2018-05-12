var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  flag: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required:true
  }
});

module.exports = {Todo};
