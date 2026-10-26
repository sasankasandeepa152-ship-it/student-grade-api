const express = require('express');

const app = express();

app.use(express.json());

function calculateGrade(marks) {
    if (marks >= 75) return 'A';
    if (marks >= 65) return 'B';
    if (marks >= 55) return 'C';
    if (marks >= 40) return 'S';

    return 'F';
}

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        version: process.env.APP_VERSION || '1.0.0'
    });
});

app.post('/grade', (req, res) => {
    const { studentName, marks } = req.body;

    if (!studentName || marks === undefined) {
        return res.status(400).json({
            error: 'studentName and marks required'
        });
    }

    res.json({
        studentName,
        marks,
        grade: calculateGrade(marks),
        timestamp: new Date().toISOString()
    });
});

module.exports = { app, calculateGrade };

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}