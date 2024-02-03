import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); // Add this line to parse JSON requests
app.use('/', routes);

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
