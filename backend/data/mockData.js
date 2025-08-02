const { faker } = require("@faker-js/faker");

// Generate mock customers
const customers = Array.from({ length: 50 }, (_, i) => {
  const orders = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      orderItemId: faker.string.uuid(),
      itemName: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: faker.number.int({ min: 100, max: 1000 }),
      customSize: {
        chest: faker.number.int({ min: 32, max: 44 }),
        waist: faker.number.int({ min: 28, max: 38 }),
        hips: faker.number.int({ min: 32, max: 44 })
      }
    }));

    return {
      orderId: faker.string.uuid(),
      orderDate: faker.date.recent().toISOString(),
      totalAmount: items.reduce((sum, item) => sum + item.price, 0),
      items
    };
  });

  return {
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(["active", "churned", "prospect"]),
    revenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    createdAt: faker.date.past().toISOString(),
    orderCount: orders.length,
    lastOrderDate: orders.length ? orders[orders.length - 1].orderDate : null,
    orders
  };
});

module.exports = customers;
