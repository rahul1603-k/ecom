const db = require('./config/db');
require('dotenv').config();

const insertProducts = async () => {
  try {
    const connection = await db.getConnection();

    // Clear existing products
    await connection.query('DELETE FROM products');

    const products = [
      // SHOES
      ['Nike Air Max', 'Premium running shoes with air cushioning', 4999, 20, 'shoes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
      ['Adidas Ultraboost', 'Comfort sports shoes with boost technology', 6999, 15, 'shoes', 'https://images.unsplash.com/photo-1528701800489-20be9c1f68e6?w=500&q=80'],
      ['Puma Sneakers', 'Casual everyday sneakers', 3499, 25, 'shoes', 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=500&q=80'],
      ['Reebok Trainers', 'Professional gym training shoes', 3999, 30, 'shoes', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80'],

      // MEN
      ['Men Premium Shirt', 'Cotton formal shirt', 1299, 40, 'men', 'https://images.unsplash.com/photo-1596362051931-bfe67868341a?w=500&q=80'],
      ['Men Denim Jeans', 'Slim fit premium denim', 1999, 50, 'men', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&q=80'],
      ['Men T-Shirt', 'Classic cotton t-shirt', 699, 60, 'men', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'],
      ['Men Hoodie', 'Comfortable winter hoodie', 2499, 35, 'men', 'https://images.unsplash.com/photo-1556821552-5ff63b1b6bbb?w=500&q=80'],
      ['Men Jacket', 'Premium leather jacket', 5999, 20, 'men', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80'],
      ['Men Cargo Pants', 'Durable cargo pants', 1599, 45, 'men', 'https://images.unsplash.com/photo-1473962169022-56210e24e3ce?w=500&q=80'],

      // WOMEN
      ['Women Saree', 'Traditional silk saree', 3499, 20, 'women', 'https://images.unsplash.com/photo-1583002082903-3fda6b7d4c2b?w=500&q=80'],
      ['Women Kurti', 'Ethnic traditional kurti', 1299, 40, 'women', 'https://images.unsplash.com/photo-1605777927047-92750e853b16?w=500&q=80'],
      ['Women Top', 'Casual summer top', 899, 50, 'women', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'],
      ['Women Jeans', 'Stylish women denim', 1799, 45, 'women', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&q=80'],
      ['Women Dress', 'Elegant party dress', 2999, 25, 'women', 'https://images.unsplash.com/photo-1595777957583-95e058d6b451?w=500&q=80'],
      ['Women Leggings', 'Comfortable workout leggings', 699, 60, 'women', 'https://images.unsplash.com/photo-1542612176-7dcbb8f49a05?w=500&q=80'],

      // ELECTRONICS
      ['Wireless Headphones', 'Bluetooth noise cancelling headphones', 2999, 25, 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'],
      ['Smart Watch', 'Fitness tracking smart watch', 5499, 20, 'electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
      ['Laptop', 'High performance laptop computer', 55999, 10, 'electronics', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80'],
      ['Gaming Mouse', 'RGB gaming mouse with precision', 1499, 40, 'electronics', 'https://images.unsplash.com/photo-1587202372775-e9b9e6eaf6b2?w=500&q=80'],
      ['Bluetooth Speaker', 'Portable wireless speaker', 1999, 35, 'electronics', 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&q=80'],
      ['USB-C Cable', 'Fast charging cable', 299, 100, 'electronics', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80'],
      ['Phone Case', 'Protective phone case', 599, 80, 'electronics', 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&q=80'],

      // KIDS
      ['Kids Shoes', 'Comfortable kids sports shoes', 1999, 35, 'kids', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'],
      ['Kids T-Shirt', 'Colorful kids cotton shirt', 499, 50, 'kids', 'https://images.unsplash.com/photo-1520975922071-7f29c9b43e8c?w=500&q=80'],
      ['Kids Shorts', 'Comfortable kids shorts', 699, 45, 'kids', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80'],
      ['Toy Car', 'Remote control toy car', 1499, 25, 'kids', 'https://images.unsplash.com/photo-1585386959984-a4155226c9e3?w=500&q=80'],
      ['Teddy Bear', 'Soft plush teddy bear', 899, 40, 'kids', 'https://images.unsplash.com/photo-1601758064223-8f9f3a6e3a2b?w=500&q=80'],
      ['Kids Backpack', 'Colorful school backpack', 1299, 30, 'kids', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'],
      ['Kids Jacket', 'Warm winter jacket', 1799, 20, 'kids', 'https://images.unsplash.com/photo-1517418504900-9f33ff1d2e27?w=500&q=80'],
    ];

    // Insert products
    for (const product of products) {
      await connection.query(
        'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        product
      );
    }

    connection.release();
    console.log(`✓ ${products.length} products inserted successfully`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Error inserting products:', err.message);
    process.exit(1);
  }
};

insertProducts();
