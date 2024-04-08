const { Post } = require('../models');

const postData = [
    {
        title: 'Light mode vs Dark mode',
        content: 'I like dark mode for everything, what do you guys think about this debate?',
        userId: 1
    },
    {
        title: 'VSCode Themes',
        content: 'I love the dracula theme on VSCode!',
        userId: 2
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;