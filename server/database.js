import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: 'nolenlawton',
    host: 'localhost',
    database: 'bookscout',
    password: 'Lawton08',
    port: 5432,
});

export default pool;