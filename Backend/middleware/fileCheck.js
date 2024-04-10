const xlsx = require('xlsx');

const processFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileData = req.file.buffer;
        const workbook = xlsx.read(fileData, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const candidates = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        req.candidates = candidates; 
        next(); 
    } catch (error) {
        console.error('Error processing file:', error);
        return res.status(500).json({ message: 'Failed to process file' });
    }
};

module.exports = processFile;
