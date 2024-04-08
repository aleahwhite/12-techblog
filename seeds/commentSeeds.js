const { Comment } = require('../models');

const commentData = [
    {
        commentText: 'I like light mode for certain things, but mainly dark mode for me too!',
        userId: 2, 
        postId: 1  
    },
    {
        commentText: 'I like to use a very dark theme',
        userId: 1, 
        postId: 2  
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;