const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['header', 'footer', 'sidebar', 'content'],
  },
  description: {
    type: String,
    default: null,
  },

  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
  events: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Event',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
Schema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
};
module.exports = mongoose.model('Layout', Schema);

// layout
// {
//       name:"header",
//       template: {
//             title: " simple dan elegant",
//                   description: "simple dan elegant",
//                   color_pallet: ["#000000",'#ffffff'],
//       }
//       description: "simple dan elegant",
//             component: "<h1>123</h1>",
//             events: [
//                   {
//                         name: "test",
//                         time: "12:00",
//                         ..
//                   },

//             ],
// }

// // component
// // res html

// // layout/create
// {

// }
// //
