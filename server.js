import express from 'express';
import { readData, writeData } from './lib/fileStore.js';

const app = express();
app.use(express.json());

const PORT = 3001;


// --- Categories API ---

app.get('/api/categories', async (req, res) => {
  try {
    const { status, hasChildren, parentId } = req.query;
    let categories = await readData('categories.json');
    if (status) {
      categories = categories.filter(c => c.status === status);
    }

    if (parentId) {
      const targetParentId = parentId === 'null' ? null : parentId;
      categories = categories.filter(c => c.parentId === targetParentId);
    }

    if (hasChildren === 'true') {
      const allCategories = await readData('categories.json'); // need full list to check children
      categories = categories.filter(c => {
        return allCategories.some(child => child.parentId === c.id && child.status === 'published');
      });
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/categories/:id/breadcrumb', async (req, res) => {
  try {
    const categories = await readData('categories.json');
    let currentId = req.params.id;
    const hierarchy = [];

    while (currentId) {
      const cat = categories.find(c => c.id === currentId);
      if (cat) {
        hierarchy.unshift(cat);
        currentId = cat.parentId;
      } else {
        break;
      }
    }
    res.json(hierarchy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const categories = await readData('categories.json');
    const newCategory = {
      ...req.body,
      id: req.body.id || `cat-${Date.now()}` // Fallback ID generation
    };
    categories.push(newCategory);
    await writeData('categories.json', categories);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categories = await readData('categories.json');
    const index = categories.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories[index] = { ...categories[index], ...req.body };
    await writeData('categories.json', categories);
    res.json(categories[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await readData('categories.json');
    
    // Safety check 1: Has children
    const hasChildren = categories.some(c => c.parentId === id);
    if (hasChildren) {
      return res.status(400).json({ error: 'Cannot delete category because it has child categories.' });
    }

    // Safety check 2: Used in Navbar
    const navbar = await readData('navbar.json');
    let usedInNavbar = false;
    for (const item of navbar.navItems || []) {
      if (item.megaMenu && item.megaMenu.columns) {
        for (const col of item.megaMenu.columns) {
          for (const group of col.groups || []) {
            if (group.referenceId === id) usedInNavbar = true;
            for (const menuitem of group.items || []) {
              if (menuitem.referenceId === id) usedInNavbar = true;
            }
          }
        }
      }
    }

    if (usedInNavbar) {
      return res.status(400).json({ error: 'Cannot delete category because it is referenced in the Navbar Builder.' });
    }

    const filtered = categories.filter(c => c.id !== id);
    await writeData('categories.json', filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Navbar API ---

app.get('/api/navbar', async (req, res) => {
  try {
    const navbar = await readData('navbar.json');
    // Populating isn't strictly requested by the prompt for *every* read if frontend already does it, 
    // but the prompt said: "with each categoryId reference resolved/populated... so the frontend doesn't need to do that manually."
    // Actually, MegaMenuBuilder relies on having the referenceId. We will return the structure as is for the builder, 
    // but we could attach resolved data if needed. I'll return it as is since the builder expects referenceId and expects to hydrate it using categories if needed, or we can hydrate it.
    // Let's hydrate it just in case:
    const categories = await readData('categories.json');

    const hydratedNavbar = { ...navbar };
    if (hydratedNavbar.navItems) {
      hydratedNavbar.navItems = hydratedNavbar.navItems.map(item => {
        if (item.megaMenu && item.megaMenu.columns) {
          const newColumns = item.megaMenu.columns.map(col => ({
            ...col,
            groups: (col.groups || []).map(group => {
              const cat = categories.find(c => c.id === group.referenceId);
              return {
                ...group,
                _resolvedCategory: cat || null,
                items: (group.items || []).map(i => ({
                  ...i,
                  _resolvedCategory: categories.find(c => c.id === i.referenceId) || null
                }))
              };
            })
          }));
          return { ...item, megaMenu: { ...item.megaMenu, columns: newColumns } };
        }
        return item;
      });
    }

    res.json(hydratedNavbar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/navbar', async (req, res) => {
  try {
    const navbarData = req.body;
    const categories = await readData('categories.json');
    
    // Server-side validation
    for (const item of navbarData.navItems || []) {
      if (item.megaMenu && item.megaMenu.columns) {
        for (const col of item.megaMenu.columns) {
          const usedIds = new Set();
          
          for (const group of col.groups || []) {
            if (group.referenceType === 'category' && group.referenceId) {
              const cat = categories.find(c => c.id === group.referenceId);
              if (!cat || cat.status !== 'published') {
                return res.status(400).json({ error: `Category reference ${group.referenceId} does not exist or is not published.` });
              }
              if (usedIds.has(group.referenceId)) {
                return res.status(400).json({ error: `Duplicate category ${group.referenceId} in column ${col.id}` });
              }
              usedIds.add(group.referenceId);
            }
          }
        }
      }
    }

    // Strip out the _resolvedCategory before saving to keep it clean
    const cleanNavbarData = { ...navbarData };
    if (cleanNavbarData.navItems) {
      cleanNavbarData.navItems = cleanNavbarData.navItems.map(item => {
        if (item.megaMenu && item.megaMenu.columns) {
          const newColumns = item.megaMenu.columns.map(col => ({
            ...col,
            groups: (col.groups || []).map(group => {
              const { _resolvedCategory, ...cleanGroup } = group;
              return {
                ...cleanGroup,
                items: (group.items || []).map(i => {
                  const { _resolvedCategory: _rc, ...cleanItem } = i;
                  return cleanItem;
                })
              };
            })
          }));
          return { ...item, megaMenu: { ...item.megaMenu, columns: newColumns } };
        }
        return item;
      });
    }

    await writeData('navbar.json', cleanNavbarData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express API server running on http://localhost:${PORT}`);
});
    await writeData('navbar.json', cleanNavbarData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express API server running on http://localhost:${PORT}`);
});
