var _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => { return acc + cur.likes }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, currentBlog) => {
        return currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked;
    }, blogs[0] || null); // Return null if the array is empty
};

const mostBlogs = (blogs) => {
    const byWriter = _.groupBy(blogs, (b) => b.author)

    return _.reduce(byWriter, (acc, blogs, author) => {
        if (blogs.length > acc.blogs) {
            return { author, blogs: blogs.length }
        }
        return acc
    }, { author: '', blogs: 0 })
};

const mostLikes = (blogs) => {
    const byWriter = _.groupBy(blogs, (b) => b.author)

    const authorsWithLikes = _.map(byWriter, (blogs, author) => {
        const totalLikes = _.sumBy(blogs, (blog) => blog.likes);
        return { author, likes: totalLikes };
      });
    
      return _.maxBy(authorsWithLikes, 'likes') || null;
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}