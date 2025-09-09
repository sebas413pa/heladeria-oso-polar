# Copilot Instructions for Heladeria Oso Polar

## Project Overview
- This is a Node.js backend for a Heladeria (ice cream shop) management system.
- Uses Sequelize ORM for MySQL database access.
- Main entities: Clientes, Productos, Ventas, Sabores, DetalleVenta.
- Follows a basic MVC structure: `models/`, `controllers/`, `routes/`.

## Key Components
- `models/`: Sequelize models for each DB table. `init-models.js` initializes associations.
- `controllers/`: Business logic for each entity. Example: `ventasController.js` handles sale creation, iterating over sale details and saving them with the main sale record.
- `routes/`: Express route definitions, grouped by entity.
- `db.js`: Database connection setup.
- `SQL/script.sql`: Reference schema for MySQL database.

## Patterns & Conventions
- Controllers expect request bodies to match model fields (e.g., `req.body.detalle` for sale details).
- Sale creation: create main sale, then iterate and save each detail (see `ventasController.js`).
- Use `async/await` for all DB operations; errors are caught and sent as JSON responses.
- Model names are singular and capitalized (e.g., `Venta`, `Producto`).
- Foreign keys use `id_` prefix (e.g., `id_cliente`, `id_producto`).

## Developer Workflows
- Install dependencies: `npm install`
- Start server: `node app.js` (or use `nodemon` for auto-reload)
- Database: Ensure MySQL is running and matches `SQL/script.sql` schema.
- No built-in test suite; manual testing via API tools (e.g., Postman) is expected.

## Integration Points
- MySQL database (see `db.js` and `SQL/script.sql`).
- No external APIs or microservices.

## Examples
- To add a new entity: create model, controller, and route file; update `init-models.js` for associations.
- To add a new sale: POST to the relevant route with a body containing `cliente` and `detalle` array.

## References
- See `README.md` for setup instructions.
- See `controllers/ventasController.js` for sale creation pattern.
- See `models/init-models.js` for model relationships.
