import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const frontendPath = path.join(__dirname, '../../frontend/src/pages/chats/');
router.use(express.static(frontendPath));

router.get('/', (req, res, next) => {
    try {
        const indexPath = path.join(frontendPath, 'index.html');
        res.sendFile(indexPath);
    } catch (e) {
        next(e);
    }
});

export default router;
