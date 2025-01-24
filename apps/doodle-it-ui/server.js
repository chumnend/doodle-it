import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app configuration
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// listen to app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('client started on port', port);
});
