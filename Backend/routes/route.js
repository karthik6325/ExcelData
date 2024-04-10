const { registerCandidates } = require('../controllers/candidateDetails');
const multer = require('multer');
const fileCheck = require('../middleware/fileCheck');

const router = require('express').Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('xlsx'), fileCheck, async (req, res) => {
    try {
        const candidates = req.candidates;

        await registerCandidates(candidates);

        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Failed to upload file' });
    }
});

module.exports = router;
