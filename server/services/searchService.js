const Resource = require('../models/Resource');

// Simple non-AI keyword search
const searchResources = async (query) => {
  if (!query) {
    // Return latest resources if no query
    return await Resource.find().limit(20).sort({ createdAt: -1 });
  }

  const regex = new RegExp(query, 'i');

  return await Resource.find({
    $or: [
      { title: regex },
      { category: regex },
      { description: regex },
      { tags: regex },
      { source: regex }
    ]
  }).limit(20);
};

module.exports = {
  searchResources
};
