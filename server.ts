import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EnquiryRecord {
  referenceId: string;
  customerName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  productCategory: string;
  requiredDimensions: string;
  quantity: number;
  additionalRequirements: string;
  submittedAt: string;
}

const enquiriesStore: EnquiryRecord[] = [];

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));

  app.post('/api/enquiries', (req, res) => {
    const body = req.body as Record<string, unknown> | undefined;
    if (!body || typeof body !== 'object') {
      res.status(400).json({ error: 'Invalid request body.' });
      return;
    }

    const customerName = String(body.customerName || '').trim();
    const companyName = String(body.companyName || '').trim();
    const phoneNumber = String(body.phoneNumber || '').trim();
    const email = String(body.email || '').trim();
    const productCategory = String(body.productCategory || '').trim();
    const requiredDimensions = String(body.requiredDimensions || '').trim();
    const quantity = Number(body.quantity);
    const additionalRequirements = String(body.additionalRequirements || '').trim();

    if (customerName.length < 2 || companyName.length < 2) {
      res.status(400).json({ error: 'Customer name and company name are required.' });
      return;
    }

    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      res.status(400).json({ error: 'Valid phone number is required.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Valid business email is required.' });
      return;
    }

    if (!requiredDimensions || !Number.isFinite(quantity) || quantity < 1) {
      res.status(400).json({ error: 'Dimensions and valid quantity are required.' });
      return;
    }

    const referenceId = `PPS-${Date.now().toString().slice(-6)}`;
    const record: EnquiryRecord = {
      referenceId,
      customerName,
      companyName,
      phoneNumber,
      email,
      productCategory: productCategory || 'Wooden Pallets',
      requiredDimensions,
      quantity,
      additionalRequirements,
      submittedAt: new Date().toISOString(),
    };

    enquiriesStore.push(record);
    res.status(201).json({
      success: true,
      referenceId,
      submittedAt: record.submittedAt,
    });
  });

  const distDir = path.resolve(__dirname, 'dist');
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(distDir);

  if (isProd) {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
