import express from 'express';

const app = express();  //create an express app

import { contactRoutes } from '../routes/contact.routes.js';
import { testimonialRoutes } from '../routes/testimonial.routes.js';
import adminRoutes  from '../routes/admin.routes.js';

//middleware to parse JSON requests
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/admin", adminRoutes);

export default app;