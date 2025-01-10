const Category = require("../Model/categoryModel");


const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = new categoryModel({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message || 'Failed to add category' });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ message: 'Categories fetched successfully', data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

module.exports = { addCategory, getCategories }