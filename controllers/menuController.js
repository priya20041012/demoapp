// let menu = require('../data/menu');

// // GET all menu items
// exports.getMenu = (req, res) => {
//   res.json(menu);
// };

// // GET menu item by ID
// exports.getMenuItemById = (req, res) => {
//   const item = menu.find(m => m.id === parseInt(req.params.id));
//   if (!item) return res.status(404).json({ message: 'Menu item not found' });
//   res.json(item);
// };

// // POST new menu item
// exports.createMenuItem = (req, res) => {
//   const { name, price, category } = req.body;
//   if (!name || !price || !category) {
//     return res.status(400).json({ message: 'Name, price, and category are required' });
//   }

//   const newItem = {
//     id: menu.length ? menu[menu.length - 1].id + 1 : 1,
//     name,
//     price,
//     category
//   };

//   menu.push(newItem);
//   res.status(201).json(newItem);
// };

// // PUT update menu item
// exports.updateMenuItem = (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = menu.find(m => m.id === id);

//   if (!item) return res.status(404).json({ message: 'Menu item not found' });

//   const { name, price, category } = req.body;

//   if (name) item.name = name;
//   if (price) item.price = price;
//   if (category) item.category = category;

//   res.json(item);
// };

// // DELETE menu item
// exports.deleteMenuItem = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = menu.findIndex(m => m.id === id);

//   if (index === -1) return res.status(404).json({ message: 'Menu item not found' });

//   const deleted = menu.splice(index, 1);
//   res.json({ message: 'Menu item deleted', item: deleted[0] });
// };
const MenuItem = require('../model/menuItem');

// GET all menu items
exports.getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message });
  }
};

// GET menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

// POST new menu item
exports.createMenuItem = async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price == null || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required' });
  }

  try {
    const newItem = new MenuItem({ name, price, category });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message });
  }
};

// PUT update menu item
exports.updateMenuItem = async (req, res) => {
  const { name, price, category } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true, runValidators: true }
    );

    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update item', error: err.message });
  }
};

// DELETE menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });

    res.json({ message: 'Menu item deleted', item: deletedItem });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete item', error: err.message });
  }
};
