const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  const { records } = req.body; // Array of { studentId, date, status }
  try {
    const promises = records.map(record => 
      Attendance.findOneAndUpdate(
        { studentId: record.studentId, date: record.date },
        { status: record.status },
        { upsert: true, new: true }
      )
    );
    await Promise.all(promises);
    res.json({ msg: 'Attendance updated successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.find({ date }).populate('studentId', 'name rollNo');
    res.json(attendance);
  } catch (err) {
    res.status(500).send('Server error');
  }
};