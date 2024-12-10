const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Get pagination query parameters (default to page 1 and limit 10)
  const page = parseInt(event.queryStringParameters.page) || 1;
  const limit = parseInt(event.queryStringParameters.limit) || 10;

  try {
    // Read the blog data from the JSON file
    const blogList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../assets/data/blogList.json'), 'utf8'));

    // Calculate start and end indexes for pagination
    const start = (page - 1) * limit;
    const end = page * limit;

    // Slice the array to get the paginated blogs
    const paginatedBlogs = blogList.slice(start, end);

    // Return the paginated blog list as JSON
    return {
      statusCode: 200,
      body: JSON.stringify(paginatedBlogs),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load blog data' }),
    };
  }
};
